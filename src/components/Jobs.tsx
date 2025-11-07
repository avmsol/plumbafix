import { useState } from 'react';
import { ArrowLeft, Filter, Search, CheckCircle2, Clock, Wrench, User, MapPin, DollarSign, Calendar, Eye, Navigation, Gift, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import BottomNavigation from './BottomNavigation';
import type { Screen, JobData } from '../App';

interface JobsProps {
  onNavigate: (screen: Screen) => void;
  jobs: JobData[];
  onViewJob: (job: JobData) => void;
}

export default function Jobs({ onNavigate, jobs, onViewJob }: JobsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'diy' | 'plumber'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all');

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.issueType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || job.jobType === filterType;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && job.status !== 'completed') ||
                         (filterStatus === 'completed' && job.status === 'completed');
    return matchesSearch && matchesType && matchesStatus;
  });

  const diyJobs = filteredJobs.filter(j => j.jobType === 'diy');
  const plumberJobs = filteredJobs.filter(j => j.jobType === 'plumber');
  const activeJobs = filteredJobs.filter(j => j.status !== 'completed');
  const completedJobs = filteredJobs.filter(j => j.status === 'completed');

  const getStatusBadge = (status: JobData['status']) => {
    const statusConfig = {
      'pending': { label: 'Pending', color: 'bg-yellow-100 text-yellow-700' },
      'accepted': { label: 'Accepted', color: 'bg-blue-100 text-blue-700' },
      'on-the-way': { label: 'On the Way', color: 'bg-purple-100 text-purple-700' },
      'on-site': { label: 'In Progress', color: 'bg-orange-100 text-orange-700' },
      'completed': { label: 'Completed', color: 'bg-green-100 text-green-700' },
      'left': { label: 'Left', color: 'bg-gray-100 text-gray-700' },
    };
    return statusConfig[status];
  };

  const getStatusIcon = (status: JobData['status']) => {
    if (status === 'completed') {
      return <CheckCircle2 className="w-5 h-5 text-[#00C853]" />;
    } else {
      return <Clock className="w-5 h-5 text-orange-500" />;
    }
  };

  const JobCard = ({ job }: { job: JobData }) => {
    const statusBadge = getStatusBadge(job.status);
    const isDIY = job.jobType === 'diy';

    return (
      <Card className="p-4 border-gray-100 hover:border-[#007AFF] transition-all cursor-pointer">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
            job.status === 'completed' ? 'bg-[#00C853]/10' : 'bg-[#007AFF]/10'
          }`}>
            {getStatusIcon(job.status)}
          </div>

          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-gray-900 truncate">{job.issueType}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={`${isDIY ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'} hover:${isDIY ? 'bg-purple-100' : 'bg-blue-100'} text-xs`}>
                    {isDIY ? (
                      <>
                        <Wrench className="w-3 h-3 mr-1" />
                        DIY
                      </>
                    ) : (
                      <>
                        <User className="w-3 h-3 mr-1" />
                        Plumber
                      </>
                    )}
                  </Badge>
                  <Badge className={`${statusBadge.color} hover:${statusBadge.color} text-xs`}>
                    {statusBadge.label}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Job Details */}
            <div className="space-y-2 mb-3">
              {!isDIY && job.plumber && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="w-4 h-4 text-gray-400" />
                  <span>{job.plumber.name}</span>
                </div>
              )}
              
              {/* Show quotes received for pending jobs */}
              {job.status === 'pending' && job.quotesReceived && job.quotesReceived > 0 && (
                <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-1.5 text-sm text-green-700">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="font-medium">{job.quotesReceived} {job.quotesReceived === 1 ? 'Quote' : 'Quotes'} Received</span>
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="truncate">{job.address}</span>
              </div>

              {job.scheduledDate && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{job.scheduledDate} {job.scheduledTime && `• ${job.scheduledTime}`}</span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">${job.cost}</span>
                </div>
                {isDIY && job.creditsEarned && (
                  <div className="flex items-center gap-1 text-purple-600">
                    <Gift className="w-3.5 h-3.5" />
                    <span className="text-sm">+{job.creditsEarned} credits</span>
                  </div>
                )}
                {!isDIY && job.creditsRedeemed && job.creditsRedeemed > 0 && (
                  <div className="flex items-center gap-1 text-purple-600">
                    <Gift className="w-3.5 h-3.5" />
                    <span className="text-sm">-${job.creditsRedeemed}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                {job.status !== 'completed' && job.jobType === 'plumber' && job.status !== 'pending' && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="gap-1 rounded-lg"
                    onClick={() => onViewJob(job)}
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    Track
                  </Button>
                )}
                <Button 
                  size="sm" 
                  className="bg-[#007AFF] hover:bg-[#0051D5] gap-1 rounded-lg"
                  onClick={() => onViewJob(job)}
                >
                  <Eye className="w-3.5 h-3.5" />
                  {job.status === 'pending' && job.quotesReceived ? 'View Quotes' : 'View'}
                </Button>
              </div>
            </div>

            {/* Rating if completed */}
            {job.status === 'completed' && job.rating && (
              <div className="flex items-center gap-1 mt-3 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500">Your rating:</span>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < job.rating!
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    );
  };

  const EmptyState = ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Wrench className="w-8 h-8 text-gray-400" />
      </div>
      <p className="text-gray-500">{message}</p>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-white relative">
      {/* Header */}
      <div className="p-6 lg:p-8 pt-16 lg:pt-8 border-b border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onNavigate('home')}
              className="lg:hidden"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl lg:text-3xl mb-2">My Jobs</h1>
              <p className="text-gray-600">Track all your repairs and services</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input 
              placeholder="Search by issue type or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 rounded-xl border-gray-200"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Button
              variant={filterType === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType('all')}
              className={`rounded-full flex-shrink-0 ${
                filterType === 'all' ? 'bg-[#007AFF] hover:bg-[#0051D5]' : ''
              }`}
            >
              All Jobs
            </Button>
            <Button
              variant={filterType === 'diy' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType('diy')}
              className={`rounded-full flex-shrink-0 gap-1 ${
                filterType === 'diy' ? 'bg-purple-600 hover:bg-purple-700' : ''
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              DIY
            </Button>
            <Button
              variant={filterType === 'plumber' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType('plumber')}
              className={`rounded-full flex-shrink-0 gap-1 ${
                filterType === 'plumber' ? 'bg-blue-600 hover:bg-blue-700' : ''
              }`}
            >
              <User className="w-3.5 h-3.5" />
              Plumber
            </Button>
            <Button
              variant={filterStatus === 'active' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus(filterStatus === 'active' ? 'all' : 'active')}
              className={`rounded-full flex-shrink-0 gap-1 ${
                filterStatus === 'active' ? 'bg-orange-600 hover:bg-orange-700' : ''
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              Active
            </Button>
            <Button
              variant={filterStatus === 'completed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus(filterStatus === 'completed' ? 'all' : 'completed')}
              className={`rounded-full flex-shrink-0 gap-1 ${
                filterStatus === 'completed' ? 'bg-green-600 hover:bg-green-700' : ''
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Completed
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="border-b border-gray-100 bg-gradient-to-br from-[#F4F8FB] to-white">
        <div className="max-w-6xl mx-auto p-6 lg:p-8 py-4 lg:py-6">
          <div className="grid grid-cols-4 gap-3">
            <Card className="p-3 lg:p-4 text-center border-gray-100 bg-white">
              <p className="text-xl lg:text-2xl text-[#007AFF] mb-1">{jobs.length}</p>
              <p className="text-xs text-gray-500">Total</p>
            </Card>
            <Card className="p-3 lg:p-4 text-center border-gray-100 bg-white">
              <p className="text-xl lg:text-2xl text-purple-600 mb-1">{diyJobs.length}</p>
              <p className="text-xs text-gray-500">DIY</p>
            </Card>
            <Card className="p-3 lg:p-4 text-center border-gray-100 bg-white">
              <p className="text-xl lg:text-2xl text-blue-600 mb-1">{plumberJobs.length}</p>
              <p className="text-xs text-gray-500">Plumber</p>
            </Card>
            <Card className="p-3 lg:p-4 text-center border-gray-100 bg-white">
              <p className="text-xl lg:text-2xl text-[#00C853] mb-1">{completedJobs.length}</p>
              <p className="text-xs text-gray-500">Done</p>
            </Card>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="flex-1 overflow-y-auto pb-24 lg:pb-8">
        <div className="max-w-6xl mx-auto p-6 lg:p-8">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-100 rounded-xl p-1">
              <TabsTrigger value="all" className="rounded-lg">
                All ({filteredJobs.length})
              </TabsTrigger>
              <TabsTrigger value="active" className="rounded-lg">
                Active ({activeJobs.length})
              </TabsTrigger>
              <TabsTrigger value="completed" className="rounded-lg">
                Completed ({completedJobs.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-3 mt-0">
              {filteredJobs.length > 0 ? (
                filteredJobs.map(job => <JobCard key={job.id} job={job} />)
              ) : (
                <EmptyState message="No jobs found. Start a new repair or request a plumber!" />
              )}
            </TabsContent>

            <TabsContent value="active" className="space-y-3 mt-0">
              {activeJobs.length > 0 ? (
                activeJobs.map(job => <JobCard key={job.id} job={job} />)
              ) : (
                <EmptyState message="No active jobs at the moment." />
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-3 mt-0">
              {completedJobs.length > 0 ? (
                completedJobs.map(job => <JobCard key={job.id} job={job} />)
              ) : (
                <EmptyState message="No completed jobs yet." />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeScreen="jobs" onNavigate={onNavigate} />
    </div>
  );
}
