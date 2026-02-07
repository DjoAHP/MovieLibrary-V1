import { Home, Library } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useLibraryContext } from '@/contexts/LibraryContext';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
}

const NavItem = ({ to, icon, label, badge }: NavItemProps) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        'flex flex-col items-center justify-center gap-1 px-6 py-2 rounded-xl transition-all duration-300 touch-target',
        'hover:bg-glass-border/20',
        isActive
          ? 'text-primary'
          : 'text-foreground-muted hover:text-foreground'
      )
    }
  >
    {({ isActive }) => (
      <>
        <div className="relative">
          <div
            className={cn(
              'transition-transform duration-300',
              isActive && 'scale-110'
            )}
          >
            {icon}
          </div>
          {badge !== undefined && badge > 0 && (
            <span className="absolute -top-1 -right-2 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-semibold bg-primary text-primary-foreground rounded-full px-1">
              {badge > 99 ? '99+' : badge}
            </span>
          )}
        </div>
        <span
          className={cn(
            'text-xs font-medium transition-all duration-300',
            isActive ? 'opacity-100' : 'opacity-70'
          )}
        >
          {label}
        </span>
        {isActive && (
          <div className="absolute bottom-1 w-1 h-1 rounded-full bg-primary animate-scale-in" />
        )}
      </>
    )}
  </NavLink>
);

export const BottomNav = () => {
  const { libraryCount } = useLibraryContext();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe">
      <div className="mx-4 mb-4">
        <div className="glass-strong rounded-2xl shadow-elevated">
          <div className="flex items-center justify-around py-2">
            <NavItem
              to="/"
              icon={<Home className="w-5 h-5" strokeWidth={2} />}
              label="Search"
            />
            <NavItem
              to="/library"
              icon={<Library className="w-5 h-5" strokeWidth={2} />}
              label="Library"
              badge={libraryCount}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};
