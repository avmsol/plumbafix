import { useEffect, useState } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import type { Screen, PlumberData } from '../App';

interface PlumberMatchingProps {
  onNavigate: (screen: Screen) => void;
  onPlumberFound: (plumber: PlumberData) => void;
}

export default function PlumberMatching({ onPlumberFound }: PlumberMatchingProps) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 1000);
    const timer2 = setTimeout(() => setStage(2), 2000);
    const timer3 = setTimeout(() => {
      const plumber: PlumberData = {
        id: 'plumber-1',
        name: 'Mike Johnson',
        photo: 'https://images.unsplash.com/photo-1604118600242-e7a6d23ec3a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwbHVtYmVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYxMzkzNzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 4.9,
        experience: 8,
        phoneNumber: '+1 (555) 123-4567',
      };
      onPlumberFound(plumber);
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onPlumberFound]);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Map Area */}
      <div className="flex-1 bg-gradient-to-br from-blue-100 to-blue-50 relative overflow-hidden">
        {/* Simulated Map */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gray-400 rounded-full" />
          <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-gray-400 rounded-full" />
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-gray-400 rounded-full" />
          <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-gray-400 rounded-full" />
        </div>

        {/* User Location Pin */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-4 h-4 bg-[#007AFF] rounded-full animate-ping absolute" />
            <MapPin className="w-8 h-8 text-[#007AFF] fill-[#007AFF] relative z-10" />
          </div>
          <p className="text-xs text-center mt-2 bg-white px-2 py-1 rounded-lg shadow-sm">
            You
          </p>
        </div>

        {/* Plumber Pins (animated) */}
        {stage >= 1 && (
          <div className="absolute top-1/3 right-1/3 transform animate-bounce">
            <MapPin className="w-6 h-6 text-green-600 fill-green-600" />
          </div>
        )}
        {stage >= 2 && (
          <>
            <div className="absolute top-2/3 left-1/4 transform animate-bounce" style={{animationDelay: '0.2s'}}>
              <MapPin className="w-6 h-6 text-green-600 fill-green-600" />
            </div>
            <div className="absolute top-1/4 right-1/4 transform animate-bounce" style={{animationDelay: '0.4s'}}>
              <MapPin className="w-6 h-6 text-green-600 fill-green-600" />
            </div>
          </>
        )}
      </div>

      {/* Status Card */}
      <div className="bg-white rounded-t-[40px] shadow-2xl p-8 pt-12">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-[#007AFF]/10 rounded-full flex items-center justify-center mb-4">
            <Loader2 className="w-8 h-8 text-[#007AFF] animate-spin" />
          </div>
          
          <h2 className="text-xl mb-2">
            {stage === 0 && 'Searching for Plumbers...'}
            {stage === 1 && 'Found Nearby Plumbers...'}
            {stage >= 2 && 'Matching Best Plumber...'}
          </h2>
          
          <p className="text-gray-600 text-center mb-6">
            {stage === 0 && 'Looking for certified professionals in your area'}
            {stage === 1 && 'Analyzing availability and proximity'}
            {stage >= 2 && 'Almost there! Confirming your plumber'}
          </p>

          <div className="w-full max-w-xs">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#007AFF] rounded-full transition-all duration-500"
                style={{ width: `${(stage + 1) * 33}%` }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 w-full mt-8">
            <div className="text-center">
              <p className="text-2xl text-[#007AFF]">{stage >= 2 ? '12' : stage >= 1 ? '8' : '3'}</p>
              <p className="text-xs text-gray-500">Available</p>
            </div>
            <div className="text-center">
              <p className="text-2xl text-[#007AFF]">2.4mi</p>
              <p className="text-xs text-gray-500">Nearest</p>
            </div>
            <div className="text-center">
              <p className="text-2xl text-[#007AFF]">&lt;30m</p>
              <p className="text-xs text-gray-500">ETA</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
