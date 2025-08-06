import type { IGDBGame } from '@/types';

export const getCoverImage = (cover?: IGDBGame['cover']) => {
  if (!cover?.url) return '/placeholder-game.jpg';
  return `https:${cover.url.replace('t_thumb', 't_cover_big')}`;
};

export const getDeveloper = (companies?: IGDBGame['involved_companies']) => {
  if (!companies || companies.length === 0) return 'Unknown';
  const developer = companies.find(c => c.developer);
  return developer?.company.name || companies[0]?.company.name || 'Unknown';
};

export const formatReleaseDate = (releaseDates?: IGDBGame['release_dates']) => {
  if (!releaseDates || releaseDates.length === 0) return 'TBA';
  const firstRelease = releaseDates[0];
  return new Date(firstRelease.date * 1000).toLocaleDateString();
};

export const getGenres = (genres?: IGDBGame['genres']) => {
  if (!genres || genres.length === 0) return 'Unknown';
  return genres.map(g => g.name).join(', ');
};

export const getPlatforms = (platforms?: IGDBGame['platforms']) => {
  if (!platforms || platforms.length === 0) return 'Unknown';
  return platforms.map(p => p.name).join(', ');
};

export const parseReleaseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('/');
  return new Date(Number(year), Number(month) - 1, Number(day));
};

export const processGameData = (game: IGDBGame) => ({
  ...game,
  coverImage: getCoverImage(game.cover),
  developer: getDeveloper(game.involved_companies),
  releaseDate: formatReleaseDate(game.release_dates),
  genres: getGenres(game.genres),
  platforms: getPlatforms(game.platforms),
  formattedRating: game.rating ? (game.rating / 10).toFixed(1) : null,
});
