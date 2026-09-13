import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import { Metadata } from 'next';

interface SlugPageProps {
  params: Promise<{ slug: string[] }>;
}


export async function generateMetadata ({params,}:SlugPageProps): Promise <Metadata> {
   const { slug } = await params; 
    const tag = slug[0];

    return {
      title: `Notes by Tag: ${tag}`,
  description: `View all notes with the ${tag} tag`,
  
  openGraph: {  
    title: `Notes by Tag: ${tag}`,
  description: `View all notes with the ${tag} tag`,
    url: `https://08-zustand-ebon-two.vercel.app/notes/filter/${tag}`,
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
export default async function SlugPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const query = '';
  const page = 1;
  const tag = slug[0];
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', query, page, tag],
    queryFn: () => fetchNotes(query, page, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
