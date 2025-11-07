import { Mail, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import type { Screen, UserType } from '../App';

interface LoginProps {
  onNavigate: (screen: Screen) => void;
  onUserTypeSelect: (type: UserType) => void;
}

export default function Login({ onNavigate, onUserTypeSelect }: LoginProps) {
  const handleLogin = (type: 'customer' | 'plumber') => {
    onUserTypeSelect(type);
    if (type === 'customer') {
      onNavigate('home');
    } else {
      onNavigate('plumber-home');
    }
  };

  return (
    <div className="h-full flex items-center justify-center p-6 lg:p-12 bg-gradient-to-br from-[#F4F8FB] to-white">
      <div className="max-w-md w-full bg-white rounded-3xl lg:shadow-2xl p-8 lg:p-10">
      {/* Header */}
      <div className="mb-8">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onNavigate('welcome')}
          className="mb-6"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-3xl mb-2">Welcome Back</h1>
        <p className="text-gray-600">Sign in to continue</p>
      </div>

      {/* Login Form */}
      <div className="flex-1 space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Email</label>
          <Input 
            type="email" 
            placeholder="your.email@example.com"
            className="h-12 rounded-xl border-gray-200"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Password</label>
          <Input 
            type="password" 
            placeholder="••••••••"
            className="h-12 rounded-xl border-gray-200"
          />
        </div>

        <div className="text-right">
          <button className="text-sm text-[#007AFF]">
            Forgot Password?
          </button>
        </div>

        <div className="pt-4 space-y-3">
          <Button 
            onClick={() => handleLogin('customer')}
            className="w-full h-12 bg-[#007AFF] hover:bg-[#0051D5] rounded-xl"
          >
            Sign In as Customer
          </Button>

          <Button 
            onClick={() => handleLogin('plumber')}
            variant="outline"
            className="w-full h-12 border-2 border-[#007AFF] text-[#007AFF] hover:bg-[#007AFF]/5 rounded-xl"
          >
            Sign In as Plumber
          </Button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 py-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm text-gray-500">or continue with</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Social Login */}
        <div className="space-y-3">
          <Button 
            variant="outline"
            className="w-full h-12 border-gray-200 rounded-xl gap-3"
          >
            <Mail className="w-5 h-5" />
            Continue with Google
          </Button>
          
          <Button 
            variant="outline"
            className="w-full h-12 border-gray-200 rounded-xl gap-3"
          >
            <span className="text-lg">🍎</span>
            Continue with Apple
          </Button>
        </div>
      </div>

      {/* Sign Up */}
      <div className="text-center py-6">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <button className="text-[#007AFF]">Sign Up</button>
        </p>
      </div>
      </div>
    </div>
  );
}
