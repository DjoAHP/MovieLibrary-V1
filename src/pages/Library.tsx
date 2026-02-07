import { PageContainer } from '@/components/layout/PageContainer';
import { LibraryCard } from '@/components/library/LibraryCard';
import { EmptyState } from '@/components/library/EmptyState';
import { useLibraryContext } from '@/contexts/LibraryContext';
import { Library as LibraryIcon } from 'lucide-react';

const Library = () => {
  const { library } = useLibraryContext();

  return (
    <PageContainer>
      {/* Header */}
      <header className="mb-8 animate-fade-up">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl gradient-primary">
            <LibraryIcon className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            My Library
          </h1>
        </div>
        {library.length > 0 && (
          <p className="text-foreground-muted text-sm">
            {library.length} {library.length === 1 ? 'title' : 'titles'} saved
          </p>
        )}
      </header>

      {/* Content */}
      {library.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {library.map((movie, index) => (
            <LibraryCard key={movie.id} movie={movie} index={index} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </PageContainer>
  );
};

export default Library;
