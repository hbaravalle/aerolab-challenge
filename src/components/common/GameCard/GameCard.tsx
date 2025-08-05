'use client';

import Image from 'next/image';
import Link from 'next/link';
import { LuTrash } from 'react-icons/lu';

export default function GameCard() {
  return (
    <Link
      href="/game/grand-theft-auto-v"
      className="relative overflow-hidden rounded-lg"
    >
      <Image
        width={300}
        height={400}
        src="https://images.igdb.com/igdb/image/upload/t_cover_big/co66n7.jpg"
        alt="Grand Theft Auto V: Story Mode Cover"
      />
      <button
        className="absolute right-2 bottom-2 cursor-pointer rounded-full bg-white p-3 text-black transition-colors hover:text-violet-600"
        type="button"
        onClick={() => {
          console.warn('Delete game');
        }}
      >
        <LuTrash strokeWidth={3} />
      </button>
    </Link>
  );
}
