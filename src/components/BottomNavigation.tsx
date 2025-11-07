import { Home, Grid3x3, FileText, User } from 'lucide-react';
import type { Screen } from '../App';

interface BottomNavigationProps {
  activeScreen: 'home' | 'services' | 'jobs' | 'profile';
  onNavigate: (screen: Screen) => void;
}

export default function BottomNavigation({ activeScreen, onNavigate }: BottomNavigationProps) {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-100 z-40 overflow-hidden">
      <div className="grid grid-cols-4 px-2 py-2">
        {/* Home */}
        <button
          onClick={() => onNavigate('home')}
          className="flex flex-col items-center justify-center gap-1.5 py-2 relative"
        >
          <div className="relative">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-colors ${
              activeScreen === 'home' 
                ? 'bg-[#007AFF] shadow-sm' 
                : 'bg-gray-50 hover:bg-gray-100'
            }`}>
              <Home className={`w-5 h-5 ${
                activeScreen === 'home' ? 'text-white' : 'text-gray-600'
              }`} />
            </div>
          </div>
          <span className={`text-xs ${
            activeScreen === 'home' ? 'text-[#007AFF]' : 'text-gray-500'
          }`}>Home</span>
        </button>

        {/* Services */}
        <button
          onClick={() => onNavigate('diagnostic')}
          className="flex flex-col items-center justify-center gap-1.5 py-2"
        >
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-colors ${
            activeScreen === 'services' 
              ? 'bg-[#007AFF] shadow-sm' 
              : 'bg-gray-50 hover:bg-gray-100'
          }`}>
            <Grid3x3 className={`w-5 h-5 ${
              activeScreen === 'services' ? 'text-white' : 'text-gray-600'
            }`} />
          </div>
          <span className={`text-xs ${
            activeScreen === 'services' ? 'text-[#007AFF]' : 'text-gray-500'
          }`}>Services</span>
        </button>

        {/* Jobs */}
        <button
          onClick={() => onNavigate('jobs')}
          className="flex flex-col items-center justify-center gap-1.5 py-2"
        >
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-colors ${
            activeScreen === 'jobs' 
              ? 'bg-[#007AFF] shadow-sm' 
              : 'bg-gray-50 hover:bg-gray-100'
          }`}>
            <FileText className={`w-5 h-5 ${
              activeScreen === 'jobs' ? 'text-white' : 'text-gray-600'
            }`} />
          </div>
          <span className={`text-xs ${
            activeScreen === 'jobs' ? 'text-[#007AFF]' : 'text-gray-500'
          }`}>Jobs</span>
        </button>

        {/* Profile */}
        <button
          onClick={() => onNavigate('user-profile')}
          className="flex flex-col items-center justify-center gap-1.5 py-2"
        >
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-colors ${
            activeScreen === 'profile' 
              ? 'bg-[#007AFF] shadow-sm' 
              : 'bg-gray-50 hover:bg-gray-100'
          }`}>
            <User className={`w-5 h-5 ${
              activeScreen === 'profile' ? 'text-white' : 'text-gray-600'
            }`} />
          </div>
          <span className={`text-xs ${
            activeScreen === 'profile' ? 'text-[#007AFF]' : 'text-gray-500'
          }`}>Profile</span>
        </button>
      </div>
    </div>
  );
}
