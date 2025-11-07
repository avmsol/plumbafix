import { ArrowLeft, User, Mail, Phone, MapPin, Edit2, Star, Award, Briefcase, Shield, Bell, CreditCard, HelpCircle, LogOut, CheckCircle, Clock, DollarSign, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import PlumberBottomNavigation from './PlumberBottomNavigation';
import type { Screen } from '../App';

interface PlumberProfileProps {
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export default function PlumberProfile({ onNavigate, onLogout }: PlumberProfileProps) {
  const plumberInfo = {
    name: 'Mike Johnson',
    email: 'mike.johnson@plumbafix.com',
    phone: '+1 (555) 987-6543',
    businessName: 'Johnson Plumbing Services',
    license: 'CA-PLB-12345',
    address: '456 Professional Way, San Francisco, CA 94105',
    memberSince: 'March 2023',
    photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
    rating: 4.9,
    reviewCount: 247,
    completedJobs: 1243,
    yearsExperience: 12,
  };

  const certifications = [
    { name: 'Licensed Plumber', icon: '🔧', verified: true },
    { name: 'EPA Certified', icon: '♻️', verified: true },
    { name: 'Backflow Prevention', icon: '💧', verified: true },
    { name: 'Gas Line Certified', icon: '🔥', verified: true },
  ];

  const serviceAreas = [
    'San Francisco', 'Oakland', 'Berkeley', 'Daly City', 'South San Francisco'
  ];

  const specialties = [
    'Emergency Repairs',
    'Water Heaters',
    'Drain Cleaning',
    'Pipe Installation',
    'Fixture Replacement',
    'Gas Line Repair',
  ];

  return (
    <div className="h-full flex flex-col bg-[#F4F8FB] relative">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#007AFF] to-[#0051D5] p-6 lg:p-8 pt-16 lg:pt-8 pb-24 lg:pb-32">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onNavigate('plumber-home')}
            className="lg:hidden mb-6 text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl lg:text-3xl text-white mb-2">Professional Profile</h1>
          <p className="text-white/80">Your business information and credentials</p>
        </div>
      </div>

      {/* Profile Card - Overlapping Header */}
      <div className="flex-1 overflow-y-auto -mt-16 px-6 lg:px-8 pb-24 lg:pb-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-6 border-gray-100 shadow-lg mb-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="relative mb-4">
                <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                  <AvatarImage src={plumberInfo.photoUrl} alt={plumberInfo.name} />
                  <AvatarFallback className="bg-[#007AFF] text-white text-2xl">
                    {plumberInfo.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#007AFF] rounded-full flex items-center justify-center border-2 border-white shadow-md">
                  <Edit2 className="w-4 h-4 text-white" />
                </button>
              </div>
              <h2 className="text-xl mb-1">{plumberInfo.name}</h2>
              <p className="text-sm text-gray-600 mb-2">{plumberInfo.businessName}</p>
              <Badge className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0 mb-3">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified Professional
              </Badge>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg">{plumberInfo.rating}</span>
                </div>
                <span className="text-sm text-gray-500">({plumberInfo.reviewCount} reviews)</span>
              </div>
              <p className="text-xs text-gray-500">Member since {plumberInfo.memberSince}</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-gradient-to-br from-[#00C853]/10 to-transparent rounded-xl p-3 text-center">
                <div className="w-8 h-8 bg-[#00C853] rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <p className="text-lg text-[#00C853] mb-1">{plumberInfo.completedJobs}</p>
                <p className="text-xs text-gray-500">Jobs Done</p>
              </div>
              <div className="bg-gradient-to-br from-[#007AFF]/10 to-transparent rounded-xl p-3 text-center">
                <div className="w-8 h-8 bg-[#007AFF] rounded-full flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <p className="text-lg text-[#007AFF] mb-1">{plumberInfo.yearsExperience}</p>
                <p className="text-xs text-gray-500">Years Exp.</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-transparent rounded-xl p-3 text-center">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <p className="text-lg text-purple-600 mb-1">{certifications.length}</p>
                <p className="text-xs text-gray-500">Certified</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={() => onNavigate('plumber-earnings')}
                variant="outline"
                className="rounded-xl gap-2 border-gray-200"
              >
                <DollarSign className="w-4 h-4" />
                Earnings
              </Button>
              <Button 
                className="bg-[#007AFF] hover:bg-[#0051D5] rounded-xl gap-2"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Button>
            </div>
          </Card>

          {/* Certifications & License */}
          <Card className="p-6 border-gray-100 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Certifications & License</h3>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-[#007AFF] gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </Button>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 mb-1">License Number</p>
                  <p className="text-xs text-gray-600">{plumberInfo.license}</p>
                </div>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {certifications.map((cert, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl border border-blue-100"
                >
                  <span className="text-xl">{cert.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-900 truncate">{cert.name}</p>
                    {cert.verified && (
                      <CheckCircle className="w-3 h-3 text-blue-600 mt-1" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Service Areas */}
          <Card className="p-6 border-gray-100 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Service Areas</h3>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-[#007AFF] gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {serviceAreas.map((area, index) => (
                <Badge 
                  key={index}
                  variant="outline"
                  className="bg-white border-gray-200 px-3 py-1"
                >
                  <MapPin className="w-3 h-3 mr-1 text-[#007AFF]" />
                  {area}
                </Badge>
              ))}
            </div>

            <p className="text-xs text-gray-500 mt-3">
              💡 Expand your service area to receive more job requests
            </p>
          </Card>

          {/* Specialties */}
          <Card className="p-6 border-gray-100 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Specialties</h3>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-[#007AFF] gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {specialties.map((specialty, index) => (
                <Badge 
                  key={index}
                  className="bg-gradient-to-r from-[#007AFF] to-[#0051D5] text-white border-0 px-3 py-1"
                >
                  <Briefcase className="w-3 h-3 mr-1" />
                  {specialty}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Personal Information */}
          <Card className="p-6 border-gray-100 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Contact Information</h3>
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
                  <p className="text-gray-900">{plumberInfo.name}</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">Email Address</p>
                  <p className="text-gray-900">{plumberInfo.email}</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">Phone Number</p>
                  <p className="text-gray-900">{plumberInfo.phone}</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">Business Address</p>
                  <p className="text-gray-900">{plumberInfo.address}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Account Settings */}
          <Card className="p-6 border-gray-100 mb-4">
            <h3 className="text-gray-900 mb-4">Account Settings</h3>
            
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left">
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
                  <p className="text-xs text-gray-500">Job alerts and updates</p>
                </div>
                <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180" />
              </button>

              <Separator />

              <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">Payout Settings</p>
                  <p className="text-xs text-gray-500">Bank account and payment preferences</p>
                </div>
                <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180" />
              </button>

              <Separator />

              <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">Availability Schedule</p>
                  <p className="text-xs text-gray-500">Set your working hours and days off</p>
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
            PlumbaFix Professional v1.0.0
          </p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <PlumberBottomNavigation 
        activeScreen="plumber-profile" 
        onNavigate={onNavigate}
      />
    </div>
  );
}
