'use client';

import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

import { fetchNotes } from '@/lib/api';

import css from './NotesPage.module.css';
import Link from 'next/link';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Loader from '@/app/loading';

interface NotesClientProps {
  tag: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const debounceSearch = useDebouncedCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, 300);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['notes', query, page, tag],
    queryFn: () => fetchNotes(query, page, tag),
    placeholderData: keepPreviousData,
  });

  const pageCount = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox query={query} onChange={debounceSearch} />

        {isSuccess && pageCount > 1 && (
          <Pagination page={page} setPage={setPage} pageCount={pageCount} />
        )}

        <Link href='/notes/action/create' className={css.button}>
          Create note +
        </Link>
      </header>
      {isLoading && <Loader />}

      {isSuccess && !isLoading && data.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}

    </div>
  );
}
