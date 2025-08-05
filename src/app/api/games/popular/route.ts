import { NextRequest, NextResponse } from 'next/server';

import { getPopularGames } from '@/lib/igdb-client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const limitParam = searchParams.get('limit');

    const limit = limitParam ? parseInt(limitParam, 10) : 15;

    if (limit > 15) {
      return NextResponse.json(
        { error: 'Limit cannot exceed 15.' },
        { status: 400 },
      );
    }

    const games = await getPopularGames(limit);
    return NextResponse.json(games, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error in /api/games/popular:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
