import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 - Page not found | NoteHub',
  description: 'Oops! Page not found...',

   openGraph: {
    title: '404 - Page not found | NoteHub',
    description: 'Oops! Page not found...',
    url: 'https://notehub.com/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 600,
        height: 300,
        alt: 'NoteHub page not found',
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you&#39;re looking for doesn&#39;t exist.</p>
      <Link href="/">Go back home</Link>
    </div>
  );
};

export default NotFound;
