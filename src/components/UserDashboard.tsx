import { useState } from 'react';
import { ArrowLeft, Download, Star, Clock, CheckCircle2, Droplet, Settings, Trophy, Award, Zap, Target, TrendingUp, Lock, Search, Wrench, User, MapPin, DollarSign, Calendar, Eye, Navigation, Gift } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import BottomNavigation from './BottomNavigation';
import type { Screen, UserProfile, Badge as BadgeType } from '../App';

interface UserDashboardProps {
  onNavigate: (screen: Screen) => void;
  userProfile?: UserProfile;
  onViewJob?: (job: any) => void;
}

const jobs = [
  {
    id: 'DIY-001',
    issueType: 'Leaky Faucet',
    date: 'Oct 20, 2025',
    cost: 0,
    status: 'completed' as const,
    rating: 5,
    jobType: 'diy' as const,
    address: '123 Main St, Seattle, WA',
    baseFee: 0,
    travelFee: 0,
    creditsEarned: 50,
    completionDate: 'Oct 20, 2025',
    description: 'Successfully completed DIY repair: Leaky Faucet',
    image: 'https://images.unsplash.com/photo-1759757707824-4e5f54b7a43c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFraW5nJTIwZmF1Y2V0JTIwcGx1bWJpbmd8ZW58MXx8fHwxNzYxNTY4MDMwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    requiredParts: ['Replacement Washer', 'O-Ring', 'Plumber\'s Tape'],
    requiredTools: ['Adjustable Wrench', 'Screwdriver', 'Pliers'],
    paymentStatus: 'completed' as const,
    diagnosticData: {
      issue: 'Leaky Faucet',
      image: 'https://images.unsplash.com/photo-1759757707824-4e5f54b7a43c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFraW5nJTIwZmF1Y2V0JTIwcGx1bWJpbmd8ZW58MXx8fHwxNzYxNTY4MDMwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      estimatedPrice: { min: 40, max: 70 },
      diyTip: 'Try tightening the faucet handle. If the leak persists, the washer likely needs replacement.',
      severity: 'medium' as const,
      confidence: 92,
      aiAnalysis: 'Our AI detected a leaking faucet caused by a worn washer with 92% confidence. The drip appears steady, indicating internal component wear.',
      detectedAt: 'October 20, 2025, 9:30 AM',
    },
  },
  {
    id: 'DIY-002',
    issueType: 'Clogged Drain',
    date: 'Oct 10, 2025',
    cost: 0,
    status: 'completed' as const,
    rating: 5,
    jobType: 'diy' as const,
    address: '123 Main St, Seattle, WA',
    baseFee: 0,
    travelFee: 0,
    creditsEarned: 75,
    completionDate: 'Oct 10, 2025',
    description: 'Successfully completed DIY repair: Clogged Drain',
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG9nZ2VkJTIwZHJhaW4lMjBwbHVtYmluZ3xlbnwxfHx8fDE3NjE1NjgwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    requiredParts: ['Drain Cleaner', 'Baking Soda', 'Vinegar'],
    requiredTools: ['Plunger', 'Drain Snake'],
    paymentStatus: 'completed' as const,
    diagnosticData: {
      issue: 'Clogged Drain',
      image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG9nZ2VkJTIwZHJhaW4lMjBwbHVtYmluZ3xlbnwxfHx8fDE3NjE1NjgwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      estimatedPrice: { min: 30, max: 60 },
      diyTip: 'Try using a plunger first. For tougher clogs, a drain snake or chemical drain cleaner may help.',
      severity: 'low' as const,
      confidence: 88,
      aiAnalysis: 'Our AI detected a clogged bathroom sink drain with 88% confidence. The slow drainage suggests a partial blockage, likely caused by hair and soap buildup.',
      detectedAt: 'October 10, 2025, 2:15 PM',
    },
  },
  {
    id: 'JOB-003',
    issueType: 'Water Heater Repair',
    date: 'Sep 28, 2025',
    cost: 280,
    status: 'completed' as const,
    rating: 4,
    jobType: 'plumber' as const,
    address: '123 Main St, Seattle, WA',
    baseFee: 180,
    travelFee: 30,
    scheduledDate: 'Sep 28, 2025',
    scheduledTime: '10:00 AM - 12:00 PM',
    laborCost: 180,
    partsCost: 50,
    serviceFee: 15,
    tax: 35,
    paymentStatus: 'completed' as const,
    estimatedDuration: '2-3 hours',
    description: 'Water heater not heating properly. Thermostat replacement needed.',
    image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGhlYXRlciUyMHJlcGFpcnxlbnwxfHx8fDE3NjE1NjgwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    requiredParts: ['Thermostat', 'Heating Element'],
    requiredTools: ['Voltage Tester', 'Screwdriver Set'],
    plumber: {
      id: '2',
      name: 'John Davis',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
      rating: 4.8,
      experience: 12,
      phoneNumber: '(206) 555-0102',
    },
    diagnosticData: {
      issue: 'Water Heater Repair',
      image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGhlYXRlciUyMHJlcGFpcnxlbnwxfHx8fDE3NjE1NjgwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      estimatedPrice: { min: 250, max: 400 },
      severity: 'high' as const,
      confidence: 95,
      aiAnalysis: 'Our AI detected a water heater malfunction with 95% confidence. The issue appears to be related to a faulty thermostat or heating element.',
      detectedAt: 'September 28, 2025, 8:00 AM',
    },
  },
  {
    id: 'JOB-004',
    issueType: 'Pipe Leak',
    date: 'Sep 15, 2025',
    cost: 150,
    status: 'completed' as const,
    rating: 5,
    jobType: 'plumber' as const,
    address: '123 Main St, Seattle, WA',
    baseFee: 100,
    travelFee: 20,
    scheduledDate: 'Sep 15, 2025',
    scheduledTime: '2:00 PM - 4:00 PM',
    laborCost: 100,
    partsCost: 20,
    serviceFee: 10,
    tax: 20,
    paymentStatus: 'completed' as const,
    estimatedDuration: '1-2 hours',
    description: 'Small leak under kitchen sink. Pipe joint replacement.',
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFraW5nJTIwcGlwZSUyMHBsdW1iaW5nfGVufDF8fHx8MTc2MTU2ODAzMHww&ixlib=rb-4.1.0&q=80&w=1080',
    requiredParts: ['Pipe Joint', 'Teflon Tape'],
    requiredTools: ['Pipe Wrench', 'Adjustable Wrench'],
    plumber: {
      id: '1',
      name: 'Mike Johnson',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      rating: 4.9,
      experience: 15,
      phoneNumber: '(206) 555-0101',
    },
    diagnosticData: {
      issue: 'Pipe Leak',
      image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFraW5nJTIwcGlwZSUyMHBsdW1iaW5nfGVufDF8fHx8MTc2MTU2ODAzMHww&ixlib=rb-4.1.0&q=80&w=1080',
      estimatedPrice: { min: 120, max: 180 },
      severity: 'medium' as const,
      confidence: 90,
      aiAnalysis: 'Our AI detected a pipe leak under the sink with 90% confidence. The leak appears to be coming from a loose pipe joint.',
      detectedAt: 'September 15, 2025, 1:00 PM',
    },
  },
];

