'use client';

import Image from 'next/image';
import Link from 'next/link';
import { LuTrash } from 'react-icons/lu';

import { useAppStore } from '@/app/store';
import { ProcessedGame } from '@/types';
import { getCoverImage } from '@/utils/game';

interface GameCardProps {
  game: ProcessedGame;
}

export default function GameCard({ game }: GameCardProps) {
  const { removeFromFavorite } = useAppStore(state => state);
  return (
    <Link
      href={`/game/${game.slug}`}
      className="relative overflow-hidden rounded-lg"
    >
      <Image
        width={300}
        height={400}
        src={getCoverImage(game.cover)}
        alt={game.name}
        placeholder="empty"
        priority
      />
      <button
        className="absolute right-2 bottom-2 cursor-pointer rounded-full bg-white p-3 text-black transition-colors hover:text-violet-600"
        type="button"
        onClick={event => {
          event.preventDefault();
          event.stopPropagation();
          removeFromFavorite(game.slug!);
        }}
      >
        <LuTrash strokeWidth={3} />
      </button>
    </Link>
  );
}
