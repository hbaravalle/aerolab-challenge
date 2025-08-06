import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getGameBySlug } from '@/lib/igdb-client';
import { getCoverImage, getDeveloper, processGameData } from '@/utils/game';

import GameDetailClient from './GameDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = await getGameBySlug(slug);

  if (!game) {
    return {
      title: 'Game Not Found',
      description: 'The requested game could not be found.',
    };
  }

  const description = game.summary
    ? game.summary.slice(0, 160) + (game.summary.length > 160 ? '...' : '')
    : `Discover ${game.name} by ${getDeveloper(game.involved_companies)}. Find game details, ratings, and more on Gaming Haven Z.`;

  return {
    title: `${game.name} - Gaming Haven Z`,
    description,
    openGraph: {
      title: game.name,
      description,
      type: 'website',
      url: `https://gaming-haven-z.vercel.app/game/${slug}`,
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
  const game = await getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  const processedGame = processGameData(game);
  return <GameDetailClient game={processedGame} />;
}
