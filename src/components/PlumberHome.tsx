import { useState } from 'react';
import { Settings, DollarSign, Clock, TrendingUp, Wrench, MapPin, Camera, ChevronRight, FileText, CheckCircle, AlertCircle, Package } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import PlumberBottomNavigation from './PlumberBottomNavigation';
import type { Screen } from '../App';

interface PlumberHomeProps {
  onNavigate: (screen: Screen) => void;
  onSwitchView: () => void;
  onSelectQuoteRequest: (requestId: string) => void;
}

type JobStatus = 'quote-requests' | 'pending-quotes' | 'active' | 'completed';

// Quote Requests - Jobs waiting for quotes
const quoteRequests = [
  {
    id: '1',
    issueType: 'Leaking Faucet',
    description: 'The kitchen faucet has been dripping constantly for the past week. Water is leaking from the base of the spout and creating a puddle around the sink area.',
    customerName: 'Sarah Anderson',
    location: '742 Evergreen Terrace, Springfield',
    distance: '2.3 mi',
    travelTime: '12 min',
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&h=600&fit=crop',
    requiredParts: [
      'Faucet cartridge replacement',
      'O-rings and washers',
      'Plumber\'s putty or silicone sealant'
    ],
    requiredTools: [
      'Basin wrench',
      'Adjustable wrench',
      'Screwdriver set'
    ],
    payout: 125,
    commission: 25,
    customerRating: 4.8,
    postedTime: '15 min ago',
    status: 'new' as const,
  },
  {
    id: '2',
    issueType: 'Clogged Kitchen Sink',
    description: 'Kitchen sink is completely backed up and won\'t drain. Water is standing in both sides of the double sink. Already tried using a plunger with no success.',
    customerName: 'James Mitchell',
    location: '123 Oak Street, Springfield',
    distance: '3.1 mi',
    travelTime: '18 min',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop',
    requiredParts: [
      'P-trap replacement (if damaged)',
      'Drain cleaner solution'
    ],
    requiredTools: [
      'Drain snake/auger',
      'Pipe wrench',
      'Bucket'
    ],
    payout: 95,
    commission: 19,
    customerRating: 5.0,
    postedTime: '32 min ago',
    status: 'new' as const,
  },
];

// Pending Quotes - Quotes submitted waiting for customer response
const pendingQuotes = [
  {
    id: 'pq1',
    issueType: 'Bathroom Toilet Repair',
    customerName: 'Emily Davis',
    location: '456 Pine Avenue, Springfield',
    distance: '1.8 mi',
    quotedAmount: 150,
    submittedAt: '2 hours ago',
    status: 'pending' as const,
  },
];

// Active Jobs - Accepted jobs in progress
const activeJobs = [
  {
    id: 'aj1',
    issueType: 'Water Heater Installation',
    customerName: 'Robert Johnson',
    location: '890 Maple Drive, Springfield',
    distance: '0.5 mi',
    scheduledTime: 'Today, 2:00 PM',
    payout: 380,
    status: 'on-the-way' as const,
    progress: 'Heading to location',
  },
  {
    id: 'aj2',
    issueType: 'Pipe Leak Repair',
    customerName: 'Lisa Brown',
    location: '234 Elm Street, Springfield',
    distance: '1.2 mi',
    scheduledTime: 'Today, 4:30 PM',
    payout: 210,
    status: 'scheduled' as const,
    progress: 'Scheduled',
  },
];

// Completed Jobs - Recently completed
const completedJobs = [
  {
    id: 'cj1',
    issueType: 'Drain Cleaning',
    customerName: 'Michael Wilson',
    location: '567 Oak Lane, Springfield',
    completedAt: 'Today, 11:30 AM',
    payout: 95,
    rating: 5,
    status: 'completed' as const,
  },
  {
    id: 'cj2',
    issueType: 'Faucet Replacement',
    customerName: 'Jennifer Garcia',
    location: '123 Birch Road, Springfield',
    completedAt: 'Yesterday, 3:15 PM',
    payout: 140,
    rating: 4.5,
    status: 'completed' as const,
  },
];

