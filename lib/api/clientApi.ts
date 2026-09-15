'use client';

import { User } from '@/types/user';
import { nextServer } from './api';
import type { CreateNoteRequest, fetchNotesResponse, Note } from '@/types/note';

const CLIENT_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

interface RegisterParam {
  email: string;
  password: string;
}

export async function register(data: RegisterParam): Promise<User> {
  const res = await nextServer.post<User>('/auth/register', data, {
    withCredentials: true,
  });
  return res.data;
}

export async function fetchNotes(
  query: string,
  page: number,
  tag?: string
): Promise<fetchNotesResponse> {
  try {
    const response = await nextServer.get<fetchNotesResponse>(`/notes`, {
      params: {
        search: query || undefined,
        page,
        tag: tag === 'all' ? undefined : tag,
      },
      headers: {
        Authorization: `Bearer ${CLIENT_TOKEN}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createNote(data: CreateNoteRequest): Promise<Note> {
  const response = await nextServer.post<Note>(`/notes`, data, {
    headers: {
      Authorization: `Bearer ${CLIENT_TOKEN}`,
    },
  });

  return response.data;
}

export async function deleteNote(id: Note['id']): Promise<Note> {
  const response = await nextServer.delete<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${CLIENT_TOKEN}`,
    },
  });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  try {
    const response = await nextServer.get<Note>(`/notes/${id}`, {
      headers: { Authorization: `Bearer ${CLIENT_TOKEN}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
