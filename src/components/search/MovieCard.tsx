import { Plus, Check, Film, Tv } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/GlassCard";
import { useLibraryContext } from "@/contexts/LibraryContext";

interface MovieCardProps {
  movie: any; // Reçoit la donnée TMDB
  index?: number;
}

export const MovieCard = ({ movie, index = 0 }: MovieCardProps) => {
  const { addToLibrary, removeFromLibrary, isInLibrary } = useLibraryContext();
  const inLibrary = isInLibrary(movie.id);

  const handleToggle = () => {
    if (inLibrary) {
      removeFromLibrary(movie.id);
    } else {
      addToLibrary({
        id: movie.id,
        title: movie.title,
        posterUrl: movie.poster_path
          ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
          : null,
        year: movie.release_date ? movie.release_date.slice(0, 4) : "N/A",
        overview: movie.overview,
        type: movie.media_type || "movie",
      });
    }
  };

  return (
    <GlassCard
      variant="subtle"
      className={cn(
        "flex gap-4 p-3 animate-fade-up",
        "transition-all duration-300 hover:bg-glass-border/20",
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Poster */}
      <div className="relative flex-shrink-0 w-20 h-28 md:w-24 md:h-36 rounded-xl overflow-hidden bg-muted">
        {movie.poster_path || movie.posterUrl ? (
          <img
            src={
              movie.posterUrl ||
              `https://image.tmdb.org/t/p/w200${movie.poster_path}`
            }
            alt={movie.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {movie.type === "series" ? (
              <Tv className="w-8 h-8 text-foreground-subtle" />
            ) : (
              <Film className="w-8 h-8 text-foreground-subtle" />
            )}
          </div>
        )}

        {/* Type badge */}
        <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-background/80 backdrop-blur-sm">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-foreground-muted">
            {movie.type === "series" ? "TV" : "Film"}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
        <div>
          <h3 className="font-display font-semibold text-foreground text-base md:text-lg truncate">
            {movie.title}
          </h3>
          <p className="text-sm text-foreground-muted mt-0.5">
            {movie.year ||
              (movie.release_date ? movie.release_date.slice(0, 4) : "N/A")}
          </p>
          {movie.overview && (
            <p className="text-xs text-foreground-subtle mt-2 line-clamp-2 hidden md:block">
              {movie.overview}
            </p>
          )}
        </div>

        {/* Add / Remove button */}
        <button
          onClick={handleToggle}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm",
            "transition-all duration-300 touch-target self-start",
            inLibrary
              ? "bg-primary/20 text-primary hover:bg-destructive/20 hover:text-destructive"
              : "gradient-primary text-primary-foreground hover:opacity-90 glow-primary",
          )}
        >
          {inLibrary ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </>
          )}
        </button>
      </div>
    </GlassCard>
  );
};
