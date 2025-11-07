import { ArrowLeft, Navigation, MapPin, Phone, Camera, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { useState } from 'react';
import PlumberBottomNavigation from './PlumberBottomNavigation';
import type { Screen } from '../App';

interface PlumberJobTrackerProps {
  onNavigate: (screen: Screen) => void;
}

const statusOptions = [
  { key: 'accepted', label: 'Accepted', color: 'bg-blue-100 text-blue-800' },
  { key: 'on-the-way', label: 'On the Way', color: 'bg-orange-100 text-orange-800' },
  { key: 'arrived', label: 'Arrived on Site', color: 'bg-purple-100 text-purple-800' },
  { key: 'working', label: 'Working', color: 'bg-yellow-100 text-yellow-800' },
  { key: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
];

export default function PlumberJobTracker({ onNavigate }: PlumberJobTrackerProps) {
  const [currentStatus, setCurrentStatus] = useState('on-the-way');

  const currentStatusObj = statusOptions.find(s => s.key === currentStatus);

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
        <h1 className="text-2xl mb-2">Active Job</h1>
        <p className="text-gray-600">Update your job status</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 pb-24 lg:pb-6 space-y-6">
        {/* Current Status */}
        <Card className="p-5 border-gray-100 bg-gradient-to-br from-[#007AFF]/5 to-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Current Status</p>
              <h2 className="text-2xl">{currentStatusObj?.label}</h2>
            </div>
            <Badge className={currentStatusObj?.color}>
              {currentStatusObj?.label}
            </Badge>
          </div>
        </Card>

        {/* Job Info */}
        <Card className="p-5 border-gray-100">
          <h3 className="mb-3">Job Details</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Issue</p>
              <p className="text-gray-900">Toilet Not Flushing</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Customer</p>
              <p className="text-gray-900">Sarah Miller</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="text-gray-900">742 Evergreen Terrace, Springfield</p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <p className="text-sm text-gray-500">Your Payout</p>
              <p className="text-xl text-[#00C853]">$68</p>
            </div>
          </div>
        </Card>

        {/* Navigation */}
        {(currentStatus === 'accepted' || currentStatus === 'on-the-way') && (
          <Card className="p-5 border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="mb-1">Navigation</h3>
                <p className="text-sm text-gray-600">2.3 miles • 12 min away</p>
              </div>
            </div>
            <Button className="w-full bg-[#007AFF] hover:bg-[#0051D5] rounded-xl gap-2">
              <Navigation className="w-5 h-5" />
              Open in Maps
            </Button>
          </Card>
        )}

        {/* Contact Customer */}
        <Card className="p-5 border-gray-100">
          <h3 className="mb-3">Contact Customer</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="rounded-xl gap-2">
              <Phone className="w-5 h-5" />
              Call
            </Button>
            <Button variant="outline" className="rounded-xl gap-2">
              <span className="text-lg">💬</span>
              Message
            </Button>
          </div>
        </Card>

        {/* Update Status */}
        <Card className="p-5 border-gray-100">
          <h3 className="mb-4">Update Job Status</h3>
          <div className="space-y-2">
            {statusOptions.map((status) => (
              <button
                key={status.key}
                onClick={() => setCurrentStatus(status.key)}
                className={`
                  w-full p-4 rounded-xl border-2 text-left transition-all
                  ${
                    currentStatus === status.key
                      ? 'border-[#007AFF] bg-[#007AFF]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <span className={currentStatus === status.key ? 'text-[#007AFF]' : 'text-gray-700'}>
                    {status.label}
                  </span>
                  {currentStatus === status.key && (
                    <CheckCircle2 className="w-5 h-5 text-[#007AFF]" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Add Photos */}
        {(currentStatus === 'working' || currentStatus === 'completed') && (
          <Card className="p-5 border-gray-100">
            <h3 className="mb-3">Job Documentation</h3>
            <p className="text-sm text-gray-600 mb-4">
              Upload photos of the work completed
            </p>
            <Button variant="outline" className="w-full rounded-xl gap-2 border-dashed border-2">
              <Camera className="w-5 h-5" />
              Add Photos
            </Button>
          </Card>
        )}

        {/* Job Notes */}
        <Card className="p-5 border-gray-100">
          <h3 className="mb-3">Job Notes</h3>
          <textarea 
            className="w-full min-h-[100px] p-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
            placeholder="Add notes about the repair, parts used, recommendations, etc."
          />
        </Card>
      </div>

      {/* Complete Job Button */}
      {currentStatus === 'completed' && (
        <div className="p-6 pb-24 lg:pb-6 border-t border-gray-100">
          <Button 
            onClick={() => onNavigate('plumber-home')}
            className="w-full h-14 bg-[#00C853] hover:bg-green-700 rounded-2xl gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            Complete & Submit Job
          </Button>
        </div>
      )}

      {/* Bottom Navigation */}
      <PlumberBottomNavigation 
        activeScreen="plumber-jobs" 
        onNavigate={onNavigate}
      />
    </div>
  );
}
