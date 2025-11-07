import { ArrowLeft, User, Bell, CreditCard, MapPin, Shield, HelpCircle, Info, LogOut, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import BottomNavigation from './BottomNavigation';
import type { Screen } from '../App';

interface UserSettingsProps {
  onNavigate: (screen: Screen) => void;
}

const settingsSections = [
  {
    title: 'Account',
    items: [
      { icon: User, label: 'Edit Profile', description: 'Name, email, phone number', hasArrow: true },
      { icon: MapPin, label: 'Saved Addresses', description: 'Manage your addresses', hasArrow: true },
      { icon: CreditCard, label: 'Payment Methods', description: 'Cards and billing info', hasArrow: true },
    ]
  },
  {
    title: 'Preferences',
    items: [
      { icon: Bell, label: 'Notifications', description: 'Push, email, SMS', hasToggle: true, enabled: true },
      { icon: Bell, label: 'Job Updates', description: 'Get notified about job status', hasToggle: true, enabled: true },
      { icon: Bell, label: 'Promotions', description: 'Special offers and discounts', hasToggle: true, enabled: false },
    ]
  },
  {
    title: 'Support',
    items: [
      { icon: HelpCircle, label: 'Help Center', description: 'FAQs and support', hasArrow: true },
      { icon: Shield, label: 'Privacy Policy', description: 'How we protect your data', hasArrow: true },
      { icon: Info, label: 'About PlumbaFix', description: 'Version 1.0.0', hasArrow: true },
    ]
  }
];

export default function UserSettings({ onNavigate }: UserSettingsProps) {
  return (
    <div className="h-full flex flex-col bg-[#F4F8FB] relative">
      {/* Header */}
      <div className="bg-white p-6 pt-16 border-b border-gray-100">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onNavigate('home')}
          className="mb-4"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-2xl mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      {/* Settings Content */}
      <div className="flex-1 overflow-y-auto p-6 pb-24">
        {/* User Profile Card */}
        <Card className="p-4 mb-6 border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#007AFF] to-[#0051D5] rounded-full flex items-center justify-center">
              <span className="text-2xl text-white">A</span>
            </div>
            <div className="flex-1">
              <h2 className="text-gray-900 mb-1">Alex Thompson</h2>
              <p className="text-sm text-gray-500">alex.thompson@email.com</p>
              <p className="text-sm text-gray-500">+1 (555) 123-4567</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </Card>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            <h3 className="text-sm text-gray-500 mb-3 px-1">{section.title}</h3>
            <Card className="divide-y divide-gray-100 border-gray-100 overflow-hidden">
              {section.items.map((item, itemIndex) => (
                <div 
                  key={itemIndex}
                  className="p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-[#007AFF]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-[#007AFF]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 mb-1">{item.label}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  {item.hasToggle && (
                    <Switch defaultChecked={item.enabled} />
                  )}
                  {item.hasArrow && (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              ))}
            </Card>
          </div>
        ))}

        {/* Logout Button */}
        <Button 
          variant="outline"
          onClick={() => onNavigate('welcome')}
          className="w-full h-14 rounded-2xl border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 gap-2 mb-6"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </Button>

        {/* App Version */}
        <p className="text-center text-sm text-gray-400 mb-4">
          PlumbaFix v1.0.0
        </p>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeScreen="profile" onNavigate={onNavigate} />
    </div>
  );
}
