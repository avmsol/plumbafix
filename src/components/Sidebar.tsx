import { Home, Grid3x3, FileText, User, Settings, Trophy, Wrench, DollarSign, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import type { Screen, UserProfile, UserType } from '../App';

interface SidebarProps {
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
  userType: UserType;
  userProfile?: UserProfile;
  onSwitchUserType: () => void;
}

export default function Sidebar({ activeScreen, onNavigate, userType, userProfile, onSwitchUserType }: SidebarProps) {
  const isCustomer = userType === 'customer';

  const customerMenuItems = [
    { screen: 'home' as Screen, icon: Home, label: 'Home' },
    { screen: 'diagnostic' as Screen, icon: Grid3x3, label: 'Diagnose Issue' },
    { screen: 'jobs' as Screen, icon: FileText, label: 'My Jobs' },
    { screen: 'user-profile' as Screen, icon: User, label: 'Profile' },
  ];

  const plumberMenuItems = [
    { screen: 'plumber-home' as Screen, icon: Home, label: 'Home' },
    { screen: 'plumber-job-tracker' as Screen, icon: Wrench, label: 'Active Jobs' },
    { screen: 'plumber-earnings' as Screen, icon: DollarSign, label: 'Earnings' },
    { screen: 'user-profile' as Screen, icon: User, label: 'Profile' },
  ];

  const menuItems = isCustomer ? customerMenuItems : plumberMenuItems;

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 bg-white border-r border-gray-200 z-50">
      {/* Logo/Brand */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-200">
        <div className="w-10 h-10 bg-gradient-to-br from-[#007AFF] to-[#0051D5] rounded-xl flex items-center justify-center">
          <Wrench className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl text-gray-900">PlumbaFix</h1>
          <p className="text-xs text-gray-500">Smart Plumbing Assistant</p>
        </div>
      </div>

      {/* User Profile Card (Customer) */}
      {isCustomer && userProfile && (
        <div className="px-4 py-4 border-b border-gray-200">
          <div 
            onClick={() => onNavigate('user-profile')}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <Avatar className="w-12 h-12 border-2 border-[#007AFF]">
              <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" />
              <AvatarFallback className="bg-[#007AFF] text-white">SA</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 truncate">Sarah Anderson</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-[#FFD700] text-gray-900 text-xs px-2 py-0">
                  {userProfile.levelName}
                </Badge>
                <span className="text-xs text-gray-500">{userProfile.credits} credits</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Profile Card (Plumber) */}
      {!isCustomer && (
        <div className="px-4 py-4 border-b border-gray-200">
          <div 
            onClick={() => onNavigate('user-profile')}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <Avatar className="w-12 h-12 border-2 border-[#007AFF]">
              <AvatarImage src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop" />
              <AvatarFallback className="bg-[#007AFF] text-white">MJ</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 truncate">Mike Johnson</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs px-2 py-0">
                  ⭐ 4.9
                </Badge>
                <span className="text-xs text-gray-500">1,243 jobs</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-4 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.screen || 
                           (item.screen === 'home' && activeScreen === 'camera') ||
                           (item.screen === 'home' && activeScreen === 'diagnostic-result') ||
                           (item.screen === 'home' && activeScreen === 'diy-guide') ||
                           (item.screen === 'home' && activeScreen === 'diy-rewards') ||
                           (item.screen === 'home' && activeScreen === 'job-request') ||
                           (item.screen === 'home' && activeScreen === 'plumber-matching') ||
                           (item.screen === 'home' && activeScreen === 'job-tracker');

            return (
              <button
                key={item.screen}
                onClick={() => onNavigate(item.screen)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-[#007AFF] text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Gamification Quick Stats (Customer only) */}
        {isCustomer && userProfile && (userProfile.credits > 0 || userProfile.level > 1) && (
          <div className="mt-6 p-4 bg-gradient-to-br from-[#007AFF]/10 to-transparent rounded-xl border border-[#007AFF]/20">
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-4 h-4 text-[#007AFF]" />
              <span className="text-sm text-gray-900">Your Progress</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Credits</span>
                <span className="text-[#007AFF]">{userProfile.credits}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Level</span>
                <span className="text-[#007AFF]">{userProfile.level}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Badges</span>
                <span className="text-[#007AFF]">{userProfile.badges.length}/7</span>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Bottom Actions */}
      <div className="px-4 py-4 border-t border-gray-200 space-y-2">
        {isCustomer && (
          <Button
            variant="ghost"
            onClick={() => onNavigate('user-settings')}
            className="w-full justify-start gap-3 text-gray-600 hover:text-gray-900"
          >
            <Settings className="w-5 h-5" />
            <span className="text-sm">Settings</span>
          </Button>
        )}
        
        <Button
          variant="ghost"
          onClick={onSwitchUserType}
          className="w-full justify-start gap-3 text-gray-600 hover:text-gray-900"
        >
          <User className="w-5 h-5" />
          <span className="text-sm">
            Switch to {isCustomer ? 'Plumber' : 'Customer'}
          </span>
        </Button>

        <Separator className="my-2" />

        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Log Out</span>
        </Button>
      </div>
    </div>
  );
}
