export interface Movie {
  id: number;
  title: string;
  year: string;
  posterUrl: string;
  type: 'movie' | 'series';
  overview?: string;
  rating?: number;
}

export interface SearchResult extends Movie {
  isInLibrary?: boolean;
}
