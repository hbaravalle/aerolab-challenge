import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import { env } from '@/lib/env';
import { getGameBySlug } from '@/lib/igdb-client';
import { getCoverImage, getDeveloper, processGameData } from '@/utils/game';

import GameDetailClient from './GameDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const getGameData = cache(async (slug: string) => {
  const game = await getGameBySlug(slug);
  return game ? { game, processedGame: processGameData(game) } : null;
});

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const gameData = await getGameData(slug);

  if (!gameData) {
    return {
      title: 'Game Not Found',
      description: 'The requested game could not be found.',
    };
  }

  const { game } = gameData;
  const description = game.summary
    ? game.summary.slice(0, 160) + (game.summary.length > 160 ? '...' : '')
    : `Discover ${game.name} by ${getDeveloper(game.involved_companies)}. Find game details, ratings, and more on Gaming Haven Z.`;

  return {
    title: game.name,
    description,
    openGraph: {
      title: game.name,
      description,
      type: 'website',
      url: new URL(`/game/${slug}`, env.SITE_URL).toString(),
      images: [
        {
          url: getCoverImage(game.cover),
          width: 264,
          height: 352,
          alt: `${game.name} Cover`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: game.name,
      description,
      images: [getCoverImage(game.cover)],
    },
  };
}

export default async function GameDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const gameData = await getGameData(slug);

  if (!gameData) {
    notFound();
  }

  return <GameDetailClient game={gameData.processedGame} />;
}
