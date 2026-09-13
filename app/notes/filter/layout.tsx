import css from './LayoutNotes.module.css';

type NotesLayoutProps = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

const NotesFilterLayout = ({ children, sidebar }: NotesLayoutProps) => {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
};

export default NotesFilterLayout;
