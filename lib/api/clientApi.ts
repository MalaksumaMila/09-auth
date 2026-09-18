'use client';

import { User } from '@/types/user';
import { nextServer } from './api';
import type { CreateNoteRequest, fetchNotesResponse, Note } from '@/types/note';

const CLIENT_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface RegisterParam {
  email: string;
  password: string;
}

export interface LoginParam {
  email: string;
  password: string;
}

export interface ErrorResponse {
  message: string;
}

export interface CheckSessionRequest {
  success: boolean;
}

export async function register(data: RegisterParam): Promise<User> {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
}

export async function login(data: LoginParam): Promise<User> {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
}

export async function checkSession() {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
}

export async function getMe(): Promise<User> {
  const { data } = await nextServer.get<User>('/auth/me');
  return data;
}

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export type UpdateUserRequest = {
  userName?: string;
  avatar?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.put<User>('/auth/me', payload);
  return res.data;
};

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await nextServer.post('/upload', formData);
  return data.url;
};

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
