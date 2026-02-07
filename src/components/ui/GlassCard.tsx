import { cn } from '@/lib/utils';
import { ReactNode, CSSProperties } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'subtle' | 'strong';
  hover?: boolean;
  style?: CSSProperties;
}

export const GlassCard = ({
  children,
  className,
  variant = 'default',
  hover = false,
  style,
}: GlassCardProps) => {
  const variants = {
    default: 'glass',
    subtle: 'glass-subtle',
    strong: 'glass-strong',
  };

  return (
    <div
      className={cn(
        variants[variant],
        'rounded-2xl shadow-glass',
        hover && 'transition-all duration-300 hover:scale-[1.02] hover:shadow-elevated',
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};
