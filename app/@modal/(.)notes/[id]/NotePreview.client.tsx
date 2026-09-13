'use client';

import css from './NotePreview.module.css';
import { useQuery } from '@tanstack/react-query';

import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import { useRouter } from 'next/navigation';

interface NotePreviewClientProps {
  id: string;
}

function NotePreviewClient({ id }: NotePreviewClientProps) {
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const router = useRouter();

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (isError || !note) {
    return <p>Something went wrong.</p>;
  }

  const closeModal = () => router.back();

  return (
    <Modal closeModal={closeModal}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.tag}>{note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
      </div>
    </Modal>
  );
}

export default NotePreviewClient;
