import { nextServer } from './api';
import type { fetchNotesResponse, Note } from '@/types/note';
import { User } from '@/types/user';
import { cookies } from 'next/headers';

export const checkSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};
export async function fetchNotes(
  query: string,
  page: number,
  tag?: string
): Promise<fetchNotesResponse> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  try {
    const response = await nextServer.get<fetchNotesResponse>(`/notes`, {
      params: {
        search: query || undefined,
        page,
        tag: tag === 'all' ? undefined : tag,
      },
      headers: {
        Cookie: cookieHeader,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchNoteById(id: string): Promise<Note> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  try {
    const response = await nextServer.get<Note>(`/notes/${id}`, {
      headers: { Cookie: cookieHeader },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>('/auth/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