export default function PlumberHome({ onNavigate, onSwitchView, onSelectQuoteRequest }: PlumberHomeProps) {
  const [activeTab, setActiveTab] = useState<JobStatus>('quote-requests');

  return (
    <div className="h-full overflow-y-auto bg-[#F4F8FB]">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#007AFF] to-[#0051D5] rounded-b-[40px] p-6 pt-16 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white/80 text-sm">Plumber Dashboard</p>
            <h1 className="text-white text-2xl">Mike Johnson 🔧</h1>
          </div>
          <button 
            onClick={onSwitchView}
            className="lg:hidden w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
          >
            <Settings className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 text-center border-0 bg-white/95 backdrop-blur-sm shadow-lg">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-[#007AFF]/20 to-[#007AFF]/10 rounded-full flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 text-[#007AFF]" />
              </div>
              <p className="text-3xl mb-1">24</p>
              <p className="text-xs text-gray-500">Jobs Today</p>
            </div>
          </Card>
          <Card className="p-4 text-center border-0 bg-white/95 backdrop-blur-sm shadow-lg">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-full flex items-center justify-center mb-2">
                <span className="text-lg">⭐</span>
              </div>
              <p className="text-3xl mb-1">4.9</p>
              <p className="text-xs text-gray-500">Rating</p>
            </div>
          </Card>
          <Card className="p-4 text-center border-0 bg-white/95 backdrop-blur-sm shadow-lg">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center mb-2">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-3xl mb-1">$420</p>
              <p className="text-xs text-gray-500">Today</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 pt-0">
        {/* Jobs Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as JobStatus)} className="w-full min-h-[500px]">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto p-1 bg-white border border-gray-200 rounded-xl mb-6">
            <TabsTrigger 
              value="quote-requests" 
              className="flex items-center gap-2 data-[state=active]:bg-[#007AFF] data-[state=active]:text-white rounded-lg py-3 px-4"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">New Requests</span>
              <span className="sm:hidden">Requests</span>
              {quoteRequests.length > 0 && (
                <Badge className="ml-1 bg-red-500 hover:bg-red-500 text-white h-5 min-w-[20px] px-1.5 text-xs">
                  {quoteRequests.length}
                </Badge>
              )}
            </TabsTrigger>
            
            <TabsTrigger 
              value="pending-quotes" 
              className="flex items-center gap-2 data-[state=active]:bg-yellow-500 data-[state=active]:text-white rounded-lg py-3 px-4"
            >
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">Pending</span>
              <span className="sm:hidden">Pending</span>
              {pendingQuotes.length > 0 && (
                <Badge className="ml-1 bg-yellow-600 hover:bg-yellow-600 text-white h-5 min-w-[20px] px-1.5 text-xs">
                  {pendingQuotes.length}
                </Badge>
              )}
            </TabsTrigger>
            
            <TabsTrigger 
              value="active" 
              className="flex items-center gap-2 data-[state=active]:bg-green-500 data-[state=active]:text-white rounded-lg py-3 px-4"
            >
              <AlertCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Active Jobs</span>
              <span className="sm:hidden">Active</span>
              {activeJobs.length > 0 && (
                <Badge className="ml-1 bg-green-600 hover:bg-green-600 text-white h-5 min-w-[20px] px-1.5 text-xs">
                  {activeJobs.length}
                </Badge>
              )}
            </TabsTrigger>
            
            <TabsTrigger 
              value="completed" 
              className="flex items-center gap-2 data-[state=active]:bg-purple-500 data-[state=active]:text-white rounded-lg py-3 px-4"
            >
              <CheckCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Completed</span>
              <span className="sm:hidden">Done</span>
              {completedJobs.length > 0 && (
                <Badge className="ml-1 bg-purple-600 hover:bg-purple-600 text-white h-5 min-w-[20px] px-1.5 text-xs">
                  {completedJobs.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Quote Requests Tab */}
          <TabsContent value="quote-requests" className="mt-0 min-h-[400px]">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2>Quote Requests</h2>
                <Badge className="bg-[#007AFF] hover:bg-[#007AFF]">
                  {quoteRequests.length} New
                </Badge>
              </div>

              {quoteRequests.length === 0 ? (
                <Card className="p-8 text-center border-gray-100">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">No new quote requests</p>
                  <p className="text-sm text-gray-400 mt-1">Check back later for new opportunities</p>
                </Card>
              ) : (
                quoteRequests.map((request) => (
                  <Card 
                    key={request.id} 
                    className="overflow-hidden border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => {
                      onSelectQuoteRequest(request.id);
                      onNavigate('plumber-quote-review');
                    }}
                  >
                    <div className="bg-gradient-to-br from-[#007AFF]/10 to-transparent p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-12 h-12 bg-[#007AFF]/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <Wrench className="w-6 h-6 text-[#007AFF]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg mb-1 truncate">{request.issueType}</h3>
                            <div className="flex items-center gap-3 text-sm flex-wrap">
                              <div className="flex items-center gap-1">
                                <span>👤</span>
                                <span className="text-gray-600">{request.customerName}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-yellow-500">★</span>
                                <span className="text-gray-600">{request.customerRating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 truncate">{request.location}</p>
                          <p className="text-xs text-gray-500">{request.distance} • {request.travelTime} drive</p>
                        </div>
                      </div>

                      {request.image && (
                        <div className="flex items-center gap-2">
                          <Camera className="w-4 h-4 text-gray-500" />
                          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                            <ImageWithFallback 
                              src={request.image}
                              alt={request.issueType}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-xs text-gray-600">Photo attached</span>
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-xs text-gray-600 flex-wrap">
                        {request.requiredParts && request.requiredParts.length > 0 && (
                          <span>📦 {request.requiredParts.length} parts</span>
                        )}
                        {request.requiredTools && request.requiredTools.length > 0 && (
                          <span>🔧 {request.requiredTools.length} tools</span>
                        )}
                        <span className="text-gray-400">•</span>
                        <span>{request.postedTime}</span>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-3 border border-green-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-gray-600">Estimated Payout</p>
                            <p className="text-xl text-green-700">${request.payout}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">Net: ${request.payout - request.commission}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Pending Quotes Tab */}
          <TabsContent value="pending-quotes" className="mt-0 min-h-[400px]">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2>Pending Quotes</h2>
                <Badge className="bg-yellow-500 hover:bg-yellow-500">
                  {pendingQuotes.length} Waiting
                </Badge>
              </div>

              {pendingQuotes.length === 0 ? (
                <Card className="p-8 text-center border-gray-100">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">No pending quotes</p>
                  <p className="text-sm text-gray-400 mt-1">Quotes you submit will appear here</p>
                </Card>
              ) : (
                pendingQuotes.map((quote) => (
                  <Card key={quote.id} className="overflow-hidden border-gray-100">
                    <div className="bg-gradient-to-br from-yellow-50 to-transparent p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Clock className="w-6 h-6 text-yellow-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg mb-1 truncate">{quote.issueType}</h3>
                            <div className="flex items-center gap-2 text-sm">
                              <span>👤</span>
                              <span className="text-gray-600">{quote.customerName}</span>
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                          Pending
                        </Badge>
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 truncate">{quote.location}</p>
                          <p className="text-xs text-gray-500">{quote.distance} away</p>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-3 border border-blue-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-gray-600">Your Quote</p>
                            <p className="text-xl text-[#007AFF]">${quote.quotedAmount}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">Submitted</p>
                            <p className="text-xs text-gray-600">{quote.submittedAt}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-yellow-50 rounded-xl p-3 border border-yellow-100">
                        <p className="text-xs text-yellow-700">
                          ⏳ Waiting for customer response
                        </p>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Active Jobs Tab */}
          <TabsContent value="active" className="mt-0 min-h-[400px]">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2>Active Jobs</h2>
                <Button 
                  onClick={() => onNavigate('plumber-job-tracker')}
                  variant="outline"
                  size="sm"
                  className="border-2 border-gray-200 rounded-xl"
                >
                  View All
                </Button>
              </div>

              {activeJobs.length === 0 ? (
                <Card className="p-8 text-center border-gray-100">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <AlertCircle className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">No active jobs</p>
                  <p className="text-sm text-gray-400 mt-1">Accepted jobs will appear here</p>
                </Card>
              ) : (
                activeJobs.map((job) => (
                  <Card 
                    key={job.id} 
                    className="overflow-hidden border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => onNavigate('plumber-job-tracker')}
                  >
                    <div className="bg-gradient-to-br from-green-50 to-transparent p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Wrench className="w-6 h-6 text-green-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg mb-1 truncate">{job.issueType}</h3>
                            <div className="flex items-center gap-2 text-sm">
                              <span>👤</span>
                              <span className="text-gray-600">{job.customerName}</span>
                            </div>
                          </div>
                        </div>
                        <Badge className={`${
                          job.status === 'on-the-way' 
                            ? 'bg-green-500 hover:bg-green-500' 
                            : 'bg-blue-500 hover:bg-blue-500'
                        }`}>
                          {job.progress}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 truncate">{job.location}</p>
                          <p className="text-xs text-gray-500">{job.distance} away</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{job.scheduledTime}</p>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-3 border border-green-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-gray-600">Payout</p>
                            <p className="text-xl text-green-700">${job.payout}</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Completed Jobs Tab */}
          <TabsContent value="completed" className="mt-0 min-h-[400px]">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2>Completed Jobs</h2>
                <Button 
                  onClick={() => onNavigate('plumber-earnings')}
                  variant="outline"
                  size="sm"
                  className="border-2 border-gray-200 rounded-xl"
                >
                  View Earnings
                </Button>
              </div>

              {completedJobs.length === 0 ? (
                <Card className="p-8 text-center border-gray-100">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">No completed jobs yet</p>
                  <p className="text-sm text-gray-400 mt-1">Your completed jobs will appear here</p>
                </Card>
              ) : (
                completedJobs.map((job) => (
                  <Card key={job.id} className="overflow-hidden border-gray-100">
                    <div className="bg-gradient-to-br from-purple-50 to-transparent p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-6 h-6 text-purple-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg mb-1 truncate">{job.issueType}</h3>
                            <div className="flex items-center gap-2 text-sm">
                              <span>👤</span>
                              <span className="text-gray-600">{job.customerName}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500 text-lg">★</span>
                          <span className="text-gray-700">{job.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <p className="text-sm text-gray-900 flex-1 truncate">{job.location}</p>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Completed {job.completedAt}</span>
                        <span className="text-green-700">${job.payout}</span>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Availability Toggle */}
        <Card className="p-5 border-gray-100 bg-gradient-to-br from-green-50 to-white mt-6 mb-20 lg:mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="mb-1">Availability Status</h3>
              <p className="text-sm text-gray-600">You're currently accepting jobs</p>
            </div>
            <div className="w-14 h-8 bg-[#00C853] rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-6 h-6 bg-white rounded-full shadow-sm" />
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <PlumberBottomNavigation 
        activeScreen="plumber-home" 
        onNavigate={onNavigate}
      />
    </div>
  );
}
