import { CheckCircle2, MapPin, Clock, User } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import type { Screen } from '../App';

interface QuoteAcceptedProps {
  onNavigate: (screen: Screen) => void;
  plumberName: string;
  estimatedArrival: string;
}

export default function QuoteAccepted({ onNavigate, plumberName, estimatedArrival }: QuoteAcceptedProps) {
  return (
    <div className="h-full flex flex-col bg-[#F4F8FB] relative">
      {/* Success Animation Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full space-y-6">
          
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20" />
              <div className="relative w-24 h-24 bg-gradient-to-br from-[#00C853] to-green-600 rounded-full flex items-center justify-center shadow-xl">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl">Quote Accepted!</h1>
            <p className="text-gray-600">
              {plumberName} has been notified and will arrive soon
            </p>
          </div>

          {/* Info Cards */}
          <div className="space-y-3">
            <Card className="p-5 border-gray-100 bg-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-[#007AFF]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Plumber</p>
                  <p className="text-lg">{plumberName}</p>
                </div>
              </div>
            </Card>

            <Card className="p-5 border-gray-100 bg-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Estimated Arrival</p>
                  <p className="text-lg">{estimatedArrival}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* What's Next */}
          <Card className="p-5 border-blue-100 bg-gradient-to-br from-blue-50 to-white">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#007AFF]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl">💡</span>
              </div>
              <div className="flex-1">
                <h3 className="mb-2">What happens next?</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#007AFF] mt-0.5">•</span>
                    <span>Track your plumber's location in real-time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#007AFF] mt-0.5">•</span>
                    <span>You'll be notified when they're on the way</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#007AFF] mt-0.5">•</span>
                    <span>Payment will be processed after job completion</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="space-y-3 pt-2">
            <Button 
              onClick={() => onNavigate('job-tracker')}
              className="w-full h-14 bg-[#007AFF] hover:bg-[#0051D5] rounded-2xl text-lg gap-2"
            >
              <MapPin className="w-5 h-5" />
              Track Plumber
            </Button>
            
            <Button 
              onClick={() => onNavigate('home')}
              variant="outline"
              className="w-full h-14 border-2 border-gray-200 rounded-2xl text-lg hover:bg-gray-50"
            >
              Back to Home
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
