import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';

import { Metadata } from 'next';


interface NoteDetailsPageProps {
  params: Promise<{ id: string }>;
}

export  async function generateMetadata({params,}:NoteDetailsPageProps): Promise<Metadata> {
    const { id } = await params;
     const note = await fetchNoteById(id);
return {
      title: `Note Details: ${note.title}`,
  description: `View details for note ${note.content}`,
  
  openGraph: {  
        title: `Note Details: ${note.title}`,
  description: `View details for note ${note.content}`,
    url: `https://notehub.com/notes/${id}`,
  images: [
    {
         url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        alt: 'notes image',
        width: 600,
        height: 300,
    },
  ],
},
}

}
export default async function NoteDetailsPage({
  params,
}: NoteDetailsPageProps) {
  const queryClient = new QueryClient();
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
