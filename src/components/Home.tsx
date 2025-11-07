import { useState, useEffect, useRef } from 'react';
import { Camera, Droplet, Settings, MapPin, Zap, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import BottomNavigation from './BottomNavigation';
import type { Screen, UserProfile } from '../App';

interface HomeProps {
  onNavigate: (screen: Screen) => void;
  onSwitchView: () => void;
  currentAddress: string;
  userProfile?: UserProfile;
  onViewQuote?: (quoteId: string) => void;
  pendingQuotesCount?: number;
}

const plumbingServices = [
  { 
    id: '1', 
    name: 'Bath fittings',
    icon: 'https://images.unsplash.com/photo-1644329615817-036a646f9348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJvbWUlMjBmYXVjZXQlMjB3aGl0ZSUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzYxNDE4NjU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '2', 
    name: 'Basin & sink',
    icon: 'https://images.unsplash.com/flagged/photo-1556438758-84625859c6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHNpbmslMjBiYXNpbnxlbnwxfHx8fDE3NjE0MTg2NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '3', 
    name: 'Grouting',
    icon: 'https://images.unsplash.com/photo-1699543909013-4b9c73081b48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXRocm9vbSUyMHRpbGVzJTIwZ3JvdXR8ZW58MXx8fHwxNzYxNDE4NjU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '4', 
    name: 'Water filter',
    icon: 'https://images.unsplash.com/photo-1669211659110-3f3db4119b65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHB1cmlmaWVyJTIwZmlsdGVyJTIwd2hpdGV8ZW58MXx8fHwxNzYxNDE4NjU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '5', 
    name: 'Drainage',
    icon: 'https://images.unsplash.com/photo-1723988432504-1b0f00fa2ff7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJvbWUlMjBkcmFpbiUyMHBpcGV8ZW58MXx8fHwxNzYxNDE4NjU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '6', 
    name: 'Toilet',
    icon: 'https://images.unsplash.com/photo-1558745921-b0820953e8c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGNlcmFtaWMlMjB0b2lsZXR8ZW58MXx8fHwxNzYxNDE4NjU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '7', 
    name: 'Tap & mixer',
    icon: 'https://images.unsplash.com/photo-1758548157319-ec649ce00f1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJvbWUlMjBiYXRocm9vbSUyMGZhdWNldHxlbnwxfHx8fDE3NjE0MTg2NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '8', 
    name: 'Water tank',
    icon: 'https://images.unsplash.com/photo-1510048126839-229279473365?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHdhdGVyJTIwdGFua3xlbnwxfHx8fDE3NjE0MTg2NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '9', 
    name: 'Motor',
    icon: 'https://images.unsplash.com/photo-1655874837055-7adc909ae602?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMG1vdG9yJTIwcHVtcHxlbnwxfHx8fDE3NjEzODkyMzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '10', 
    name: 'Water pipes',
    icon: 'https://images.unsplash.com/photo-1662374162155-2552f45b9f37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbGV4aWJsZSUyMHdhdGVyJTIwaG9zZXxlbnwxfHx8fDE3NjE0MTg2NTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    id: '11', 
    name: 'Book a consultation',
    icon: 'https://images.unsplash.com/photo-1707546950739-88e66a1d54c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmVyJTIwd29ya2VyJTIwdW5pZm9ybXxlbnwxfHx8fDE3NjE0MTg2NTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
];

const serviceCategories = [
  {
    id: 'bath-fittings',
    title: 'Bath fittings',
    services: [
      {
        id: 'bath-accessory',
        name: 'Bath accessory installation',
        servicesTaken: 1247,
        description: 'Small fittings such as towel hanger/ shelves, soap dispenser, etc.',
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400',
        options: null
      },
      {
        id: 'shower-installation',
        name: 'Shower installation',
        servicesTaken: 2835,
        description: 'Applicable for wall-mounted & handheld shower',
        image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400',
        options: 2
      }
    ]
  },
  {
    id: 'basin-sink',
    title: 'Basin & sink',
    services: [
      {
        id: 'wash-basin',
        name: 'Wash basin installation',
        servicesTaken: 892,
        description: 'Professional installation of wash basin with proper plumbing connections',
        image: 'https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=400',
        options: null
      }
    ]
  }
];

const recentRepairs = [
  { id: '1', issue: 'Leaky Faucet', date: 'Oct 20, 2025', cost: 65, status: 'completed' },
  { id: '2', issue: 'Clogged Drain', date: 'Oct 10, 2025', cost: 120, status: 'completed' },
  { id: '3', issue: 'Water Heater', date: 'Sep 28, 2025', cost: 280, status: 'completed' },
];

export default function Home({ onNavigate, onSwitchView, currentAddress, userProfile, onViewQuote, pendingQuotesCount = 0 }: HomeProps) {
  const [scrollY, setScrollY] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let rafId: number;
    const handleScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      
      rafId = requestAnimationFrame(() => {
        setScrollY(Math.min(scrollContainer.scrollTop, 150));
      });
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Calculate smooth values based on scroll position
  const progress = Math.min(scrollY / 150, 1);
  const headerPaddingTop = 64 - (progress * 48); // 64px to 16px (pt-16 to pt-4)
  const headerPaddingBottom = 32 - (progress * 24); // 32px to 8px (pb-8 to pb-2)
  const greetingMarginBottom = 24 - (progress * 18); // 24px to 6px (mb-6 to mb-1.5)
  const isCollapsed = scrollY > 50;

  return (
    <div className="h-full flex flex-col bg-[#F4F8FB] relative overflow-hidden">
      {/* Main Content - Scrollable */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto overflow-x-hidden pb-20 lg:pb-8">
        {/* Header */}
        <div 
          style={{ 
            paddingTop: `${headerPaddingTop}px`,
            paddingBottom: `${headerPaddingBottom}px`
          }}
          className="bg-gradient-to-b from-[#007AFF] to-[#0051D5] lg:rounded-none lg:rounded-br-[40px] rounded-b-[40px] px-6 lg:px-8 transition-all duration-300 ease-out"
        >
        <div 
          style={{
            marginBottom: `${greetingMarginBottom}px`,
            transform: progress > 0 ? `scale(${1 - progress * 0.15})` : 'scale(1)',
            opacity: Math.max(0.6, 1 - progress * 0.4),
            transformOrigin: 'left top'
          }}
          className="flex items-center justify-between transition-all duration-300 ease-out"
        >
          <div>
            <p 
              style={{
                opacity: Math.max(0, 1 - progress * 2),
                maxHeight: progress > 0 ? `${Math.max(0, 20 - progress * 20)}px` : '20px',
                overflow: 'hidden'
              }}
              className="text-white/80 text-sm transition-all duration-300 ease-out"
            >
              Welcome back
            </p>
            <h1 className="text-white text-2xl mb-1">Hi Alex 👋</h1>
            <button 
              onClick={() => onNavigate('address-select')}
              className="flex items-center gap-1 hover:opacity-80 transition-opacity"
              style={{
                opacity: Math.max(0.5, 1 - progress * 0.5)
              }}
            >
              <MapPin className="w-4 h-4 text-white/70" />
              <p className="text-white/70 text-sm">{currentAddress}</p>
            </button>
          </div>
          <button 
            onClick={() => onNavigate('user-profile')}
            className="lg:hidden w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 ease-out"
            style={{
              opacity: Math.max(0.5, 1 - progress * 0.5)
            }}
          >
            <Settings className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Pending Quotes Notification */}
        {pendingQuotesCount > 0 && (
          <div 
            onClick={() => onNavigate('quote-comparison')}
            style={{
              marginBottom: progress > 0 ? `${Math.max(0, 16 - progress * 16)}px` : '16px',
              maxHeight: progress > 0 ? `${Math.max(0, 100 - progress * 100)}px` : '100px',
              overflow: 'hidden'
            }}
            className="max-w-4xl transition-all duration-300 ease-out"
          >
            <div 
              style={{
                transform: progress > 0 ? `scale(${1 - progress * 0.1})` : 'scale(1)',
                opacity: Math.max(0, 1 - progress * 1.5),
                willChange: progress > 0 ? 'transform, opacity' : 'auto',
                pointerEvents: isCollapsed ? 'none' : 'auto'
              }}
              className="bg-gradient-to-r from-green-400 to-green-500 rounded-2xl cursor-pointer hover:shadow-lg p-4 overflow-hidden hover:scale-[1.02] transition-all duration-300 ease-out"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white text-sm">You have {pendingQuotesCount} new {pendingQuotesCount === 1 ? 'quote' : 'quotes'}!</p>
                    <p 
                      style={{
                        opacity: Math.max(0, 1 - progress * 2),
                        maxHeight: progress > 0 ? `${Math.max(0, 24 - progress * 24)}px` : '24px',
                        willChange: progress > 0 ? 'opacity, max-height' : 'auto'
                      }}
                      className="text-white/90 overflow-hidden transition-all duration-300 ease-out"
                    >
                      Tap to compare and choose
                    </p>
                  </div>
                </div>
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-green-600">{pendingQuotesCount}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Primary Actions */}
        <div 
          style={{
            marginBottom: progress > 0 ? `${Math.max(0, 24 - progress * 24)}px` : '24px',
            maxHeight: progress > 0 ? `${Math.max(0, 56 - progress * 56)}px` : '56px',
            overflow: 'hidden'
          }}
          className="max-w-4xl transition-all duration-300 ease-out"
        >
          <div 
            style={{
              opacity: Math.max(0, 1 - progress * 2),
              pointerEvents: isCollapsed ? 'none' : 'auto',
              willChange: progress > 0 ? 'opacity' : 'auto'
            }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-3 transition-all duration-300 ease-out"
          >
            <Button 
              onClick={() => onNavigate('diagnostic')}
              className="w-full h-14 bg-white text-[#007AFF] hover:bg-white/90 rounded-2xl shadow-lg gap-3 justify-start px-6"
            >
              <Camera className="w-6 h-6" />
              <span>📸 Diagnose My Issue</span>
            </Button>
            
            <Button 
              onClick={() => onNavigate('diagnostic')}
              className="w-full h-14 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-2xl gap-3 justify-start px-6 border border-white/30"
            >
              <Droplet className="w-6 h-6" />
              <span>🚿 Get Help Now</span>
            </Button>
          </div>
        </div>

        {/* Gamification Stats */}
        {userProfile && (userProfile.credits > 0 || userProfile.level > 1) && (
          <div 
            style={{
              maxHeight: progress > 0 ? `${Math.max(0, 100 - progress * 100)}px` : '100px',
              overflow: 'hidden'
            }}
            className="transition-all duration-300 ease-out"
          >
            <div 
              style={{
                opacity: Math.max(0, 1 - progress * 2),
                pointerEvents: isCollapsed ? 'none' : 'auto',
                willChange: progress > 0 ? 'opacity' : 'auto'
              }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl transition-all duration-300 ease-out"
            >
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-[#FFD700]" />
                <span className="text-xs text-white/80">Credits</span>
              </div>
              <p className="text-2xl text-white">{userProfile.credits}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />
                <span className="text-xs text-white/80">Level</span>
              </div>
              <p className="text-xl text-white">{userProfile.levelName}</p>
            </div>
          </div>
          </div>
        )}
        </div>

        {/* Plumbing Services */}
        <div className="p-6 lg:p-8 pt-6">
          <h2 className="text-xl text-gray-900 mb-4 lg:mb-6">Plumbing Services</h2>
          <div className="grid grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 lg:gap-4">
            {plumbingServices.map((service) => {
              const categoryId = service.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '');
              const hasCategory = serviceCategories.find(cat => cat.id === categoryId);
              
              return (
                <div 
                  key={service.id}
                  onClick={() => {
                    if (hasCategory) {
                      const section = sectionRefs.current[categoryId];
                      if (section && scrollContainerRef.current) {
                        const containerTop = scrollContainerRef.current.getBoundingClientRect().top;
                        const sectionTop = section.getBoundingClientRect().top;
                        const scrollTop = scrollContainerRef.current.scrollTop;
                        const targetScroll = scrollTop + sectionTop - containerTop - 20;
                        
                        scrollContainerRef.current.scrollTo({
                          top: targetScroll,
                          behavior: 'smooth'
                        });
                      }
                    } else {
                      onNavigate('diagnostic');
                    }
                  }}
                  className="cursor-pointer"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-20 h-20 bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center">
                      <ImageWithFallback 
                        src={service.icon}
                        alt={service.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs text-center text-gray-700 leading-tight">{service.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Service Categories */}
        {serviceCategories.map((category) => (
          <div 
            key={category.id}
            ref={(el) => sectionRefs.current[category.id] = el}
            className="px-6 lg:px-8 mb-8"
          >
            <h2 className="text-xl text-gray-900 mb-4">{category.title}</h2>
            
            <div className="space-y-4">
              {category.services.map((service) => (
                <div key={service.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  <div className="p-4 flex gap-4">
                    {/* Service Info */}
                    <div className="flex-1">
                      <h3 className="text-gray-900 mb-2">{service.name}</h3>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm text-gray-600">
                          {service.servicesTaken?.toLocaleString()} services taken
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                      
                      {service.options && (
                        <p className="text-xs text-gray-500">{service.options} options</p>
                      )}
                    </div>
                    
                    {/* Service Image and Book Button */}
                    <div className="flex flex-col items-end gap-2">
                      <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden">
                        <ImageWithFallback 
                          src={service.image}
                          alt={service.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button 
                        onClick={() => onNavigate('diagnostic')}
                        className="bg-[#007AFF] hover:bg-[#0051D5] text-white text-sm h-8 px-3 rounded-lg"
                      >
                        Book Service
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Emergency Contact */}
        <div className="px-6 mb-6">
          <Card className="p-4 bg-gradient-to-r from-red-50 to-orange-50 border-red-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🚨</span>
              </div>
              <div className="flex-1">
                <p className="text-red-900">Emergency?</p>
                <p className="text-sm text-red-700">Call 24/7 Hotline</p>
              </div>
              <Button size="sm" className="bg-red-600 hover:bg-red-700 rounded-xl">
                Call Now
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeScreen="home" onNavigate={onNavigate} />
    </div>
  );
}
