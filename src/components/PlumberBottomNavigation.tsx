import { Home, Briefcase, DollarSign, User } from 'lucide-react';
import type { Screen } from '../App';

interface PlumberBottomNavigationProps {
  activeScreen: 'plumber-home' | 'plumber-jobs' | 'plumber-earnings' | 'plumber-profile';
  onNavigate: (screen: Screen) => void;
}

export default function PlumberBottomNavigation({ activeScreen, onNavigate }: PlumberBottomNavigationProps) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-40 safe-area-bottom">
      <div className="grid grid-cols-4 px-2 py-2">
        {/* Home */}
        <button
          onClick={() => onNavigate('plumber-home')}
          className="flex flex-col items-center justify-center gap-1.5 py-2 relative"
        >
          <div className="relative">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-colors ${
              activeScreen === 'plumber-home' 
                ? 'bg-[#007AFF] shadow-sm' 
                : 'bg-gray-50 hover:bg-gray-100'
            }`}>
              <Home className={`w-5 h-5 ${
                activeScreen === 'plumber-home' ? 'text-white' : 'text-gray-600'
              }`} />
            </div>
          </div>
          <span className={`text-xs ${
            activeScreen === 'plumber-home' ? 'text-[#007AFF]' : 'text-gray-500'
          }`}>Home</span>
        </button>

        {/* Jobs */}
        <button
          onClick={() => onNavigate('plumber-job-tracker')}
          className="flex flex-col items-center justify-center gap-1.5 py-2"
        >
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-colors ${
            activeScreen === 'plumber-jobs' 
              ? 'bg-[#007AFF] shadow-sm' 
              : 'bg-gray-50 hover:bg-gray-100'
          }`}>
            <Briefcase className={`w-5 h-5 ${
              activeScreen === 'plumber-jobs' ? 'text-white' : 'text-gray-600'
            }`} />
          </div>
          <span className={`text-xs ${
            activeScreen === 'plumber-jobs' ? 'text-[#007AFF]' : 'text-gray-500'
          }`}>Jobs</span>
        </button>

        {/* Earnings */}
        <button
          onClick={() => onNavigate('plumber-earnings')}
          className="flex flex-col items-center justify-center gap-1.5 py-2"
        >
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-colors ${
            activeScreen === 'plumber-earnings' 
              ? 'bg-[#007AFF] shadow-sm' 
              : 'bg-gray-50 hover:bg-gray-100'
          }`}>
            <DollarSign className={`w-5 h-5 ${
              activeScreen === 'plumber-earnings' ? 'text-white' : 'text-gray-600'
            }`} />
          </div>
          <span className={`text-xs ${
            activeScreen === 'plumber-earnings' ? 'text-[#007AFF]' : 'text-gray-500'
          }`}>Earnings</span>
        </button>

        {/* Profile */}
        <button
          onClick={() => onNavigate('user-profile')}
          className="flex flex-col items-center justify-center gap-1.5 py-2"
        >
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-colors ${
            activeScreen === 'plumber-profile' 
              ? 'bg-[#007AFF] shadow-sm' 
              : 'bg-gray-50 hover:bg-gray-100'
          }`}>
            <User className={`w-5 h-5 ${
              activeScreen === 'plumber-profile' ? 'text-white' : 'text-gray-600'
            }`} />
          </div>
          <span className={`text-xs ${
            activeScreen === 'plumber-profile' ? 'text-[#007AFF]' : 'text-gray-500'
          }`}>Profile</span>
        </button>
      </div>
    </div>
  );
}
