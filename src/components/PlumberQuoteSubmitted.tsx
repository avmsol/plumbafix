import { CheckCircle2, Home, Clock, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import type { Screen } from '../App';

interface PlumberQuoteSubmittedProps {
  onNavigate: (screen: Screen) => void;
  quoteDetails: {
    issueType: string;
    customerName: string;
    totalQuote: number;
    estimatedTime: string;
  };
}

export default function PlumberQuoteSubmitted({ onNavigate, quoteDetails }: PlumberQuoteSubmittedProps) {
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
            <h1 className="text-3xl">Quote Submitted!</h1>
            <p className="text-gray-600">
              Your quote has been sent to {quoteDetails.customerName}
            </p>
          </div>

          {/* Quote Summary */}
          <Card className="p-6 border-gray-100 bg-white">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Issue Type</p>
                <p className="text-lg text-gray-900">{quoteDetails.issueType}</p>
              </div>
              
              <div className="h-px bg-gray-100" />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <DollarSign className="w-4 h-4" />
                    <p className="text-sm">Total Quote</p>
                  </div>
                  <p className="text-2xl text-green-700">${quoteDetails.totalQuote}</p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Clock className="w-4 h-4" />
                    <p className="text-sm">Est. Time</p>
                  </div>
                  <p className="text-2xl text-gray-900">{quoteDetails.estimatedTime}h</p>
                </div>
              </div>
            </div>
          </Card>

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
                    <span>The customer will review your quote</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#007AFF] mt-0.5">•</span>
                    <span>You'll be notified when they accept or respond</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#007AFF] mt-0.5">•</span>
                    <span>Typical response time is 15-30 minutes</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="space-y-3 pt-2">
            <Button 
              onClick={() => onNavigate('plumber-home')}
              className="w-full h-14 bg-[#007AFF] hover:bg-[#0051D5] rounded-2xl text-lg gap-2"
            >
              <Home className="w-5 h-5" />
              Back to Dashboard
            </Button>
            
            <Button 
              onClick={() => onNavigate('plumber-job-tracker')}
              variant="outline"
              className="w-full h-14 border-2 border-gray-200 rounded-2xl text-lg hover:bg-gray-50"
            >
              View Active Jobs
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
