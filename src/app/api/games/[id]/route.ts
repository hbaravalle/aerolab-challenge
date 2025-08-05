import { NextRequest, NextResponse } from 'next/server';

import { getGameById } from '@/lib/igdb-client';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: 'Invalid game ID' }, { status: 400 });
    }

    const game = await getGameById(id);

    if (!game) {
      return NextResponse.json({ error: 'Game not found' }, { status: 404 });
    }

    return NextResponse.json(game, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error in /api/games/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
