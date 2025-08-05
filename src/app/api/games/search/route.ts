import { NextRequest, NextResponse } from 'next/server';

import { searchGames } from '@/lib/igdb-client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const query = searchParams.get('query');
    const limitParam = searchParams.get('limit');
    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 },
      );
    }

    const limit = limitParam ? parseInt(limitParam, 10) : 15;
    if (limit > 15) {
      return NextResponse.json(
        { error: 'Limit cannot exceed 15.' },
        { status: 400 },
      );
    }

    const games = await searchGames(query, limit);
    return NextResponse.json(games, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error in /api/games/search:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
