import { Trash2, Film, Tv } from "lucide-react";
import { cn } from "@/lib/utils";
import { Movie } from "@/types/movie";
import { useLibraryContext } from "@/contexts/LibraryContext";

interface LibraryCardProps {
  movie: Movie;
  index?: number;
}

export const LibraryCard = ({ movie, index = 0 }: LibraryCardProps) => {
  const { removeFromLibrary } = useLibraryContext();

  if (!movie) return null;

  return (
    <div
      className={cn(
        "group relative rounded-2xl overflow-hidden animate-fade-up",
        "bg-card shadow-glass transition-all duration-300",
        "hover:scale-[1.03] hover:shadow-elevated",
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] bg-muted rounded-xl overflow-hidden">
        {movie.posterUrl ? (
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {movie.type === "series" ? (
              <Tv className="w-12 h-12 text-foreground-subtle" />
            ) : (
              <Film className="w-12 h-12 text-foreground-subtle" />
            )}
          </div>
        )}

        {/* Type badge */}
        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md glass-subtle">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-foreground">
            {movie.type === "series" ? "TV" : "Film"}
          </span>
        </div>

        {/* Remove button */}
        <button
          onClick={() => removeFromLibrary(movie.id)}
          className={cn(
            "absolute top-2 right-2 p-2 rounded-xl glass-subtle opacity-0 group-hover:opacity-100",
            "text-foreground-muted hover:text-destructive hover:bg-destructive/20 transition-all duration-300 touch-target",
          )}
          aria-label={`Remove ${movie.title} from library`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-display font-semibold text-foreground text-sm truncate">
          {movie.title}
        </h3>
        <p className="text-xs text-foreground-muted mt-0.5">{movie.year}</p>
      </div>
    </div>
  );
};
