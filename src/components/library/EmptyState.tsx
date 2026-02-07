import { Library, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-fade-up">
      {/* Icon container with glow */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" />
        <div className="relative glass-strong p-6 rounded-full">
          <Library className="w-12 h-12 text-primary" strokeWidth={1.5} />
        </div>
      </div>

      {/* Text */}
      <h2 className="font-display text-2xl font-bold text-foreground mb-2">
        Your library is empty
      </h2>
      <p className="text-foreground-muted max-w-xs mb-8">
        Start building your watchlist by searching for movies and TV shows
      </p>

      {/* CTA */}
      <Link
        to="/"
        className={cn(
          'flex items-center gap-2 px-6 py-3 rounded-xl',
          'gradient-primary text-primary-foreground font-semibold',
          'transition-all duration-300 hover:opacity-90 glow-primary',
          'touch-target'
        )}
      >
        <Search className="w-5 h-5" />
        <span>Start Searching</span>
      </Link>
    </div>
  );
};
