import { ArrowLeft, DollarSign, TrendingUp, Calendar, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import PlumberBottomNavigation from './PlumberBottomNavigation';
import type { Screen } from '../App';

interface PlumberEarningsProps {
  onNavigate: (screen: Screen) => void;
}

const earningsData = [
  { date: 'Oct 25, 2025', jobs: 6, earnings: 420, commission: 84, net: 336 },
  { date: 'Oct 24, 2025', jobs: 5, earnings: 380, commission: 76, net: 304 },
  { date: 'Oct 23, 2025', jobs: 7, earnings: 510, commission: 102, net: 408 },
  { date: 'Oct 22, 2025', jobs: 4, earnings: 290, commission: 58, net: 232 },
  { date: 'Oct 21, 2025', jobs: 8, earnings: 625, commission: 125, net: 500 },
];

const jobBreakdown = [
  { type: 'Leaky Faucet', count: 12, avgPayout: 65 },
  { type: 'Clogged Drain', count: 8, avgPayout: 95 },
  { type: 'Toilet Repair', count: 6, avgPayout: 75 },
  { type: 'Water Heater', count: 3, avgPayout: 280 },
  { type: 'Pipe Leak', count: 5, avgPayout: 140 },
];

export default function PlumberEarnings({ onNavigate }: PlumberEarningsProps) {
  const totalEarnings = earningsData.reduce((sum, day) => sum + day.net, 0);
  const totalJobs = earningsData.reduce((sum, day) => sum + day.jobs, 0);
  const avgPerJob = totalEarnings / totalJobs;

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-6 pt-16 border-b border-gray-100">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onNavigate('plumber-home')}
          className="mb-4"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-2xl mb-2">Earnings</h1>
        <p className="text-gray-600">Track your income and performance</p>
      </div>

      {/* Summary Cards */}
      <div className="p-6 bg-gradient-to-b from-[#007AFF] to-[#0051D5]">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <Card className="p-4 border-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <p className="text-2xl mb-1">${totalEarnings}</p>
            <p className="text-xs text-gray-500">This Week (Net)</p>
          </Card>
          <Card className="p-4 border-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <p className="text-2xl mb-1">{totalJobs}</p>
            <p className="text-xs text-gray-500">Jobs Completed</p>
          </Card>
        </div>
        <Card className="p-4 border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Average per Job</p>
              <p className="text-2xl">${avgPerJob.toFixed(0)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1">Commission Rate</p>
              <p className="text-2xl">20%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="daily" className="h-full flex flex-col">
          <TabsList className="w-full rounded-none border-b border-gray-100 h-14 bg-white">
            <TabsTrigger value="daily" className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-[#007AFF] rounded-none">
              Daily
            </TabsTrigger>
            <TabsTrigger value="breakdown" className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-[#007AFF] rounded-none">
              Breakdown
            </TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="flex-1 overflow-y-auto p-6 pb-24 lg:pb-6 mt-0">
            <div className="space-y-3">
              {earningsData.map((day, index) => (
                <Card key={index} className="p-5 border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#007AFF]/10 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-[#007AFF]" />
                      </div>
                      <div>
                        <p className="text-gray-900">{day.date}</p>
                        <p className="text-sm text-gray-500">{day.jobs} jobs</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl text-[#00C853]">${day.net}</p>
                      <p className="text-xs text-gray-500">net</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="grid grid-cols-3 gap-4 text-center text-sm">
                      <div>
                        <p className="text-gray-500 mb-1">Gross</p>
                        <p className="text-gray-900">${day.earnings}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Commission</p>
                        <p className="text-red-600">-${day.commission}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Net</p>
                        <p className="text-green-600">${day.net}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-6">
              <Button variant="outline" className="w-full rounded-xl gap-2 h-12">
                <Download className="w-5 h-5" />
                Download Weekly Report
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="breakdown" className="flex-1 overflow-y-auto p-6 pb-24 lg:pb-6 mt-0">
            <Card className="p-5 border-gray-100 mb-6 bg-gradient-to-br from-[#007AFF]/5 to-white">
              <h3 className="mb-4">Job Type Analysis</h3>
              <p className="text-sm text-gray-600">
                Your most profitable job types this week
              </p>
            </Card>

            <div className="space-y-3">
              {jobBreakdown.map((job, index) => (
                <Card key={index} className="p-5 border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-gray-900">{job.type}</p>
                      <p className="text-sm text-gray-500">{job.count} jobs completed</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg text-[#007AFF]">${job.avgPayout}</p>
                      <p className="text-xs text-gray-500">avg payout</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#007AFF] rounded-full"
                        style={{ width: `${(job.count / 12) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 w-12 text-right">
                      {Math.round((job.count / totalJobs) * 100)}%
                    </p>
                  </div>
                  
                  <div className="mt-3 bg-green-50 rounded-lg p-2 text-center">
                    <p className="text-sm text-green-800">
                      Total Earned: ${(job.count * job.avgPayout * 0.8).toFixed(0)}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Navigation */}
      <PlumberBottomNavigation 
        activeScreen="plumber-earnings" 
        onNavigate={onNavigate}
      />
    </div>
  );
}
