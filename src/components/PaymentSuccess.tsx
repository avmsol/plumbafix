import { useEffect, useState } from 'react';
import { CheckCircle2, Calendar, Clock, MapPin, User, DollarSign, Receipt } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import type { Screen } from '../App';

interface PlumberQuote {
  id: string;
  plumber: {
    id: string;
    name: string;
    photo: string;
    rating: number;
    completedJobs: number;
    responseTime: string;
    verified: boolean;
  };
  quote: {
    laborCost: number;
    partsCost: number;
    totalCost: number;
    estimatedTime: string;
    additionalNotes?: string;
  };
  issueType: string;
  submittedAt: string;
}

interface BookingDetails {
  address: string;
  date: Date;
  timeSlot: string;
}

interface PaymentSuccessProps {
  onNavigate: (screen: Screen) => void;
  quote: PlumberQuote;
  bookingDetails: BookingDetails;
  onContinueToTracking: () => void;
}

export default function PaymentSuccess({ onNavigate, quote, bookingDetails, onContinueToTracking }: PaymentSuccessProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Hide confetti animation after 3 seconds
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const bookingId = 'PBF-' + Date.now().toString().slice(-6);

  return (
    <div className="h-full w-full flex flex-col bg-[#F4F8FB] relative overflow-hidden">
      {/* Success Animation Background */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-green-100/50 via-transparent to-transparent animate-pulse" />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="min-h-full flex flex-col items-center justify-center p-6 lg:p-8">
          <div className="w-full max-w-2xl space-y-6">
            
            {/* Success Icon */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-lg mb-6 animate-bounce">
                <CheckCircle2 className="w-14 h-14 text-white" />
              </div>
              <h1 className="text-3xl lg:text-4xl mb-3">Payment Successful!</h1>
              <p className="text-xl text-gray-600 mb-2">Your booking is confirmed</p>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200 text-sm px-4 py-1.5">
                Booking ID: {bookingId}
              </Badge>
            </div>

            {/* Plumber Card */}
            <Card className="overflow-hidden border-gray-100 shadow-md">
              <div className="bg-gradient-to-br from-green-50 to-white p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <img 
                      src={quote.plumber.photo} 
                      alt={quote.plumber.name}
                      className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-md"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#00C853] rounded-full flex items-center justify-center border-2 border-white">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl mb-1">{quote.plumber.name}</h3>
                    <p className="text-sm text-gray-600">Your certified plumber</p>
                  </div>
                </div>
                
                <div className="bg-white/80 rounded-xl p-4 space-y-2 text-sm">
                  <p className="text-gray-600">
                    {quote.plumber.name} has been notified and will arrive at your location during the scheduled time.
                  </p>
                </div>
              </div>
            </Card>

            {/* Booking Details */}
            <Card className="border-gray-100 shadow-md">
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                    <Receipt className="w-5 h-5 text-[#007AFF]" />
                  </div>
                  <h3 className="text-xl">Booking Details</h3>
                </div>

                <div className="space-y-4">
                  {/* Service Type */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">🔧</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-0.5">Service</p>
                      <p className="text-gray-900">{quote.issueType}</p>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-[#00C853]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-0.5">Date</p>
                      <p className="text-gray-900">{formatDate(bookingDetails.date)}</p>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-0.5">Time Slot</p>
                      <p className="text-gray-900">{bookingDetails.timeSlot}</p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#007AFF]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-0.5">Service Address</p>
                      <p className="text-gray-900">{bookingDetails.address}</p>
                    </div>
                  </div>

                  {/* Payment */}
                  <div className="flex items-start gap-4 pt-4 border-t border-gray-100">
                    <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-5 h-5 text-[#00C853]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-0.5">Amount Paid</p>
                      <p className="text-2xl text-[#00C853]">${quote.quote.totalCost}</p>
                      <p className="text-xs text-gray-500 mt-1">Payment confirmed via PlumbaFix</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Next Steps */}
            <Card className="p-5 border-blue-100 bg-gradient-to-br from-blue-50 to-white">
              <h3 className="mb-3">What's Next?</h3>
              <ul className="space-y-2.5 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00C853] flex-shrink-0 mt-0.5" />
                  <span>You'll receive a confirmation SMS and email shortly</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00C853] flex-shrink-0 mt-0.5" />
                  <span>Track your plumber's arrival in real-time</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00C853] flex-shrink-0 mt-0.5" />
                  <span>Chat with {quote.plumber.name} directly through the app</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00C853] flex-shrink-0 mt-0.5" />
                  <span>Rate your experience after service completion</span>
                </li>
              </ul>
            </Card>

            {/* Actions */}
            <div className="space-y-3 pt-2">
              <Button 
                onClick={onContinueToTracking}
                className="w-full h-14 bg-[#007AFF] hover:bg-[#0051D5] rounded-xl text-lg shadow-lg"
              >
                Track Your Booking
              </Button>
              <Button 
                onClick={() => onNavigate('home')}
                variant="outline"
                className="w-full h-12 border-2 border-gray-200 rounded-xl hover:bg-gray-50"
              >
                Back to Home
              </Button>
            </div>

            {/* Support Info */}
            <div className="text-center text-sm text-gray-600 pt-4">
              <p>Need help? Contact us at <span className="text-[#007AFF]">support@plumbafix.com</span></p>
              <p className="mt-1">or call <span className="text-[#007AFF]">1-800-PLUMBAFIX</span></p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
