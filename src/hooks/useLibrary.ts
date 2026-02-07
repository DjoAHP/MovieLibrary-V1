import { useState, useCallback, useEffect } from 'react';
import { Movie } from '@/types/movie';

const STORAGE_KEY = 'movie-watchlist-library';

export const useLibrary = () => {
  const [library, setLibrary] = useState<Movie[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(library));
  }, [library]);

  const addToLibrary = useCallback((movie: Movie) => {
    setLibrary((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  }, []);

  const removeFromLibrary = useCallback((movieId: number) => {
    setLibrary((prev) => prev.filter((m) => m.id !== movieId));
  }, []);

  const isInLibrary = useCallback(
    (movieId: number) => library.some((m) => m.id === movieId),
    [library]
  );

  const clearLibrary = useCallback(() => {
    setLibrary([]);
  }, []);

  return {
    library,
    addToLibrary,
    removeFromLibrary,
    isInLibrary,
    clearLibrary,
    libraryCount: library.length,
  };
};
