import { ArrowLeft, Phone, MessageCircle, Star, MapPin, Clock, CheckCircle2, Calendar, AlertCircle, Wrench, Package, DollarSign, Shield, Gift, Receipt, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import type { Screen, JobData } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface JobTrackerProps {
  onNavigate: (screen: Screen) => void;
  job: JobData;
  onJobUpdate: (job: JobData) => void;
}

const statusSteps = [
  { key: 'accepted', label: 'Accepted', icon: '✓' },
  { key: 'on-the-way', label: 'On the Way', icon: '🚗' },
  { key: 'on-site', label: 'On Site', icon: '🔧' },
  { key: 'completed', label: 'Completed', icon: '✓' },
];

export default function JobTracker({ onNavigate, job }: JobTrackerProps) {
  const currentStepIndex = statusSteps.findIndex(step => step.key === job.status);
  const progress = ((currentStepIndex + 1) / statusSteps.length) * 100;

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-6 pt-16 border-b border-gray-100">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onNavigate('home')}
          className="mb-4"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-2xl mb-2">Track Your Job</h1>
        <p className="text-gray-600">Real-time updates on your service</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Plumber Card */}
        {job.plumber && (
          <Card className="p-5 border-gray-100 bg-gradient-to-br from-[#007AFF]/5 to-white">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="w-16 h-16 border-2 border-white shadow-lg">
                <AvatarImage src={job.plumber.photo} alt={job.plumber.name} />
                <AvatarFallback>{job.plumber.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-lg">{job.plumber.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{job.plumber.rating}</span>
                  </div>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-600">{job.plumber.experience} years exp</span>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                Certified
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                className="bg-[#007AFF] hover:bg-[#0051D5] rounded-xl gap-2"
              >
                <Phone className="w-4 h-4" />
                Call
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-gray-200 rounded-xl gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Chat
              </Button>
            </div>
          </Card>
        )}

        {/* Status Timeline */}
        <Card className="p-5 border-gray-100">
          <h3 className="mb-4">Job Status</h3>
          <div className="mb-6">
            <Progress value={progress} className="h-2" />
          </div>
          <div className="space-y-4">
            {statusSteps.map((step, index) => {
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;
              
              return (
                <div key={step.key} className="flex items-center gap-4">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                    ${isCompleted ? 'bg-[#00C853] text-white' : 'bg-gray-100 text-gray-400'}
                    ${isCurrent ? 'ring-4 ring-[#00C853]/20' : ''}
                  `}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <span className="text-lg">{step.icon}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                      {step.label}
                    </p>
                    {isCurrent && job.status === 'on-the-way' && (
                      <p className="text-sm text-gray-500">ETA: {job.eta} minutes</p>
                    )}
                    {isCurrent && job.status === 'on-site' && (
                      <p className="text-sm text-gray-500">Plumber is working on your issue</p>
                    )}
                  </div>
                  {isCurrent && (
                    <Badge className="bg-[#007AFF] text-white hover:bg-[#007AFF]">
                      Current
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Map */}
        {job.status === 'on-the-way' && (
          <Card className="p-0 border-gray-100 overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-50 relative">
              {/* Simulated Map */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Route line */}
                  <svg className="absolute inset-0 w-full h-full">
                    <path
                      d="M 80 140 Q 150 100, 220 60"
                      stroke="#007AFF"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="5,5"
                    />
                  </svg>
                  
                  {/* User location */}
                  <div className="absolute bottom-8 left-12">
                    <MapPin className="w-8 h-8 text-[#007AFF] fill-[#007AFF]" />
                  </div>
                  
                  {/* Plumber location */}
                  <div className="absolute top-8 right-12">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      <span className="text-xl">🚗</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-blue-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#007AFF]" />
                <span className="text-sm">Arriving in {job.eta} minutes</span>
              </div>
              <Button size="sm" variant="ghost" className="text-[#007AFF]">
                View in Maps
              </Button>
            </div>
          </Card>
        )}

        {/* Job Reference */}
        <Card className="p-4 border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <Receipt className="w-5 h-5 text-[#007AFF]" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Job Reference</p>
                <p className="text-sm">{job.id}</p>
              </div>
            </div>
            {job.paymentStatus === 'completed' && (
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Paid
              </Badge>
            )}
          </div>
        </Card>

        {/* Scheduled Booking */}
        {(job.scheduledDate || job.scheduledTime) && (
          <Card className="p-5 border-gray-100">
            <h3 className="mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#007AFF]" />
              Scheduled Booking
            </h3>
            <div className="space-y-3">
              {job.scheduledDate && (
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#007AFF]" />
                    <span className="text-sm text-gray-600">Date</span>
                  </div>
                  <span className="">{job.scheduledDate}</span>
                </div>
              )}
              {job.scheduledTime && (
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#007AFF]" />
                    <span className="text-sm text-gray-600">Time</span>
                  </div>
                  <span className="">{job.scheduledTime}</span>
                </div>
              )}
              {job.estimatedDuration && (
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-gray-600">Est. Duration</span>
                  </div>
                  <span className="">{job.estimatedDuration}</span>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Issue Details */}
        <Card className="p-5 border-gray-100">
          <h3 className="mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-[#007AFF]" />
            Issue Details
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Problem Type</p>
              <p className="">{job.issueType}</p>
            </div>
            
            {job.description && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Description</p>
                <p className="text-sm text-gray-700">{job.description}</p>
              </div>
            )}

            {job.image && (
              <div>
                <p className="text-sm text-gray-600 mb-2">Issue Photo</p>
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <ImageWithFallback 
                    src={job.image} 
                    alt="Issue photo"
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            )}

            <div>
              <p className="text-sm text-gray-600 mb-1">Service Location</p>
              <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm">{job.address}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Required Parts & Tools */}
        {(job.requiredParts || job.requiredTools) && (
          <Card className="p-5 border-gray-100">
            <h3 className="mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-[#007AFF]" />
              Required Items
            </h3>
            
            {job.requiredParts && job.requiredParts.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Package className="w-4 h-4 text-gray-600" />
                  <p className="text-sm">Parts & Materials</p>
                </div>
                <div className="space-y-2">
                  {job.requiredParts.map((part, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm text-gray-700 pl-6">
                      <span className="text-gray-400">•</span>
                      <span>{part}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {job.requiredTools && job.requiredTools.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="w-4 h-4 text-gray-600" />
                  <p className="text-sm">Tools</p>
                </div>
                <div className="space-y-2">
                  {job.requiredTools.map((tool, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm text-gray-700 pl-6">
                      <span className="text-gray-400">•</span>
                      <span>{tool}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        )}

        {/* Payment & Cost Breakdown */}
        <Card className="p-5 border-gray-100">
          <h3 className="mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-[#007AFF]" />
            Payment Details
          </h3>
          <div className="space-y-3">
            {job.laborCost !== undefined && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Labor Cost</span>
                <span className="text-gray-900">${job.laborCost}</span>
              </div>
            )}
            
            {job.partsCost !== undefined && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Parts & Materials</span>
                <span className="text-gray-900">${job.partsCost}</span>
              </div>
            )}

            {job.serviceFee !== undefined && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Service Fee (5%)</span>
                <span className="text-gray-900">${job.serviceFee}</span>
              </div>
            )}

            {job.creditsRedeemed !== undefined && job.creditsRedeemed > 0 && (
              <>
                <div className="h-px bg-gray-200" />
                <div className="flex justify-between text-sm">
                  <span className="text-purple-600 flex items-center gap-1">
                    <Gift className="w-3.5 h-3.5" />
                    DIY Credits Applied
                  </span>
                  <span className="text-purple-600">-${job.creditsRedeemed}</span>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-xs text-purple-700 text-center">
                    🎉 You saved ${job.creditsRedeemed} with DIY rewards!
                  </p>
                </div>
              </>
            )}

            {job.tax !== undefined && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Sales Tax (8%)</span>
                <span className="text-gray-900">${job.tax}</span>
              </div>
            )}

            <div className="h-px bg-gray-200 my-2" />

            <div className="flex justify-between items-center">
              <span className="text-lg">Total Paid</span>
              <span className="text-2xl text-[#007AFF]">${job.cost}</span>
            </div>

            <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 text-sm text-green-700">
                <Shield className="w-4 h-4" />
                <span>Payment secured & held until job completion</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Support Information */}
        <Card className="p-5 border-gray-100 bg-gradient-to-br from-gray-50 to-white">
          <h3 className="mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-[#007AFF]" />
            Need Help?
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
              <div>
                <p className="text-sm mb-1">Customer Support</p>
                <p className="text-xs text-gray-500">Available 24/7</p>
              </div>
              <Button size="sm" className="bg-[#007AFF] hover:bg-[#0051D5] rounded-lg">
                <Phone className="w-4 h-4 mr-1" />
                Call
              </Button>
            </div>
            <div className="text-xs text-gray-500 text-center">
              Reference ID: {job.id}
            </div>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      {job.status !== 'completed' && (
        <div className="p-6 border-t border-gray-100">
          <Button 
            variant="outline"
            className="w-full h-12 border-2 border-red-200 text-red-600 hover:bg-red-50 rounded-xl"
          >
            Cancel Job
          </Button>
        </div>
      )}
    </div>
  );
}
