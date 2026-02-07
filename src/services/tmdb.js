const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function searchMovies(query) {
  if (!query) return [];

  try {
    const res = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query,
      )}&language=fr-FR`,
    );
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("TMDB API error:", error);
    return [];
  }
}
