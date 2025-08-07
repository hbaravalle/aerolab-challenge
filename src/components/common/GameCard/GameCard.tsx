'use client';

import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
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
          toast(
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <LuTrash strokeWidth={2.5} className="h-4 w-4 text-red-500" />
                <span className="text-h2 text-gray-900">Game removed</span>
              </div>
              <span className="text-sm text-gray-600">
                {game.name} has been removed from your collection
              </span>
            </div>,
            {
              duration: 3000,
              style: {
                width: '100%',
                border: '1px solid #D23F63',
                padding: '12px 6px',
                boxShadow: '0 16px 24px 0 rgba(0, 0, 0, 0.24)',
              },
            },
          );
        }}
      >
        <LuTrash strokeWidth={3} />
      </button>
    </Link>
  );
}
