import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Edit2, Star, Trophy, Zap, Shield, Bell, CreditCard, HelpCircle, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import BottomNavigation from './BottomNavigation';
import type { Screen, UserProfile as UserProfileType } from '../App';

interface UserProfileProps {
  onNavigate: (screen: Screen) => void;
  userProfile?: UserProfileType;
  onLogout: () => void;
}

export default function UserProfile({ onNavigate, userProfile, onLogout }: UserProfileProps) {
  const userInfo = {
    name: 'Sarah Anderson',
    email: 'sarah.anderson@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, San Francisco, CA 94102',
    memberSince: 'January 2024',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  };

  return (
    <div className="h-full flex flex-col bg-[#F4F8FB] relative">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#007AFF] to-[#0051D5] p-6 lg:p-8 pt-16 lg:pt-8 pb-24 lg:pb-32">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onNavigate('home')}
            className="lg:hidden mb-6 text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl lg:text-3xl text-white mb-2">My Profile</h1>
          <p className="text-white/80">Manage your account and preferences</p>
        </div>
      </div>

      {/* Profile Card - Overlapping Header */}
      <div className="flex-1 overflow-y-auto -mt-16 px-6 lg:px-8 pb-24 lg:pb-8">
        <div className="max-w-4xl mx-auto">
        <Card className="p-6 border-gray-100 shadow-lg mb-6">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative mb-4">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                <AvatarImage src={userInfo.photoUrl} alt={userInfo.name} />
                <AvatarFallback className="bg-[#007AFF] text-white text-2xl">
                  {userInfo.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#007AFF] rounded-full flex items-center justify-center border-2 border-white shadow-md">
                <Edit2 className="w-4 h-4 text-white" />
              </button>
            </div>
            <h2 className="text-xl mb-1">{userInfo.name}</h2>
            <p className="text-sm text-gray-500 mb-3">Member since {userInfo.memberSince}</p>
            <Badge className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-gray-900 border-0">
              {userProfile?.levelName || 'Beginner'} Plumber
            </Badge>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-gradient-to-br from-[#007AFF]/10 to-transparent rounded-xl p-3 text-center">
              <div className="w-8 h-8 bg-[#007AFF] rounded-full flex items-center justify-center mx-auto mb-2">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <p className="text-lg text-[#007AFF] mb-1">{userProfile?.credits || 0}</p>
              <p className="text-xs text-gray-500">Credits</p>
            </div>
            <div className="bg-gradient-to-br from-[#FFD700]/10 to-transparent rounded-xl p-3 text-center">
              <div className="w-8 h-8 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-2">
                <Trophy className="w-4 h-4 text-gray-900" />
              </div>
              <p className="text-lg text-[#FFD700] mb-1">{userProfile?.badges.length || 0}</p>
              <p className="text-xs text-gray-500">Badges</p>
            </div>
            <div className="bg-gradient-to-br from-[#00C853]/10 to-transparent rounded-xl p-3 text-center">
              <div className="w-8 h-8 bg-[#00C853] rounded-full flex items-center justify-center mx-auto mb-2">
                <Star className="w-4 h-4 text-white" />
              </div>
              <p className="text-lg text-[#00C853] mb-1">4.9</p>
              <p className="text-xs text-gray-500">Rating</p>
            </div>
          </div>

          <Button 
            onClick={() => onNavigate('user-dashboard')}
            className="w-full bg-[#007AFF] hover:bg-[#0051D5] rounded-xl gap-2"
          >
            <Trophy className="w-4 h-4" />
            View Full Dashboard
          </Button>
        </Card>

        {/* Personal Information */}
        <Card className="p-6 border-gray-100 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Personal Information</h3>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-[#007AFF] gap-2"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-[#007AFF]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Full Name</p>
                <p className="text-gray-900">{userInfo.name}</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Email Address</p>
                <p className="text-gray-900">{userInfo.email}</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Phone Number</p>
                <p className="text-gray-900">{userInfo.phone}</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Address</p>
                <p className="text-gray-900">{userInfo.address}</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-pink-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Member Since</p>
                <p className="text-gray-900">{userInfo.memberSince}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Account Settings */}
        <Card className="p-6 border-gray-100 mb-4">
          <h3 className="text-gray-900 mb-4">Account Settings</h3>
          
          <div className="space-y-3">
            <button 
              onClick={() => onNavigate('user-settings')}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#007AFF]" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">Privacy & Security</p>
                <p className="text-xs text-gray-500">Manage your privacy settings</p>
              </div>
              <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180" />
            </button>

            <Separator />

            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Bell className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">Notifications</p>
                <p className="text-xs text-gray-500">Push, email, and SMS preferences</p>
              </div>
              <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180" />
            </button>

            <Separator />

            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">Payment Methods</p>
                <p className="text-xs text-gray-500">Manage cards and payment options</p>
              </div>
              <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180" />
            </button>

            <Separator />

            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">Help & Support</p>
                <p className="text-xs text-gray-500">FAQs, contact us, and feedback</p>
              </div>
              <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180" />
            </button>
          </div>
        </Card>

        {/* Logout Button */}
        <Button 
          onClick={onLogout}
          variant="outline"
          className="w-full h-12 rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 gap-2 mb-6"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </Button>

        {/* App Version */}
        <p className="text-center text-xs text-gray-400 mb-6">
          PlumbaFix v1.0.0
        </p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeScreen="profile" onNavigate={onNavigate} />
    </div>
  );
}
