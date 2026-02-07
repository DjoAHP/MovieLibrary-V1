import { Search, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar = ({
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder = "Rechercher des films et séries télévisées...",
  className,
}: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  return (
    <div
      className={cn(
        "relative group transition-all duration-300",
        isFocused && "scale-[1.01]",
        className,
      )}
    >
      {/* Glow effect on focus */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl transition-opacity duration-300",
          "bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20",
          "blur-xl opacity-0",
          isFocused && "opacity-100",
        )}
      />

      <div
        className={cn(
          "relative glass-strong rounded-2xl shadow-glass overflow-hidden",
          "transition-all duration-300",
          isFocused && "ring-2 ring-primary/50",
        )}
      >
        <div className="flex items-center gap-3 px-5 py-4">
          <Search
            className={cn(
              "w-5 h-5 flex-shrink-0 transition-colors duration-300",
              isFocused ? "text-primary" : "text-foreground-muted",
            )}
          />

          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            className={cn(
              "flex-1 bg-transparent outline-none",
              "text-foreground placeholder:text-foreground-subtle",
              "text-base font-medium",
            )}
          />

          {value && (
            <button
              onClick={handleClear}
              className={cn(
                "flex-shrink-0 p-1.5 rounded-full",
                "bg-glass-border/50 hover:bg-glass-border",
                "text-foreground-muted hover:text-foreground",
                "transition-all duration-200",
                "animate-scale-in",
              )}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
