import Link from 'next/link';
import Channels from './Channels';

export default function Feed() {
  return (
    <main className='grid grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto'>      
      {/* Posts (Left) */}
      <section className='md:col-span-3'>
        <Link href="/test">Admin Panel</Link>
        <Channels />
      </section>
    </main>
  );
}
