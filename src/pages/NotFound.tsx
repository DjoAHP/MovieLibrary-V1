import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Home, AlertCircle } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { cn } from '@/lib/utils';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-fade-up">
        {/* Icon */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-destructive/20 rounded-full blur-2xl" />
          <div className="relative glass-strong p-6 rounded-full">
            <AlertCircle className="w-12 h-12 text-destructive" strokeWidth={1.5} />
          </div>
        </div>

        {/* Text */}
        <h1 className="font-display text-6xl font-bold text-foreground mb-2">
          404
        </h1>
        <h2 className="font-display text-xl font-semibold text-foreground-muted mb-2">
          Page Not Found
        </h2>
        <p className="text-foreground-subtle max-w-xs mb-8">
          The page you're looking for doesn't exist or has been moved
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
          <Home className="w-5 h-5" />
          <span>Go Home</span>
        </Link>
      </div>
    </PageContainer>
  );
};

export default NotFound;