const LEVEL_THRESHOLDS = [
  { level: 1, name: 'Beginner', minDIY: 0, maxDIY: 2 },
  { level: 2, name: 'Apprentice', minDIY: 3, maxDIY: 6 },
  { level: 3, name: 'Handyman', minDIY: 7, maxDIY: 14 },
  { level: 4, name: 'Expert Plumber', minDIY: 15, maxDIY: 24 },
  { level: 5, name: 'Master Plumber', minDIY: 25, maxDIY: 999 },
];

const ALL_BADGES = [
  { id: 'first-fix', name: 'First Fix', icon: '🔧', description: 'Completed your first DIY repair', unlockAt: 1 },
  { id: 'three-streak', name: 'Getting Started', icon: '🌟', description: 'Completed 3 DIY repairs', unlockAt: 3 },
  { id: 'water-wizard', name: 'Water Wizard', icon: '💧', description: 'Fixed 5 water-related issues', unlockAt: 5 },
  { id: 'tool-master', name: 'Tool Master', icon: '🛠️', description: 'Completed 7 DIY repairs', unlockAt: 7 },
  { id: 'save-master', name: 'Money Saver', icon: '💰', description: 'Saved $500+ with DIY repairs', unlockAt: 10 },
  { id: 'pro-level', name: 'DIY Pro', icon: '⚡', description: 'Completed 15 DIY repairs', unlockAt: 15 },
  { id: 'legend', name: 'Plumbing Legend', icon: '👑', description: 'Completed 25 DIY repairs', unlockAt: 25 },
];

