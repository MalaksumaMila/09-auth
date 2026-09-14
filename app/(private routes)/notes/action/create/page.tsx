import { Metadata } from 'next';
import css from './CreateNote.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';


export const metadata: Metadata = {
  title: 'Creating a new note',
  description: 'Create a new note and add all the important details.',
  // metadataBase: 'https://notehub.com/',
  openGraph: {  
    title: 'Creating a new note',
  description: 'Create, save, and organize your notes',
  url: 'https://08-zustand-ebon-two.vercel.app/notes/action/create',
  images: [
    {
         url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        alt: 'notes image',
        width: 600,
        height: 300,
    }
  ]
}};

function CreateNote() {
 return (
    <main className={css.main}>
  <div className={css.container}>
    <h1 className={css.title}>Create note
        </h1>
        <NoteForm/>
	 
  </div>
</main>
 )
}

export default  CreateNote 