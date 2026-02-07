import { useState, useEffect } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { SearchBar } from "@/components/search/SearchBar";
import { MovieCard } from "@/components/search/MovieCard";
import { searchMovies } from "@/services/tmdb";
import { Film } from "lucide-react";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  // Debounce API call
  useEffect(() => {
    const delay = setTimeout(async () => {
      if (searchQuery.length > 2) {
        const movies = await searchMovies(searchQuery);
        setResults(movies);
      } else {
        setResults([]);
      }
    }, 400); // attend 400ms avant d'appeler l'API pour éviter le spam

    return () => clearTimeout(delay);
  }, [searchQuery]);

  return (
    <PageContainer>
      {/* Header */}
      <header className="text-center mb-8 animate-fade-up">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="p-2 rounded-xl gradient-primary">
            <Film className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            MoviesList
          </h1>
        </div>
        <p className="text-foreground-muted text-sm">
          Suivez vos films et séries préférés
        </p>
      </header>

      {/* Search */}
      <div className="mb-8">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Rechercher des films et séries télévisées..."
        />
      </div>

      {/* Results */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-foreground-muted text-sm uppercase tracking-wider">
            {searchQuery ? "Résultats de recherche" : "Les plus populaires"}
          </h2>
          <span className="text-xs text-foreground-subtle">
            {results.length} {results.length === 1 ? "title" : "titles"}
          </span>
        </div>

        {results.length > 0 ? (
          <div className="flex flex-col gap-3">
            {results.map((movie, index) => (
              <MovieCard
                key={movie.id}
                movie={{
                  ...movie,
                  poster_path: movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    : null,
                }}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 animate-fade-up">
            <p className="text-foreground-muted">
              Aucun résultat pour "{searchQuery}"
            </p>
            <p className="text-foreground-subtle text-sm mt-1">
              Essayez un autre terme de recherche
            </p>
          </div>
        )}
      </section>
    </PageContainer>
  );
};

export default Home;
