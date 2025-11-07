import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, DollarSign, Star, CheckCircle2, Clock, Wrench, TrendingDown, TrendingUp, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import BottomNavigation from './BottomNavigation';
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

interface QuoteComparisonProps {
  onNavigate: (screen: Screen) => void;
  quotes: PlumberQuote[];
  issueType: string;
  onViewQuoteDetails: (quoteId: string) => void;
}

export default function QuoteComparison({ onNavigate, quotes, issueType, onViewQuoteDetails }: QuoteComparisonProps) {
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'time'>('price');
  const [scrollY, setScrollY] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      setScrollY(scrollContainer.scrollTop);
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate dynamic values for header collapse
  const maxScroll = 120; // Maximum scroll distance for collapse
  const progress = Math.min(scrollY / maxScroll, 1);
  
  // Header padding (collapse from 64px to 16px on mobile, 32px to 16px on desktop)
  const headerPaddingTop = 64 - (progress * 48); // Mobile top padding
  const headerPaddingBottom = 96 - (progress * 64); // Mobile bottom padding (to accommodate stats)
  
  // Issue summary opacity and height
  const isCollapsed = progress > 0.5;

  // Sort quotes based on selected criteria
  const sortedQuotes = [...quotes].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.quote.totalCost - b.quote.totalCost;
      case 'rating':
        return b.plumber.rating - a.plumber.rating;
      case 'time':
        return parseFloat(a.quote.estimatedTime) - parseFloat(b.quote.estimatedTime);
      default:
        return 0;
    }
  });

  // Calculate price range
  const prices = quotes.map(q => q.quote.totalCost);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);

  const getPriceBadge = (price: number) => {
    if (price === minPrice) {
      return { text: 'Best Price', color: 'bg-green-100 text-green-700', icon: TrendingDown };
    }
    if (price === maxPrice) {
      return { text: 'Highest', color: 'bg-red-100 text-red-700', icon: TrendingUp };
    }
    return null;
  };

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
          className="bg-gradient-to-br from-[#007AFF] to-[#0051D5] px-6 lg:px-8 transition-all duration-300 ease-out"
        >
          <div className="max-w-6xl mx-auto">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onNavigate('home')}
              className="lg:hidden mb-4 text-white hover:bg-white/20"
              style={{
                opacity: Math.max(0, 1 - progress * 1.5),
                transform: `scale(${1 - progress * 0.2})`,
                pointerEvents: isCollapsed ? 'none' : 'auto'
              }}
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            
            <div
              style={{
                transform: progress > 0 ? `scale(${1 - progress * 0.15})` : 'scale(1)',
                opacity: Math.max(0.6, 1 - progress * 0.4),
                transformOrigin: 'left top'
              }}
              className="transition-all duration-300 ease-out"
            >
              <h1 className="text-2xl lg:text-3xl text-white mb-2">Compare Quotes</h1>
              <p 
                style={{
                  opacity: Math.max(0, 1 - progress * 2),
                  maxHeight: progress > 0 ? `${Math.max(0, 24 - progress * 24)}px` : '24px',
                  overflow: 'hidden'
                }}
                className="text-white/80 mb-4 transition-all duration-300 ease-out"
              >
                {quotes.length} plumbers responded to your request
              </p>
            </div>
            
            {/* Issue Summary */}
            <div 
              style={{
                opacity: Math.max(0, 1 - progress * 1.5),
                transform: `scale(${1 - progress * 0.1})`,
                maxHeight: isCollapsed ? '0px' : '200px',
                marginBottom: isCollapsed ? '0px' : '0',
                pointerEvents: isCollapsed ? 'none' : 'auto'
              }}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 overflow-hidden transition-all duration-300 ease-out"
            >
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white/80">Issue</p>
                <p className="text-white truncate">{issueType}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview - Overlapping */}
        <div className="px-6 lg:px-8 -mt-16 mb-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-3 gap-3">
              <Card className="p-4 text-center border-gray-100 shadow-lg">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <TrendingDown className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-sm text-gray-500 mb-1">Best Price</p>
                <p className="text-xl text-green-600">${minPrice}</p>
              </Card>
              
              <Card className="p-4 text-center border-gray-100 shadow-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <DollarSign className="w-5 h-5 text-[#007AFF]" />
                </div>
                <p className="text-sm text-gray-500 mb-1">Avg. Price</p>
                <p className="text-xl text-[#007AFF]">${avgPrice}</p>
              </Card>
              
              <Card className="p-4 text-center border-gray-100 shadow-lg">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                </div>
                <p className="text-sm text-gray-500 mb-1">Avg. Rating</p>
                <p className="text-xl text-yellow-600">
                  {(quotes.reduce((sum, q) => sum + q.plumber.rating, 0) / quotes.length).toFixed(1)}
                </p>
              </Card>
            </div>
          </div>
        </div>

        {/* Content Area with Tabs */}
        <Tabs defaultValue="list" className="w-full">
          {/* Sticky Controls Section */}
          <div className="sticky top-0 bg-[#F4F8FB] z-10 px-6 lg:px-8 pt-4 pb-2 shadow-sm">
            <div className="max-w-6xl mx-auto">
              {/* Sort Options */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-3">Sort by</p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  <Button
                    onClick={() => setSortBy('price')}
                    variant={sortBy === 'price' ? 'default' : 'outline'}
                    className={`rounded-full gap-2 ${
                      sortBy === 'price' 
                        ? 'bg-[#007AFF] hover:bg-[#0051D5]' 
                        : 'border-gray-200'
                    }`}
                  >
                    <DollarSign className="w-4 h-4" />
                    Price
                  </Button>
                  <Button
                    onClick={() => setSortBy('rating')}
                    variant={sortBy === 'rating' ? 'default' : 'outline'}
                    className={`rounded-full gap-2 ${
                      sortBy === 'rating' 
                        ? 'bg-[#007AFF] hover:bg-[#0051D5]' 
                        : 'border-gray-200'
                    }`}
                  >
                    <Star className="w-4 h-4" />
                    Rating
                  </Button>
                  <Button
                    onClick={() => setSortBy('time')}
                    variant={sortBy === 'time' ? 'default' : 'outline'}
                    className={`rounded-full gap-2 ${
                      sortBy === 'time' 
                        ? 'bg-[#007AFF] hover:bg-[#0051D5]' 
                        : 'border-gray-200'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    Time
                  </Button>
                </div>
              </div>

              {/* Tabs for List/Comparison View */}
              <TabsList className="grid w-full grid-cols-2 h-12 bg-gray-100 p-1 rounded-xl">
                <TabsTrigger value="list" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  List View
                </TabsTrigger>
                <TabsTrigger value="compare" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Compare Side-by-Side
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          {/* Tab Content */}
          <div className="px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              {/* List View */}
              <TabsContent value="list" className="space-y-4 mt-4">
                {sortedQuotes.map((quote, index) => {
                  const priceBadge = getPriceBadge(quote.quote.totalCost);
                  const PriceBadgeIcon = priceBadge?.icon;

                  return (
                    <Card 
                      key={quote.id} 
                      className={`overflow-hidden border-gray-100 transition-all hover:shadow-lg ${
                        index === 0 && sortBy === 'price' ? 'border-2 border-green-500' : ''
                      }`}
                    >
                      <div className="p-5 lg:p-6">
                        {/* Plumber Header */}
                        <div className="flex items-start gap-4 mb-4">
                          <div className="relative">
                            <Avatar className="w-14 h-14 border-2 border-white shadow">
                              <img src={quote.plumber.photo} alt={quote.plumber.name} className="w-full h-full object-cover" />
                            </Avatar>
                            {quote.plumber.verified && (
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#00C853] rounded-full flex items-center justify-center border-2 border-white">
                                <CheckCircle2 className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-lg mb-1">{quote.plumber.name}</h3>
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    <span className="text-sm">{quote.plumber.rating}</span>
                                  </div>
                                  <span className="text-sm text-gray-400">•</span>
                                  <span className="text-sm text-gray-600">{quote.plumber.completedJobs} jobs</span>
                                </div>
                              </div>
                              
                              {/* Price with Badge */}
                              <div className="text-right">
                                <div className="text-2xl text-[#007AFF] mb-1">
                                  ${quote.quote.totalCost}
                                </div>
                                {priceBadge && PriceBadgeIcon && (
                                  <Badge className={`${priceBadge.color} hover:${priceBadge.color} text-xs gap-1`}>
                                    <PriceBadgeIcon className="w-3 h-3" />
                                    {priceBadge.text}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Quick Info */}
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          <div className="bg-gray-50 rounded-xl p-3 text-center">
                            <p className="text-xs text-gray-500 mb-1">Labor</p>
                            <p className="text-sm">${quote.quote.laborCost}</p>
                          </div>
                          <div className="bg-gray-50 rounded-xl p-3 text-center">
                            <p className="text-xs text-gray-500 mb-1">Parts</p>
                            <p className="text-sm">${quote.quote.partsCost}</p>
                          </div>
                          <div className="bg-gray-50 rounded-xl p-3 text-center">
                            <p className="text-xs text-gray-500 mb-1">Time</p>
                            <p className="text-sm">{quote.quote.estimatedTime}h</p>
                          </div>
                        </div>

                        {/* Notes Preview */}
                        {quote.quote.additionalNotes && (
                          <div className="bg-blue-50 rounded-xl p-3 mb-4">
                            <p className="text-sm text-gray-700 line-clamp-2">
                              "{quote.quote.additionalNotes}"
                            </p>
                          </div>
                        )}

                        {/* Response Time */}
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                          <Clock className="w-4 h-4" />
                          <span>Responded {quote.submittedAt}</span>
                        </div>

                        {/* Action Button */}
                        <Button 
                          onClick={() => onViewQuoteDetails(quote.id)}
                          className="w-full bg-[#007AFF] hover:bg-[#0051D5] rounded-xl h-12"
                        >
                          View Details & Accept
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </TabsContent>

              {/* Comparison View */}
              <TabsContent value="compare" className="mt-4">
                <div className="overflow-x-auto pb-4">
                  <div className="min-w-max">
                    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${quotes.length}, 300px)` }}>
                      {sortedQuotes.map((quote, index) => {
                        const priceBadge = getPriceBadge(quote.quote.totalCost);
                        const PriceBadgeIcon = priceBadge?.icon;

                        return (
                          <Card 
                            key={quote.id} 
                            className={`overflow-hidden border-gray-100 ${
                              index === 0 && sortBy === 'price' ? 'border-2 border-green-500' : ''
                            }`}
                          >
                            <div className="p-5">
                              {/* Plumber Info */}
                              <div className="text-center mb-4">
                                <div className="relative inline-block mb-3">
                                  <Avatar className="w-16 h-16 border-2 border-white shadow">
                                    <img src={quote.plumber.photo} alt={quote.plumber.name} className="w-full h-full object-cover" />
                                  </Avatar>
                                  {quote.plumber.verified && (
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#00C853] rounded-full flex items-center justify-center border-2 border-white">
                                      <CheckCircle2 className="w-3 h-3 text-white" />
                                    </div>
                                  )}
                                </div>
                                <h3 className="mb-1">{quote.plumber.name}</h3>
                                <div className="flex items-center justify-center gap-1 mb-2">
                                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                  <span className="text-sm">{quote.plumber.rating}</span>
                                </div>
                              </div>

                              {/* Price */}
                              <div className="bg-gradient-to-br from-[#007AFF]/10 to-transparent rounded-xl p-4 text-center mb-4">
                                <p className="text-sm text-gray-500 mb-1">Total Cost</p>
                                <p className="text-3xl text-[#007AFF] mb-2">
                                  ${quote.quote.totalCost}
                                </p>
                                {priceBadge && PriceBadgeIcon && (
                                  <Badge className={`${priceBadge.color} hover:${priceBadge.color} text-xs gap-1`}>
                                    <PriceBadgeIcon className="w-3 h-3" />
                                    {priceBadge.text}
                                  </Badge>
                                )}
                              </div>

                              {/* Breakdown */}
                              <div className="space-y-3 mb-4">
                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                  <span className="text-sm text-gray-600">Labor</span>
                                  <span className="text-sm">${quote.quote.laborCost}</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                  <span className="text-sm text-gray-600">Parts</span>
                                  <span className="text-sm">${quote.quote.partsCost}</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                  <span className="text-sm text-gray-600">Time</span>
                                  <span className="text-sm">{quote.quote.estimatedTime} hours</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                  <span className="text-sm text-gray-600">Jobs</span>
                                  <span className="text-sm">{quote.plumber.completedJobs}</span>
                                </div>
                              </div>

                              {/* Action */}
                              <Button 
                                onClick={() => onViewQuoteDetails(quote.id)}
                                className="w-full bg-[#007AFF] hover:bg-[#0051D5] rounded-xl"
                              >
                                View Full Quote
                              </Button>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <Card className="p-5 border-blue-100 bg-blue-50 mt-4">
                  <p className="text-sm text-gray-700 text-center">
                    💡 <strong>Tip:</strong> Scroll horizontally to compare all quotes side-by-side
                  </p>
                </Card>
              </TabsContent>

              {/* Help Text */}
              <Card className="p-5 border-gray-100 bg-white mt-6 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#007AFF]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">💡</span>
                  </div>
                  <div>
                    <h3 className="mb-1">Making Your Decision</h3>
                    <p className="text-sm text-gray-600">
                      Consider not just the price, but also the plumber's rating, experience, and estimated completion time. 
                      You can message any plumber before accepting their quote.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Tabs>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeScreen="home" onNavigate={onNavigate} />
    </div>
  );
}
