import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export const PageContainer = ({ children, className }: PageContainerProps) => {
  return (
    <main
      className={cn(
        'min-h-screen pb-28 px-4 pt-6 md:px-6 lg:px-8',
        'max-w-4xl mx-auto',
        className
      )}
    >
      {children}
    </main>
  );
};
