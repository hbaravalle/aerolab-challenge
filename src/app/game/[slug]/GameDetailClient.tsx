'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { LuCalendar, LuPuzzle, LuStar } from 'react-icons/lu';

import { useAppStore } from '@/app/store';
import Gallery from '@/components/common/Gallery';
import Button from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import type { ProcessedGame } from '@/types';
import { getCoverImage } from '@/utils/game';

interface GameDetailClientProps {
  game: ProcessedGame;
}

export default function GameDetailClient({ game }: GameDetailClientProps) {
  const { addToFavorite, isFavorite, removeFromFavorite } = useAppStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleAddToFavorite = (game: ProcessedGame) => {
    addToFavorite(game);
  };

  const handleRemoveFromFavorite = (game: ProcessedGame) => {
    removeFromFavorite(game.slug!);
  };

  return (
    <div className="mb-10 flex flex-col gap-6">
      <div className="flex gap-4">
        <Image
          className="overflow-hidden rounded-lg bg-gray-200 object-cover"
          width={170}
          height={226}
          src={
            game.cover ? getCoverImage(game.cover) : '/cover-placeholder.svg'
          }
          alt={`${game.name} Cover`}
          placeholder="empty"
          priority
        />
        <div>
          <h1 className="text-h1 bg-gradient-linear bg-clip-text text-transparent">
            {game.name}
          </h1>
          <small className="text-h3 text-violet-100">{game.developer}</small>
        </div>
      </div>

      {!isHydrated ? (
        <Button variant="primary">Collect game</Button>
      ) : isFavorite(game.slug!) ? (
        <Button onClick={() => handleRemoveFromFavorite(game)} variant="light">
          Game collected
        </Button>
      ) : (
        <Button onClick={() => handleAddToFavorite(game)} variant="primary">
          Collect game
        </Button>
      )}

      <div className="flex flex-wrap items-center gap-2">
        {game.formattedRating && (
          <Chip
            icon={<LuStar strokeWidth={2.5} />}
            label="Rating"
            value={game.formattedRating}
          />
        )}
        <Chip
          icon={<LuCalendar strokeWidth={2.5} />}
          label="Release"
          value={game.releaseDate}
        />
        <Chip
          icon={<LuPuzzle strokeWidth={2.5} />}
          label="Genre"
          value={game.genres}
        />
      </div>

      {game.summary && (
        <div>
          <h2 className="text-h2 mb-2">Summary</h2>
          <p className="text-sm text-gray-500">{game.summary}</p>
        </div>
      )}

      <div>
        <h2 className="text-h2 mb-2">Platforms</h2>
        <p className="text-sm text-gray-500">{game.platforms}</p>
      </div>

      <div>
        <h2 className="text-h2 mb-2">Media</h2>
        <Gallery images={game.screenshots || []} title={game.name} />
      </div>

      {game.similar_games && game.similar_games.length > 0 && (
        <div>
          <h2 className="text-h2 bg-gradient-linear mb-2 bg-clip-text text-transparent">
            Similar games
          </h2>
          <div className="grid grid-cols-3 gap-2 md:grid-cols-4 md:gap-4">
            {game.similar_games.slice(0, 6).map(game => (
              <Link
                key={game.slug}
                href={`/game/${game.slug}`}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <Image
                  width={300}
                  height={400}
                  className="overflow-hidden rounded-lg object-cover"
                  src={
                    game.cover
                      ? getCoverImage(game.cover)
                      : '/cover-placeholder.svg'
                  }
                  alt={`${game.name} Cover`}
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
