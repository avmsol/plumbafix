import { useState } from 'react';
import { ArrowLeft, Clock, DollarSign, Star, Phone, MessageCircle, CheckCircle2, X, Wrench, MapPin, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { Textarea } from './ui/textarea';
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

interface CustomerQuoteReviewProps {
  onNavigate: (screen: Screen) => void;
  quote: PlumberQuote;
  onAcceptQuote: () => void;
  onDeclineQuote: () => void;
  showBackToComparison?: boolean;
}

export default function CustomerQuoteReview({ onNavigate, quote, onAcceptQuote, onDeclineQuote, showBackToComparison = true }: CustomerQuoteReviewProps) {
  const [showDeclineDialog, setShowDeclineDialog] = useState(false);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [message, setMessage] = useState('');

  const handleAccept = () => {
    onAcceptQuote();
  };

  const handleDecline = () => {
    setShowDeclineDialog(false);
    onDeclineQuote();
  };

  return (
    <div className="h-full w-full flex flex-col bg-[#F4F8FB] relative overflow-hidden">
      {/* Header */}
      <div className="bg-white p-6 lg:p-8 pt-16 lg:pt-8 border-b border-gray-100 flex-shrink-0">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onNavigate(showBackToComparison ? 'quote-comparison' : 'home')}
            className="mb-4"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl lg:text-3xl mb-2">Quote Review</h1>
          <p className="text-gray-600">Review the plumber's quote and decide</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-28 lg:pb-8">
        <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
          
          {/* Issue Summary */}
          <Card className="p-5 lg:p-6 border-gray-100 bg-gradient-to-br from-blue-50 to-white">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#007AFF]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Wrench className="w-6 h-6 text-[#007AFF]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl">{quote.issueType}</h2>
                  {showBackToComparison && (
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-xs">
                      Quote {quote.id} of 4
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Requested {quote.submittedAt}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Plumber Profile */}
          <Card className="overflow-hidden border-gray-100 shadow-sm">
            <div className="bg-white p-5 lg:p-6">
              {/* Header Section */}
              <div className="flex items-start gap-4 mb-4">
                <div className="relative flex-shrink-0">
                  <Avatar className="w-16 h-16 lg:w-20 lg:h-20 border-3 border-green-100 shadow-md">
                    <img src={quote.plumber.photo} alt={quote.plumber.name} className="w-full h-full object-cover" />
                  </Avatar>
                  {quote.plumber.verified && (
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#00C853] rounded-full flex items-center justify-center border-3 border-white shadow-sm">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl lg:text-2xl mb-1.5 truncate">{quote.plumber.name}</h3>
                  {quote.plumber.verified && (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Verified Pro
                    </Badge>
                  )}
                </div>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-3 gap-2.5 mb-4">
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-3 border border-yellow-100">
                  <div className="flex items-center justify-center gap-1 mb-0.5">
                    <Star className="w-4 h-4 text-yellow-600 fill-yellow-500" />
                    <span className="text-xl text-gray-900">{quote.plumber.rating}</span>
                  </div>
                  <p className="text-xs text-gray-600 text-center">Rating</p>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100">
                  <p className="text-xl text-gray-900 text-center mb-0.5">{quote.plumber.completedJobs}</p>
                  <p className="text-xs text-gray-600 text-center">Jobs Done</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 border border-green-100">
                  <div className="flex items-center justify-center mb-0.5">
                    <span className="text-xl text-gray-900">&lt; {quote.plumber.responseTime.replace(/\s*min.*$/i, '')}</span>
                  </div>
                  <p className="text-xs text-gray-600 text-center">min</p>
                </div>
              </div>
              
              {/* Contact Actions */}
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline"
                  className="h-11 border-2 border-gray-200 rounded-xl gap-2 hover:bg-gray-50 hover:border-gray-300 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  Call
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowMessageDialog(true)}
                  className="h-11 border-2 border-gray-200 rounded-xl gap-2 hover:bg-gray-50 hover:border-gray-300 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  Message
                </Button>
              </div>
            </div>
          </Card>

          {/* Quote Details */}
          <Card className="overflow-hidden border-gray-100">
            <div className="bg-gradient-to-br from-[#007AFF]/10 to-transparent p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#007AFF]/20 rounded-full flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-[#007AFF]" />
                </div>
                <div>
                  <h3>Quote Breakdown</h3>
                  <p className="text-sm text-gray-500">Detailed pricing information</p>
                </div>
              </div>
            </div>
            
            <div className="p-5 space-y-4">
              {/* Cost Breakdown */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="text-gray-700">Labor Cost</span>
                  <span className="text-lg">${quote.quote.laborCost}</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="text-gray-700">Parts & Materials</span>
                  <span className="text-lg">${quote.quote.partsCost}</span>
                </div>
                
                <div className="h-px bg-gray-200" />
                
                <div className="flex items-center justify-between p-4 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl border-2 border-green-200">
                  <span className="text-gray-900">Total Cost</span>
                  <span className="text-3xl text-green-700">${quote.quote.totalCost}</span>
                </div>
              </div>

              {/* Estimated Time */}
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <Clock className="w-5 h-5 text-[#007AFF]" />
                <div>
                  <p className="text-sm text-gray-600">Estimated Completion Time</p>
                  <p className="text-lg text-gray-900">{quote.quote.estimatedTime} hours</p>
                </div>
              </div>

              {/* Additional Notes */}
              {quote.quote.additionalNotes && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Plumber's Notes</p>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-gray-700 leading-relaxed">{quote.quote.additionalNotes}</p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* What's Included */}
          <Card className="p-5 lg:p-6 border-green-100 bg-gradient-to-br from-green-50 to-white">
            <h3 className="mb-4">What's Included</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Professional diagnosis and repair</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">All required parts and materials</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">90-day warranty on work performed</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Clean-up after job completion</span>
              </li>
            </ul>
          </Card>

          {/* Payment Info */}
          <Card className="p-5 border-blue-100 bg-blue-50">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#007AFF]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl">💳</span>
              </div>
              <div>
                <h3 className="mb-1">Payment</h3>
                <p className="text-sm text-gray-600">
                  You'll be charged after the job is completed. Payment is securely processed through PlumbaFix.
                </p>
              </div>
            </div>
          </Card>

        </div>
      </div>

      {/* Bottom Actions - Mobile */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 lg:hidden safe-bottom">
        <div className="grid grid-cols-2 gap-3">
          <Button 
            onClick={() => setShowDeclineDialog(true)}
            variant="outline"
            className="h-12 border-2 border-gray-200 rounded-xl hover:bg-gray-50"
          >
            <X className="w-4 h-4 mr-1" />
            <span>Decline</span>
          </Button>
          <Button 
            onClick={handleAccept}
            className="h-12 bg-[#00C853] hover:bg-green-700 rounded-xl"
          >
            <CheckCircle2 className="w-4 h-4 mr-1" />
            <span>Continue</span>
          </Button>
        </div>
      </div>

      {/* Bottom Actions - Desktop */}
      <div className="hidden lg:block bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto p-6 lg:p-8">
          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={() => setShowDeclineDialog(true)}
              variant="outline"
              className="h-14 border-2 border-gray-200 rounded-2xl text-lg hover:bg-gray-50"
            >
              <X className="w-5 h-5 mr-2" />
              Decline Quote
            </Button>
            <Button 
              onClick={handleAccept}
              className="h-14 bg-[#00C853] hover:bg-green-700 rounded-2xl text-lg"
            >
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Continue to Payment
            </Button>
          </div>
        </div>
      </div>

      {/* Decline Confirmation Dialog */}
      {showDeclineDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <Card className="w-full max-w-md p-6 space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl mb-2">Decline Quote?</h3>
              <p className="text-gray-600">
                Are you sure you want to decline this quote? You can request quotes from other plumbers.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button 
                onClick={() => setShowDeclineDialog(false)}
                variant="outline"
                className="h-12 border-2 border-gray-200 rounded-xl"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleDecline}
                className="h-12 bg-red-500 hover:bg-red-600 rounded-xl"
              >
                Decline Quote
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Message Dialog */}
      {showMessageDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <Card className="w-full max-w-md p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#007AFF]/10 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-[#007AFF]" />
              </div>
              <div>
                <h3 className="text-xl">Message {quote.plumber.name}</h3>
                <p className="text-sm text-gray-500">Ask questions about the quote</p>
              </div>
            </div>
            
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="min-h-32 rounded-xl border-gray-200 focus:border-[#007AFF] resize-none"
            />
            
            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={() => {
                  setShowMessageDialog(false);
                  setMessage('');
                }}
                variant="outline"
                className="h-12 border-2 border-gray-200 rounded-xl"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  setShowMessageDialog(false);
                  setMessage('');
                }}
                className="h-12 bg-[#007AFF] hover:bg-[#0051D5] rounded-xl"
              >
                Send Message
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
