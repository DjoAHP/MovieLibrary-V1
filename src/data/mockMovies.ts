import { Movie } from '@/types/movie';

// Mock data for UI demonstration - will be replaced with TMDB API
export const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'Dune: Part Two',
    year: '2024',
    posterUrl: 'https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg',
    type: 'movie',
    overview: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against those who destroyed his family.',
  },
  {
    id: 2,
    title: 'The Bear',
    year: '2022',
    posterUrl: 'https://image.tmdb.org/t/p/w500/sHFlbKS3WLqMnp9t2ghADIJFnuQ.jpg',
    type: 'series',
    overview: 'A young chef returns home to run his family sandwich shop.',
  },
  {
    id: 3,
    title: 'Oppenheimer',
    year: '2023',
    posterUrl: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    type: 'movie',
    overview: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
  },
  {
    id: 4,
    title: 'Shogun',
    year: '2024',
    posterUrl: 'https://image.tmdb.org/t/p/w500/7O4iVfOMQmdCSxhOg1WnzG1AgYT.jpg',
    type: 'series',
    overview: 'In feudal Japan, a shipwrecked English sailor becomes embroiled in political intrigue.',
  },
  {
    id: 5,
    title: 'Poor Things',
    year: '2023',
    posterUrl: 'https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg',
    type: 'movie',
    overview: 'The incredible tale of Bella Baxter, a young woman brought back to life by an eccentric scientist.',
  },
  {
    id: 6,
    title: 'True Detective',
    year: '2014',
    posterUrl: 'https://image.tmdb.org/t/p/w500/cuV2O5ZyDLHSOWzg3nLVljp1ubw.jpg',
    type: 'series',
    overview: 'Seasonal anthology series in which police investigations unearth dark secrets.',
  },
];

// Filter movies based on search query
export const searchMovies = (query: string): Movie[] => {
  if (!query.trim()) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return mockMovies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(normalizedQuery) ||
      movie.year.includes(normalizedQuery)
  );
};

// Get suggestions (first 4 results or all if query is empty)
export const getSuggestions = (query: string): Movie[] => {
  if (!query.trim()) return mockMovies.slice(0, 4);
  return searchMovies(query);
};
