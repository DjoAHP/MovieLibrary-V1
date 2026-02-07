import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { supabase } from "@/lib/supabaseClient";
import { Movie } from "@/types/movie";

interface LibraryContextType {
  library: Movie[];
  addToLibrary: (movie: Movie) => void;
  removeFromLibrary: (movieId: number) => void;
  isInLibrary: (movieId: number) => boolean;
  libraryCount: number;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const LibraryProvider = ({ children }: { children: ReactNode }) => {
  const [library, setLibrary] = useState<Movie[]>([]);

  // Charger la library depuis Supabase au démarrage
  useEffect(() => {
    const fetchLibrary = async () => {
      const { data, error } = await supabase.from("library").select("*");
      console.log("Fetch library data:", data, "error:", error); // 🔍
      if (error) console.error("Erreur Supabase fetch library:", error);
      else {
        const movies: Movie[] = (data || []).map((item: any) => ({
          id: item.id,
          title: item.title,
          posterUrl: item.poster_url || null,
          year: item.year || "N/A",
          overview: item.overview || "",
          type: item.type || "movie",
        }));
        setLibrary(movies);
      }
    };

    fetchLibrary();
  }, []);

  const addToLibrary = async (movie: Movie) => {
    if (library.find((m) => m.id === movie.id)) return;

    const { error } = await supabase.from("library").insert([
      {
        id: movie.id,
        title: movie.title,
        poster_url: movie.posterUrl, // ✅ conversion ici
        year: movie.year,
        overview: movie.overview,
        type: movie.type,
      },
    ]);

    if (error) console.error("Erreur Supabase insert:", error);

    setLibrary((prev) => [...prev, movie]);
  };

  const removeFromLibrary = async (movieId: number) => {
    const { error } = await supabase.from("library").delete().eq("id", movieId);

    if (error) {
      console.error("Erreur Supabase delete:", error);
      return;
    }

    setLibrary((prev) => prev.filter((m) => m.id !== movieId));
  };

  const isInLibrary = (movieId: number) =>
    library.some((m) => m.id === movieId);

  return (
    <LibraryContext.Provider
      value={{
        library,
        addToLibrary,
        removeFromLibrary,
        isInLibrary,
        libraryCount: library.length,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibraryContext = () => {
  const context = useContext(LibraryContext);
  if (!context)
    throw new Error("useLibraryContext must be used within LibraryProvider");
  return context;
};
