import { Menu, LogOut, Bell, UserCircle, MapPin } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  user: any;
  onMenuToggle: () => void;
}

function Header({ user, onMenuToggle }: HeaderProps) {
  const { logout } = useAuth();
  
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm z-10 sticky top-0">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between h-14 sm:h-16">
          <div className="flex items-center">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden p-2 rounded-md"
              onClick={onMenuToggle}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
            </button>
            
            <div className="flex items-center ml-1 sm:ml-2 md:ml-0">
              <svg 
                width="28" 
                height="28" 
                viewBox="0 0 32 32" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 sm:h-8 sm:w-8"
              >
                <circle cx="16" cy="16" r="16" fill="#2E7D32"/>
                <g stroke="#FFF" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="16" y1="4" x2="16" y2="6"/>
                  <line x1="16" y1="26" x2="16" y2="28"/>
                  <line x1="4" y1="16" x2="6" y2="16"/>
                  <line x1="26" y1="16" x2="28" y2="16"/>
                  <line x1="7.05" y1="7.05" x2="8.46" y2="8.46"/>
                  <line x1="23.54" y1="23.54" x2="24.95" y2="24.95"/>
                  <line x1="7.05" y1="24.95" x2="8.46" y2="23.54"/>
                  <line x1="23.54" y1="8.46" x2="24.95" y2="7.05"/>
                </g>
                <circle cx="16" cy="16" r="4" fill="#FFF"/>
                <g fill="#FFF">
                  <rect x="15.5" y="12" width="1" height="8" rx="0.5"/>
                  <ellipse cx="13" cy="14" rx="1.5" ry="0.8" transform="rotate(-20 13 14)"/>
                  <ellipse cx="19" cy="14" rx="1.5" ry="0.8" transform="rotate(20 19 14)"/>
                  <ellipse cx="12" cy="16" rx="1.5" ry="0.8" transform="rotate(-30 12 16)"/>
                  <ellipse cx="20" cy="16" rx="1.5" ry="0.8" transform="rotate(30 20 16)"/>
                  <ellipse cx="13" cy="18" rx="1.5" ry="0.8" transform="rotate(-15 13 18)"/>
                  <ellipse cx="19" cy="18" rx="1.5" ry="0.8" transform="rotate(15 19 18)"/>
                </g>
                <g fill="#FFF" opacity="0.8">
                  <rect x="10" y="22" width="12" height="8" rx="1" fill="none" stroke="#FFF" strokeWidth="0.8"/>
                  <line x1="12" y1="24" x2="20" y2="24" stroke="#FFF" strokeWidth="0.5"/>
                  <circle cx="13" cy="26" r="0.5"/>
                  <circle cx="16" cy="26" r="0.5"/>
                  <circle cx="19" cy="26" r="0.5"/>
                  <circle cx="13" cy="28" r="0.5"/>
                  <circle cx="16" cy="28" r="0.5"/>
                </g>
              </svg>
              <h1 className="ml-2 text-lg sm:text-xl font-display font-bold text-primary-600">
                <span className="hidden sm:inline">Pranata Mangsa</span>
                <span className="sm:hidden">PM</span>
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button className="p-1.5 sm:p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors">
              <span className="sr-only">View notifications</span>
              <Bell className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
            </button>
            
            <div className="flex items-center">
              <button
                type="button"
                className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 p-1"
                id="user-menu-button"
              >
                <span className="sr-only">Open user menu</span>
                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                  <UserCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
              </button>
              <div className="ml-2 sm:ml-3 hidden lg:block">
                <p className="text-sm font-medium text-gray-700 truncate max-w-24">
                  {user?.name || 'Petani'}
                </p>
                <p className="text-xs text-gray-500 truncate max-w-24">
                  {user?.username || 'petani'}
                </p>
              </div>
              <button
                onClick={logout}
                className="ml-1 sm:ml-2 p-1.5 sm:p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
              >
                <span className="sr-only">Log out</span>
                <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;