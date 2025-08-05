'use client';

import Image from 'next/image';
import Link from 'next/link';
import { LuCalendar, LuPuzzle, LuStar } from 'react-icons/lu';

import Button from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import type { ProcessedGame } from '@/types';
import { getCoverImage } from '@/utils/game';

interface GameDetailClientProps {
  game: ProcessedGame;
}

export default function GameDetailClient({ game }: GameDetailClientProps) {
  return (
    <div className="mb-10 flex flex-col gap-6">
      <div className="flex gap-4">
        <Image
          className="overflow-hidden rounded-lg object-cover"
          width={170}
          height={226}
          src={game.coverImage}
          alt={`${game.name} Cover`}
          priority
        />
        <div>
          <h1 className="text-h1 bg-gradient-linear bg-clip-text text-transparent">
            {game.name}
          </h1>
          <small className="text-h3 text-violet-100">{game.developer}</small>
        </div>
      </div>

      <Button>Collect game</Button>

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
        {/* TODO: Add media gallery */}
      </div>

      {game.similar_games && game.similar_games.length > 0 && (
        <div>
          <h2 className="text-h2 bg-gradient-linear mb-2 bg-clip-text text-transparent">
            Similar games
          </h2>
          <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
            {game.similar_games.slice(0, 6).map(game => (
              <Link key={game.slug} href={`/game/${game.slug}`}>
                <Image
                  width={300}
                  height={400}
                  className="overflow-hidden rounded-lg object-cover"
                  src={getCoverImage(game.cover)}
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