export default function UserDashboard({ onNavigate, userProfile, onViewJob }: UserDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'diy' | 'plumber'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all');

  // Calculate progress to next level
  const currentLevel = LEVEL_THRESHOLDS.find(t => 
    userProfile && userProfile.diyCompletedCount >= t.minDIY && userProfile.diyCompletedCount <= t.maxDIY
  ) || LEVEL_THRESHOLDS[0];
  
  const nextLevel = LEVEL_THRESHOLDS.find(t => t.level === currentLevel.level + 1);
  const progressToNext = nextLevel 
    ? ((userProfile?.diyCompletedCount || 0) - currentLevel.minDIY) / (nextLevel.minDIY - currentLevel.minDIY) * 100
    : 100;

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.issueType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || job.jobType === filterType;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && job.status !== 'completed') ||
                         (filterStatus === 'completed' && job.status === 'completed');
    return matchesSearch && matchesType && matchesStatus;
  });

  const diyJobs = filteredJobs.filter(j => j.jobType === 'diy');
  const plumberJobs = filteredJobs.filter(j => j.jobType === 'plumber');
  const activeJobs = filteredJobs.filter(j => j.status !== 'completed');
  const completedJobs = filteredJobs.filter(j => j.status === 'completed');

  return (
    <div className="h-full flex flex-col bg-white relative">
      {/* Header */}
      <div className="p-6 lg:p-8 pt-16 lg:pt-8 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onNavigate('home')}
              className="lg:hidden"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div className="lg:flex-1">
              <h1 className="text-2xl lg:text-3xl mb-2">My Dashboard</h1>
              <p className="text-gray-600">Track your progress and achievements</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onNavigate('user-settings')}
              className="lg:hidden"
            >
              <Settings className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="profile" className="h-full flex flex-col">
          <div className="border-b border-gray-100 bg-white">
            <div className="max-w-6xl mx-auto">
              <TabsList className="w-full rounded-none border-0 h-14 bg-white justify-start">
            <TabsTrigger value="profile" className="flex-1 lg:flex-none lg:px-8 data-[state=active]:border-b-2 data-[state=active]:border-[#007AFF] rounded-none">
              Profile
            </TabsTrigger>
            <TabsTrigger value="jobs" className="flex-1 lg:flex-none lg:px-8 data-[state=active]:border-b-2 data-[state=active]:border-[#007AFF] rounded-none">
              Jobs
            </TabsTrigger>
            <TabsTrigger value="receipts" className="flex-1 lg:flex-none lg:px-8 data-[state=active]:border-b-2 data-[state=active]:border-[#007AFF] rounded-none">
              Receipts
            </TabsTrigger>
          </TabsList>
            </div>
          </div>

          {/* Profile Tab - Gamification */}
          <TabsContent value="profile" className="flex-1 overflow-y-auto p-6 lg:p-8 pb-24 lg:pb-8 mt-0">
            <div className="max-w-6xl mx-auto">
            {/* Credits & Level Overview */}
            <div className="bg-gradient-to-br from-[#007AFF] to-[#0051D5] rounded-3xl p-6 mb-6 text-white">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-white/80 text-sm mb-1">Your Level</p>
                  <h2 className="text-2xl">{userProfile?.levelName || 'Beginner'}</h2>
                </div>
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-[#FFD700]" />
                    <p className="text-sm text-white/80">Credits</p>
                  </div>
                  <p className="text-3xl">{userProfile?.credits || 0}</p>
                  <p className="text-xs text-white/60 mt-1">Available to redeem</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-[#FFD700]" />
                    <p className="text-sm text-white/80">DIY Repairs</p>
                  </div>
                  <p className="text-3xl">{userProfile?.diyCompletedCount || 0}</p>
                  <p className="text-xs text-white/60 mt-1">Successfully completed</p>
                </div>
              </div>
            </div>

            {/* Level Progress */}
            <Card className="p-6 border-gray-100 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#007AFF]" />
                  <h3 className="text-gray-900">Level Progress</h3>
                </div>
                <Badge className="bg-[#007AFF] text-white">
                  Level {userProfile?.level || 1}
                </Badge>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">{currentLevel.name}</span>
                  {nextLevel && (
                    <span className="text-gray-600">{nextLevel.name}</span>
                  )}
                </div>
                <Progress value={progressToNext} className="h-3" />
              </div>
              
              {nextLevel && (
                <p className="text-sm text-gray-500 text-center">
                  {nextLevel.minDIY - (userProfile?.diyCompletedCount || 0)} more DIY repairs to reach {nextLevel.name}
                </p>
              )}
              {!nextLevel && (
                <p className="text-sm text-[#00C853] text-center">
                  🎉 Maximum level reached!
                </p>
              )}
            </Card>

            {/* Badges Collection */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-[#FFD700]" />
                <h3 className="text-gray-900">Badges</h3>
                <Badge variant="outline" className="ml-auto">
                  {userProfile?.badges.length || 0}/{ALL_BADGES.length}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {ALL_BADGES.map((badge) => {
                  const isUnlocked = userProfile?.badges.some(b => b.id === badge.id);
                  const canUnlock = (userProfile?.diyCompletedCount || 0) >= badge.unlockAt;
                  
                  return (
                    <Card 
                      key={badge.id}
                      className={`p-4 border-2 transition-all ${
                        isUnlocked 
                          ? 'border-[#FFD700] bg-gradient-to-br from-[#FFD700]/10 to-white' 
                          : canUnlock
                          ? 'border-[#007AFF] bg-blue-50/30'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="text-center">
                        <div className={`text-4xl mb-2 ${!isUnlocked && !canUnlock ? 'grayscale opacity-40' : ''}`}>
                          {isUnlocked ? badge.icon : canUnlock ? badge.icon : '🔒'}
                        </div>
                        <p className={`text-sm mb-1 ${!isUnlocked && !canUnlock ? 'text-gray-400' : 'text-gray-900'}`}>
                          {badge.name}
                        </p>
                        <p className={`text-xs leading-tight ${!isUnlocked && !canUnlock ? 'text-gray-400' : 'text-gray-500'}`}>
                          {badge.description}
                        </p>
                        {!isUnlocked && (
                          <p className="text-xs text-[#007AFF] mt-2">
                            {canUnlock ? 'Ready to unlock!' : `${badge.unlockAt} DIY needed`}
                          </p>
                        )}
                        {isUnlocked && (
                          <Badge className="bg-[#00C853] text-white text-xs mt-2">
                            Unlocked
                          </Badge>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Achievements Summary */}
            <Card className="p-6 border-gray-100 bg-gradient-to-br from-[#F4F8FB] to-white">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-[#FFD700] fill-[#FFD700]" />
                <h3 className="text-gray-900">Your Achievements</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Credits Earned</span>
                  <span className="text-[#007AFF]">{userProfile?.totalCreditsEarned || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Badges Unlocked</span>
                  <span className="text-[#007AFF]">{userProfile?.badges.length || 0}/{ALL_BADGES.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Current Level</span>
                  <span className="text-[#007AFF]">{userProfile?.levelName || 'Beginner'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">DIY Repairs Completed</span>
                  <span className="text-[#007AFF]">{userProfile?.diyCompletedCount || 0}</span>
                </div>
              </div>
            </Card>

            {/* How Credits Work */}
            <Card className="p-6 border-2 border-[#007AFF]/20 bg-blue-50/30 mt-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#007AFF] rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-gray-900 mb-2">How to Earn Credits</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Complete DIY repairs to earn 50+ credits</li>
                    <li>• Unlock badges for bonus credits</li>
                    <li>• Level up to get credit rewards</li>
                    <li>• Redeem credits on plumber bookings</li>
                  </ul>
                </div>
              </div>
            </Card>
            </div>
          </TabsContent>

          <TabsContent value="jobs" className="flex-1 overflow-y-auto pb-24 lg:pb-8 mt-0">
            <div className="max-w-6xl mx-auto">
              {/* Search & Filters */}
              <div className="p-6 lg:p-8 pb-4">
                {/* Search Bar */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input 
                    placeholder="Search by issue type or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 rounded-xl border-gray-200"
                  />
                </div>

                {/* Filter Chips */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  <Button
                    variant={filterType === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterType('all')}
                    className={`rounded-full flex-shrink-0 ${
                      filterType === 'all' ? 'bg-[#007AFF] hover:bg-[#0051D5]' : ''
                    }`}
                  >
                    All Jobs
                  </Button>
                  <Button
                    variant={filterType === 'diy' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterType('diy')}
                    className={`rounded-full flex-shrink-0 gap-1 ${
                      filterType === 'diy' ? 'bg-purple-600 hover:bg-purple-700' : ''
                    }`}
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    DIY
                  </Button>
                  <Button
                    variant={filterType === 'plumber' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterType('plumber')}
                    className={`rounded-full flex-shrink-0 gap-1 ${
                      filterType === 'plumber' ? 'bg-blue-600 hover:bg-blue-700' : ''
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    Plumber
                  </Button>
                  <Button
                    variant={filterStatus === 'active' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterStatus(filterStatus === 'active' ? 'all' : 'active')}
                    className={`rounded-full flex-shrink-0 gap-1 ${
                      filterStatus === 'active' ? 'bg-orange-600 hover:bg-orange-700' : ''
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    Active
                  </Button>
                  <Button
                    variant={filterStatus === 'completed' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterStatus(filterStatus === 'completed' ? 'all' : 'completed')}
                    className={`rounded-full flex-shrink-0 gap-1 ${
                      filterStatus === 'completed' ? 'bg-green-600 hover:bg-green-700' : ''
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Completed
                  </Button>
                </div>
              </div>

              {/* Summary Stats */}
              <div className="px-6 lg:px-8 pb-4">
                <div className="grid grid-cols-4 gap-3">
                  <div className="text-center">
                    <p className="text-2xl lg:text-3xl text-[#007AFF] mb-1">{jobs.length}</p>
                    <p className="text-xs text-gray-500">Total</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl lg:text-3xl text-purple-600 mb-1">{diyJobs.length}</p>
                    <p className="text-xs text-gray-500">DIY</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl lg:text-3xl text-blue-600 mb-1">{plumberJobs.length}</p>
                    <p className="text-xs text-gray-500">Plumber</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl lg:text-3xl text-[#00C853] mb-1">{completedJobs.length}</p>
                    <p className="text-xs text-gray-500">Done</p>
                  </div>
                </div>
              </div>

              {/* Tabs & Jobs List */}
              <div className="px-6 lg:px-8">
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-4 bg-gray-100 rounded-xl p-1">
                    <TabsTrigger value="all" className="rounded-lg">
                      All ({filteredJobs.length})
                    </TabsTrigger>
                    <TabsTrigger value="active" className="rounded-lg">
                      Active ({activeJobs.length})
                    </TabsTrigger>
                    <TabsTrigger value="completed" className="rounded-lg">
                      Completed ({completedJobs.length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-3 mt-0">
                    {filteredJobs.length > 0 ? (
                      filteredJobs.map(job => {
                        const isDIY = job.jobType === 'diy';
                        return (
                          <Card key={job.id} className="p-4 border-gray-100 hover:border-[#007AFF] transition-all">
                            <div className="flex items-start gap-3">
                              {/* Icon */}
                              <div className="w-12 h-12 bg-[#00C853]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <CheckCircle2 className="w-5 h-5 text-[#00C853]" />
                              </div>

                              <div className="flex-1 min-w-0">
                                {/* Header */}
                                <div className="flex items-start justify-between gap-2 mb-2">
                                  <div className="flex-1 min-w-0">
                                    <h3 className="text-gray-900 truncate">{job.issueType}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                      <Badge className={`${isDIY ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'} hover:${isDIY ? 'bg-purple-100' : 'bg-blue-100'} text-xs`}>
                                        {isDIY ? (
                                          <>
                                            <Wrench className="w-3 h-3 mr-1" />
                                            DIY
                                          </>
                                        ) : (
                                          <>
                                            <User className="w-3 h-3 mr-1" />
                                            Plumber
                                          </>
                                        )}
                                      </Badge>
                                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                                        Completed
                                      </Badge>
                                    </div>
                                  </div>
                                </div>

                                {/* Job Details */}
                                <div className="space-y-1.5 mb-3">
                                  {!isDIY && job.plumber && (
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                      <User className="w-4 h-4 text-gray-400" />
                                      <span>{job.plumber.name}</span>
                                    </div>
                                  )}
                                  
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <MapPin className="w-4 h-4 text-gray-400" />
                                    <span className="truncate">{job.address}</span>
                                  </div>
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-3">
                                    {isDIY && job.creditsEarned ? (
                                      <div className="flex items-center gap-1 text-purple-600">
                                        <Gift className="w-4 h-4" />
                                        <span className="text-sm">+{job.creditsEarned} credits</span>
                                      </div>
                                    ) : (
                                      <div className="flex items-center gap-1">
                                        <DollarSign className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm">${job.cost}</span>
                                      </div>
                                    )}
                                  </div>

                                  <Button 
                                    size="sm" 
                                    className="bg-[#007AFF] hover:bg-[#0051D5] gap-1 rounded-lg"
                                    onClick={() => onViewJob && onViewJob(job)}
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                    View
                                  </Button>
                                </div>

                                {/* Rating */}
                                {job.rating && (
                                  <div className="flex items-center gap-1 mt-3 pt-3 border-t border-gray-100">
                                    <span className="text-xs text-gray-500">Your rating:</span>
                                    <div className="flex items-center gap-0.5">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`w-3.5 h-3.5 ${
                                            i < job.rating
                                              ? 'fill-yellow-400 text-yellow-400'
                                              : 'text-gray-300'
                                          }`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </Card>
                        );
                      })
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <Wrench className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500">No jobs found</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="active" className="space-y-3 mt-0">
                    {activeJobs.length > 0 ? (
                      activeJobs.map(job => {
                        const isDIY = job.jobType === 'diy';
                        return (
                          <Card key={job.id} className="p-4 border-gray-100 hover:border-[#007AFF] transition-all">
                            <div className="flex items-start gap-3">
                              <div className="w-12 h-12 bg-[#007AFF]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Clock className="w-5 h-5 text-orange-500" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-gray-900 truncate mb-2">{job.issueType}</h3>
                                <p className="text-sm text-gray-500">Active job</p>
                              </div>
                            </div>
                          </Card>
                        );
                      })
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <Clock className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500">No active jobs</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="completed" className="space-y-3 mt-0">
                    {completedJobs.map(job => {
                      const isDIY = job.jobType === 'diy';
                      return (
                        <Card key={job.id} className="p-4 border-gray-100 hover:border-[#007AFF] transition-all">
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 bg-[#00C853]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                              <CheckCircle2 className="w-5 h-5 text-[#00C853]" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-gray-900 truncate">{job.issueType}</h3>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge className={`${isDIY ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'} hover:${isDIY ? 'bg-purple-100' : 'bg-blue-100'} text-xs`}>
                                      {isDIY ? (
                                        <>
                                          <Wrench className="w-3 h-3 mr-1" />
                                          DIY
                                        </>
                                      ) : (
                                        <>
                                          <User className="w-3 h-3 mr-1" />
                                          Plumber
                                        </>
                                      )}
                                    </Badge>
                                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                                      Completed
                                    </Badge>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-1.5 mb-3">
                                {!isDIY && job.plumber && (
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <User className="w-4 h-4 text-gray-400" />
                                    <span>{job.plumber.name}</span>
                                  </div>
                                )}
                                
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <MapPin className="w-4 h-4 text-gray-400" />
                                  <span className="truncate">{job.address}</span>
                                </div>
                              </div>

                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-3">
                                  {isDIY && job.creditsEarned ? (
                                    <div className="flex items-center gap-1 text-purple-600">
                                      <Gift className="w-4 h-4" />
                                      <span className="text-sm">+{job.creditsEarned} credits</span>
                                    </div>
                                  ) : (
                                    <div className="flex items-center gap-1">
                                      <DollarSign className="w-4 h-4 text-gray-400" />
                                      <span className="text-sm">${job.cost}</span>
                                    </div>
                                  )}
                                </div>

                                <Button 
                                  size="sm" 
                                  className="bg-[#007AFF] hover:bg-[#0051D5] gap-1 rounded-lg"
                                  onClick={() => onViewJob && onViewJob(job)}
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  View
                                </Button>
                              </div>

                              {job.rating && (
                                <div className="flex items-center gap-1 mt-3 pt-3 border-t border-gray-100">
                                  <span className="text-xs text-gray-500">Your rating:</span>
                                  <div className="flex items-center gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-3.5 h-3.5 ${
                                          i < job.rating
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-gray-300'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="receipts" className="flex-1 overflow-y-auto p-6 lg:p-8 pb-24 lg:pb-8 mt-0">
            <div className="max-w-6xl mx-auto">
            <div className="space-y-3">
              {jobs.map((job) => (
                <Card key={job.id} className="p-4 border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-gray-900 mb-1">{job.issueType}</p>
                      <p className="text-sm text-gray-500">{job.date}</p>
                    </div>
                    <p className="text-lg text-gray-900">${job.cost}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 rounded-xl gap-2">
                      <Download className="w-4 h-4" />
                      Download PDF
                    </Button>
                    <Button size="sm" className="flex-1 bg-[#007AFF] hover:bg-[#0051D5] rounded-xl">
                      View Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeScreen="jobs" onNavigate={onNavigate} />
    </div>
  );
}
