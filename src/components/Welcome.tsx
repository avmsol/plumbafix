import { Droplet } from 'lucide-react';
import { Button } from './ui/button';
import type { Screen } from '../App';

interface WelcomeProps {
  onNavigate: (screen: Screen) => void;
}

export default function Welcome({ onNavigate }: WelcomeProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 lg:p-12 bg-gradient-to-b from-[#007AFF] to-[#0051D5]">
      <div className="max-w-md w-full flex flex-col items-center justify-between min-h-[600px]">
      {/* Logo and Brand */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-6">
        <div className="relative">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl">
            <Droplet className="w-16 h-16 text-[#007AFF]" fill="#007AFF" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-[#00C853] rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl">🔧</span>
          </div>
        </div>
        
        <div className="text-center space-y-3">
          <h1 className="text-white text-4xl">PlumbaFix</h1>
          <p className="text-white/90 text-lg">Fix it Fast</p>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-4 w-full mb-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-white">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📸</span>
            <div>
              <p className="opacity-90">AI-Powered Diagnostics</p>
            </div>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-white">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🚿</span>
            <div>
              <p className="opacity-90">Connect with Certified Plumbers</p>
            </div>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-white">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📍</span>
            <div>
              <p className="opacity-90">Real-Time Job Tracking</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <Button 
        onClick={() => onNavigate('login')}
        className="w-full h-14 bg-white text-[#007AFF] hover:bg-white/90 rounded-2xl shadow-xl"
      >
        Get Started
      </Button>
      </div>
    </div>
  );
}
