import { useState, useEffect } from 'react';
import { ArrowRight, Trophy, Award, Star, Zap, TrendingUp, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import type { Screen, UserProfile, Badge as BadgeType } from '../App';

interface DIYRewardsProps {
  onNavigate: (screen: Screen) => void;
  issueTitle: string;
  onUpdateProfile: (profile: UserProfile) => void;
  currentProfile: UserProfile;
  onJobCompleted?: (creditsEarned: number) => void;
}

const LEVEL_THRESHOLDS = [
  { level: 1, name: 'Beginner', minDIY: 0 },
  { level: 2, name: 'Apprentice', minDIY: 3 },
  { level: 3, name: 'Handyman', minDIY: 7 },
  { level: 4, name: 'Expert Plumber', minDIY: 15 },
  { level: 5, name: 'Master Plumber', minDIY: 25 },
];

const AVAILABLE_BADGES = [
  { id: 'first-fix', name: 'First Fix', icon: '🔧', description: 'Completed your first DIY repair', unlockAt: 1 },
  { id: 'three-streak', name: 'Getting Started', icon: '🌟', description: 'Completed 3 DIY repairs', unlockAt: 3 },
  { id: 'water-wizard', name: 'Water Wizard', icon: '💧', description: 'Fixed 5 water-related issues', unlockAt: 5 },
  { id: 'tool-master', name: 'Tool Master', icon: '🛠️', description: 'Completed 7 DIY repairs', unlockAt: 7 },
  { id: 'save-master', name: 'Money Saver', icon: '💰', description: 'Saved $500+ with DIY repairs', unlockAt: 10 },
  { id: 'pro-level', name: 'DIY Pro', icon: '⚡', description: 'Completed 15 DIY repairs', unlockAt: 15 },
  { id: 'legend', name: 'Plumbing Legend', icon: '👑', description: 'Completed 25 DIY repairs', unlockAt: 25 },
];

export default function DIYRewards({ onNavigate, issueTitle, onUpdateProfile, currentProfile, onJobCompleted }: DIYRewardsProps) {
  const [showAnimation, setShowAnimation] = useState(false);
  const [earnedCredits] = useState(50); // Base credits for completing DIY
  const [bonusCredits] = useState(20); // Bonus for level up or badge

  // Calculate new profile data
  const newDIYCount = currentProfile.diyCompletedCount + 1;
  const newTotalCredits = earnedCredits + (bonusCredits || 0);
  const newCreditsBalance = currentProfile.credits + newTotalCredits;
  
  // Check level up
  const newLevel = LEVEL_THRESHOLDS
    .filter(threshold => newDIYCount >= threshold.minDIY)
    .sort((a, b) => b.level - a.level)[0];
  
  const leveledUp = newLevel.level > currentProfile.level;
  
  // Check new badges
  const newBadges = AVAILABLE_BADGES.filter(
    badge => newDIYCount >= badge.unlockAt && 
    !currentProfile.badges.find(b => b.id === badge.id)
  ).map(badge => ({
    ...badge,
    unlockedAt: new Date().toISOString(),
  }));

  const hasNewBadge = newBadges.length > 0;

  // Calculate next milestone
  const nextThreshold = LEVEL_THRESHOLDS.find(t => t.minDIY > newDIYCount);
  const progressToNext = nextThreshold 
    ? ((newDIYCount - newLevel.minDIY) / (nextThreshold.minDIY - newLevel.minDIY)) * 100
    : 100;

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  const handleContinue = () => {
    // Update profile
    const updatedProfile: UserProfile = {
      credits: newCreditsBalance,
      level: newLevel.level,
      levelName: newLevel.name,
      diyCompletedCount: newDIYCount,
      badges: [...currentProfile.badges, ...newBadges],
      totalCreditsEarned: currentProfile.totalCreditsEarned + newTotalCredits,
    };
    onUpdateProfile(updatedProfile);
    
    // Notify parent about DIY job completion
    if (onJobCompleted) {
      onJobCompleted(newTotalCredits);
    }
    
    onNavigate('home');
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-[#007AFF]/5 via-white to-[#00C853]/5">
      {/* Confetti Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {showAnimation && (
          <>
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10%',
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              >
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: ['#007AFF', '#00C853', '#FFD700', '#FF6B6B', '#4ECDC4'][Math.floor(Math.random() * 5)],
                  }}
                />
              </div>
            ))}
          </>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 pt-20">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-[#00C853] to-[#00A843] rounded-full flex items-center justify-center shadow-xl animate-bounce">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#FFD700] rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-gray-900 mb-2">Congratulations! 🎉</h1>
          <p className="text-gray-600">
            You've successfully completed the DIY repair!
          </p>
          <p className="text-sm text-gray-500 mt-1">{issueTitle}</p>
        </div>

        {/* Credits Earned */}
        <div className="bg-white rounded-3xl p-6 mb-4 border-2 border-[#00C853] shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#FFD700]/20 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-[#FFD700]" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Credits Earned</p>
                <p className="text-2xl text-[#00C853]">+{newTotalCredits}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Total Balance</p>
              <p className="text-xl text-[#007AFF]">{newCreditsBalance}</p>
            </div>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Base reward</span>
              <span className="text-[#00C853]">+{earnedCredits}</span>
            </div>
            {bonusCredits > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>{leveledUp ? '🎊 Level up bonus' : '🏆 Achievement bonus'}</span>
                <span className="text-[#00C853]">+{bonusCredits}</span>
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              💡 Redeem credits on your next plumber booking!
            </p>
          </div>
        </div>

        {/* Level Progress */}
        <div className="bg-white rounded-3xl p-6 mb-4 shadow-lg">
          {leveledUp && (
            <div className="mb-4 p-3 bg-gradient-to-r from-[#FFD700]/20 to-[#FF6B6B]/20 rounded-xl border-2 border-[#FFD700] text-center">
              <p className="text-sm">🎊 Level Up!</p>
            </div>
          )}
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#007AFF] to-[#0051D5] rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Level</p>
                <p className="text-xl text-[#007AFF]">
                  Level {newLevel.level} - {newLevel.name}
                </p>
              </div>
            </div>
            <Badge className="bg-[#007AFF] text-white">
              {newDIYCount} DIY
            </Badge>
          </div>

          {nextThreshold && (
            <>
              <Progress value={progressToNext} className="h-2 mb-2" />
              <p className="text-xs text-gray-500 text-center">
                {nextThreshold.minDIY - newDIYCount} more repairs to reach <span className="text-[#007AFF]">{nextThreshold.name}</span>
              </p>
            </>
          )}
        </div>

        {/* New Badges */}
        {hasNewBadge && (
          <div className="bg-white rounded-3xl p-6 mb-4 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-[#FFD700]" />
              <h3 className="text-gray-900">New Badges Unlocked!</h3>
            </div>
            <div className="space-y-3">
              {newBadges.map((badge) => (
                <div 
                  key={badge.id}
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#FFD700]/10 to-transparent rounded-xl border border-[#FFD700]/30 animate-pulse"
                >
                  <div className="text-3xl">{badge.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{badge.name}</p>
                    <p className="text-xs text-gray-500">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats Summary */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-[#00C853]" />
            <h3 className="text-gray-900">Your Progress</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-[#F4F8FB] rounded-xl">
              <p className="text-2xl text-[#007AFF] mb-1">{newDIYCount}</p>
              <p className="text-xs text-gray-600">DIY Completed</p>
            </div>
            <div className="text-center p-4 bg-[#F4F8FB] rounded-xl">
              <p className="text-2xl text-[#00C853] mb-1">{currentProfile.badges.length + newBadges.length}</p>
              <p className="text-xs text-gray-600">Badges Earned</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-6 bg-white border-t border-gray-100">
        <Button 
          onClick={handleContinue}
          className="w-full h-14 bg-gradient-to-r from-[#007AFF] to-[#0051D5] hover:from-[#0051D5] hover:to-[#003a9e] text-white rounded-2xl gap-2 shadow-lg"
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>

      <style>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti linear forwards;
        }
      `}</style>
    </div>
  );
}
