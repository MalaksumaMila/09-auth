'use client'

import css from './NoteForm.module.css';
import { useRouter } from "next/navigation";
import { useId } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateNoteRequest } from '@/lib/api';
import { Note } from '@/types/note';

import { createNote } from '../../lib/api';
import useNoteStore from '@/lib/store/noteStore'


export default function NoteForm() {
   const router = useRouter();

  const fieldId = useId();
  const queryClient = useQueryClient();

    const draft = useNoteStore(state => state.draft);
const setDraft = useNoteStore(state => state.setDraft);
const clearDraft = useNoteStore(state => state.clearDraft);

  const mutation = useMutation<Note, Error, CreateNoteRequest>({
    mutationFn: notes => createNote(notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes']
     
  });
      clearDraft();
    router.push("/notes/filter/all");
      },
    });
   

 const handleSubmit = (formData: FormData) => {
  if (mutation.isPending) {
    return;
  }

  
  const title = formData.get("title")
   const content = formData.get("content")
    const tag = formData.get("tag")

  if (typeof title !== "string" || typeof content!=="string"  || typeof tag !== "string") {
    return
  }
  
  const newNote: CreateNoteRequest  = {
    title,
  content,
  tag,
}
mutation.mutate (newNote) 
  
}

  return (
  
      <form className={css.form}
       action={handleSubmit} >
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <input value={draft.title}
         onChange= {(e) => {
          setDraft({ ...draft, title : e.target.value });
        }}
                     id={`${fieldId}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <textarea   value={draft.content} 
          onChange= {(e) => {
          setDraft({ ...draft, content : e.target.value });
        }}        
            id={`${fieldId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
          />
         
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <select value={draft.tag} 
        
         onChange= {(e) => {
          setDraft({ ...draft, tag : e.target.value });
        }} 
            id={`${fieldId}-tag`}
            name="tag"
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </select>
                 </div>

        <div className={css.actions}>
          <button
                        type="button" 
                        onClick={() => router.back()}
            className={css.cancelButton}
          >
            Cancel
          </button>
          <button type="submit" 
         
disabled={mutation.isPending}
          className={css.submitButton}>
            Create note
          </button>
        </div>
      </form>
   
  );
 }
