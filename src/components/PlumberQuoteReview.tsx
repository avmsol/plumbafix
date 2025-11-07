import { useState } from 'react';
import { ArrowLeft, MapPin, Wrench, Package, Hammer, Camera, FileText, DollarSign, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import PlumberBottomNavigation from './PlumberBottomNavigation';
import type { Screen } from '../App';

interface QuoteRequest {
  id: string;
  issueType: string;
  description: string;
  customerName: string;
  location: string;
  distance: string;
  travelTime: string;
  image?: string;
  requiredParts?: string[];
  requiredTools?: string[];
  payout: number;
  commission: number;
  customerRating: number;
  postedTime: string;
}

interface PlumberQuoteReviewProps {
  onNavigate: (screen: Screen) => void;
  quoteRequest: QuoteRequest;
  onSubmitQuote: (quoteDetails: {
    issueType: string;
    customerName: string;
    totalQuote: number;
    estimatedTime: string;
  }) => void;
}

export default function PlumberQuoteReview({ onNavigate, quoteRequest, onSubmitQuote }: PlumberQuoteReviewProps) {
  const [laborCost, setLaborCost] = useState('');
  const [partsCost, setPartsCost] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const totalQuote = (parseFloat(laborCost) || 0) + (parseFloat(partsCost) || 0);

  const handleSubmitQuote = () => {
    onSubmitQuote({
      issueType: quoteRequest.issueType,
      customerName: quoteRequest.customerName,
      totalQuote,
      estimatedTime,
    });
    onNavigate('plumber-quote-submitted');
  };

  return (
    <div className="h-full flex flex-col bg-[#F4F8FB] relative">
      {/* Header */}
      <div className="bg-white p-6 lg:p-8 pt-16 lg:pt-8 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onNavigate('plumber-home')}
            className="mb-4 lg:hidden"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl lg:text-3xl mb-2">Review Quote Request</h1>
          <p className="text-gray-600">Review details and submit your quote</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-20 lg:pb-8">
        <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
          
          {/* Request Header */}
          <Card className="overflow-hidden border-gray-100">
            <div className="bg-gradient-to-br from-[#007AFF]/10 to-transparent p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-[#007AFF]/20 rounded-full flex items-center justify-center">
                      <Wrench className="w-6 h-6 text-[#007AFF]" />
                    </div>
                    <div>
                      <h2 className="text-xl">{quoteRequest.issueType}</h2>
                      <p className="text-sm text-gray-500">{quoteRequest.postedTime}</p>
                    </div>
                  </div>
                </div>
                <Badge className="bg-white/80 text-gray-700 border-gray-200">
                  {quoteRequest.distance}
                </Badge>
              </div>
              
              {/* Customer Info */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <span>👤</span>
                  <span>{quoteRequest.customerName}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span className="text-gray-700">{quoteRequest.customerRating}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Location */}
          <Card className="p-5 lg:p-6 border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Service Location</p>
                <p className="text-gray-900">{quoteRequest.location}</p>
                <p className="text-sm text-gray-500 mt-1">{quoteRequest.travelTime} drive</p>
              </div>
            </div>
          </Card>

          {/* Issue Photo */}
          {quoteRequest.image && (
            <Card className="overflow-hidden border-gray-100">
              <div className="bg-gradient-to-br from-[#007AFF]/10 to-transparent p-4">
                <h3 className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-gray-600" />
                  <span>Issue Photo</span>
                </h3>
              </div>
              <div className="p-4 pt-0">
                <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden">
                  <ImageWithFallback 
                    src={quoteRequest.image}
                    alt={quoteRequest.issueType}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Description */}
          <Card className="p-5 lg:p-6 border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-gray-600" />
              <h3>Issue Description</h3>
            </div>
            <p className="text-gray-700 leading-relaxed bg-gray-50 rounded-xl p-4">
              {quoteRequest.description}
            </p>
          </Card>

          {/* Required Parts */}
          {quoteRequest.requiredParts && quoteRequest.requiredParts.length > 0 && (
            <Card className="p-5 lg:p-6 border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3>Required Parts</h3>
                  <p className="text-sm text-gray-500">{quoteRequest.requiredParts.length} items identified</p>
                </div>
              </div>
              <div className="space-y-2">
                {quoteRequest.requiredParts.map((part, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-3 bg-orange-50/50 rounded-xl border border-orange-100"
                  >
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-orange-700">{index + 1}</span>
                    </div>
                    <p className="text-sm text-gray-900 flex-1">{part}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Required Tools */}
          {quoteRequest.requiredTools && quoteRequest.requiredTools.length > 0 && (
            <Card className="p-5 lg:p-6 border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Hammer className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3>Required Tools</h3>
                  <p className="text-sm text-gray-500">{quoteRequest.requiredTools.length} tools needed</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {quoteRequest.requiredTools.map((tool, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-3 bg-purple-50/50 rounded-xl border border-purple-100"
                  >
                    <Hammer className="w-4 h-4 text-purple-600" />
                    <p className="text-sm text-gray-900">{tool}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Submit Quote Form */}
          <Card className="p-5 lg:p-6 border-gray-100 bg-gradient-to-br from-blue-50 to-white">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-[#007AFF]/10 rounded-full flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-[#007AFF]" />
              </div>
              <div>
                <h3>Submit Your Quote</h3>
                <p className="text-sm text-gray-500">Provide pricing and timeline details</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Labor Cost */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Labor Cost ($) <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  value={laborCost}
                  onChange={(e) => setLaborCost(e.target.value)}
                  placeholder="Enter labor cost"
                  className="rounded-xl border-gray-200 focus:border-[#007AFF]"
                />
              </div>

              {/* Parts Cost */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Parts Cost ($) <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  value={partsCost}
                  onChange={(e) => setPartsCost(e.target.value)}
                  placeholder="Enter parts cost"
                  className="rounded-xl border-gray-200 focus:border-[#007AFF]"
                />
              </div>

              {/* Estimated Time */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Estimated Time (hours) <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  value={estimatedTime}
                  onChange={(e) => setEstimatedTime(e.target.value)}
                  placeholder="Enter estimated hours"
                  className="rounded-xl border-gray-200 focus:border-[#007AFF]"
                />
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <Textarea
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Add any additional information for the customer"
                  className="min-h-24 rounded-xl border-gray-200 focus:border-[#007AFF] resize-none"
                />
              </div>

              {/* Total Quote Summary */}
              {totalQuote > 0 && (
                <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-4 border-2 border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Total Quote</span>
                    <span className="text-2xl text-green-700">${totalQuote.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Labor: ${laborCost || '0'}</span>
                    <span>Parts: ${partsCost || '0'}</span>
                  </div>
                  {estimatedTime && (
                    <p className="text-sm text-gray-600 mt-2">
                      Estimated time: {estimatedTime} {parseFloat(estimatedTime) === 1 ? 'hour' : 'hours'}
                    </p>
                  )}
                </div>
              )}

              {/* Info */}
              <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                <p className="text-sm text-blue-900">
                  💡 Your quote will be sent to the customer for review. They can accept, ask questions, or request modifications.
                </p>
              </div>
            </div>
          </Card>

        </div>
      </div>

      {/* Submit CTA - Mobile */}
      <div className="absolute bottom-16 left-0 right-0 bg-white border-t border-gray-100 p-6 lg:hidden">
        <Button 
          onClick={handleSubmitQuote}
          disabled={!laborCost || !partsCost || !estimatedTime}
          className="w-full h-14 bg-[#007AFF] hover:bg-[#0051D5] rounded-2xl text-lg gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
          Submit Quote
        </Button>
      </div>

      {/* Submit CTA - Desktop */}
      <div className="hidden lg:block bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto p-6 lg:p-8">
          <Button 
            onClick={handleSubmitQuote}
            disabled={!laborCost || !partsCost || !estimatedTime}
            className="w-full h-14 bg-[#007AFF] hover:bg-[#0051D5] rounded-2xl text-lg gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
            Submit Quote
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <PlumberBottomNavigation 
        activeScreen="plumber-home" 
        onNavigate={onNavigate}
      />
    </div>
  );
}
