import { ArrowLeft, Download, Star, MapPin, Calendar, Clock, DollarSign, User, Wrench, CheckCircle2, Gift, Phone, MessageSquare, Package, AlertCircle, Camera, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Screen, JobData } from '../App';

interface JobDetailsProps {
  onNavigate: (screen: Screen) => void;
  job: JobData;
  onTrackJob?: () => void;
}

export default function JobDetails({ onNavigate, job, onTrackJob }: JobDetailsProps) {
  const isDIY = job.jobType === 'diy';
  const isCompleted = job.status === 'completed';

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

  const statusBadge = getStatusBadge(job.status);

  return (
    <div className="h-full flex flex-col bg-[#F4F8FB]">
      {/* Header */}
      <div className="bg-white p-6 lg:p-8 pt-16 lg:pt-8 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onNavigate('jobs')}
              className="rounded-full"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl lg:text-3xl mb-2">Job Details</h1>
              <p className="text-gray-600">#{job.id}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-8 pb-24 lg:pb-8">
        <div className="max-w-4xl mx-auto space-y-4">
          
          {/* Captured Image */}
          {job.image && (
            <Card className="p-4 border-gray-100 overflow-hidden">
              <div className="flex items-center gap-2 mb-3">
                <Camera className="w-4 h-4 text-gray-400" />
                <h3 className="text-gray-900">Captured Image</h3>
              </div>
              <div className="relative rounded-lg overflow-hidden bg-gray-100">
                <ImageWithFallback 
                  src={job.image} 
                  alt={job.issueType}
                  className="w-full h-auto object-cover"
                />
              </div>
            </Card>
          )}

          {/* AI Analysis Details */}
          {job.diagnosticData && (
            <Card className="p-6 border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#007AFF]" />
                  <h3 className="text-gray-900">AI Analysis</h3>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onNavigate('ai-report')}
                  className="gap-2 rounded-xl text-[#007AFF] border-[#007AFF] hover:bg-[#007AFF] hover:text-white"
                >
                  View Full Report
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </Button>
              </div>
              
              <div className="space-y-4">
                {/* Severity and Confidence */}
                <div className="flex items-center gap-3 flex-wrap">
                  {job.diagnosticData.severity && (
                    <Badge className={`
                      ${job.diagnosticData.severity === 'high' ? 'bg-red-100 text-red-700' : 
                        job.diagnosticData.severity === 'medium' ? 'bg-orange-100 text-orange-700' : 
                        'bg-green-100 text-green-700'}
                    `}>
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {job.diagnosticData.severity.charAt(0).toUpperCase() + job.diagnosticData.severity.slice(1)} Severity
                    </Badge>
                  )}
                  {job.diagnosticData.confidence !== undefined && (
                    <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                      {job.diagnosticData.confidence}% Confidence
                    </Badge>
                  )}
                </div>

                {/* AI Analysis Text */}
                {job.diagnosticData.aiAnalysis && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-700">{job.diagnosticData.aiAnalysis}</p>
                  </div>
                )}

                {/* Estimated Cost */}
                {job.diagnosticData.estimatedPrice && (
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Estimated Repair Cost</span>
                    <span className="text-gray-900">
                      ${job.diagnosticData.estimatedPrice.min} - ${job.diagnosticData.estimatedPrice.max}
                    </span>
                  </div>
                )}

                {/* Detection Date */}
                {job.diagnosticData.detectedAt && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>Detected on {job.diagnosticData.detectedAt}</span>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Status Card */}
          <Card className="p-6 border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-xl text-gray-900 mb-2">{job.issueType}</h2>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className={`${isDIY ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'} hover:${isDIY ? 'bg-purple-100' : 'bg-blue-100'}`}>
                    {isDIY ? (
                      <>
                        <Wrench className="w-3 h-3 mr-1" />
                        DIY Repair
                      </>
                    ) : (
                      <>
                        <User className="w-3 h-3 mr-1" />
                        Professional Service
                      </>
                    )}
                  </Badge>
                  <Badge className={`${statusBadge.color} hover:${statusBadge.color}`}>
                    {isCompleted && <CheckCircle2 className="w-3 h-3 mr-1" />}
                    {statusBadge.label}
                  </Badge>
                </div>
              </div>
            </div>

            {job.description && (
              <p className="text-gray-600 mb-4">{job.description}</p>
            )}

            {/* Job Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span>{job.address}</span>
              </div>

              {job.scheduledDate && (
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span>{job.scheduledDate}</span>
                </div>
              )}

              {job.scheduledTime && (
                <div className="flex items-center gap-3 text-gray-600">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span>{job.scheduledTime}</span>
                </div>
              )}

              {job.estimatedDuration && (
                <div className="flex items-center gap-3 text-gray-600">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span>Estimated Duration: {job.estimatedDuration}</span>
                </div>
              )}
            </div>
          </Card>

          {/* Plumber Info (if applicable) */}
          {!isDIY && job.plumber && (
            <Card className="p-6 border-gray-100">
              <h3 className="text-gray-900 mb-4">Service Provider</h3>
              <div className="flex items-center gap-4">
                <img 
                  src={job.plumber.photo} 
                  alt={job.plumber.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-gray-900">{job.plumber.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{job.plumber.rating}</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{job.plumber.experience} years exp.</span>
                  </div>
                </div>
                {job.plumber.phoneNumber && isCompleted && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="gap-2 rounded-xl"
                    onClick={() => window.location.href = `tel:${job.plumber?.phoneNumber}`}
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </Button>
                )}
              </div>
            </Card>
          )}

          {/* Required Parts & Tools (if applicable) */}
          {(job.requiredParts || job.requiredTools) && (
            <Card className="p-6 border-gray-100">
              <h3 className="text-gray-900 mb-4">
                {isDIY ? 'What You Needed' : 'Parts & Tools Used'}
              </h3>
              
              {job.requiredParts && job.requiredParts.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4 text-gray-400" />
                    <p className="text-sm text-gray-600">Parts</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {job.requiredParts.map((part, idx) => (
                      <Badge key={idx} variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                        {part}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {job.requiredTools && job.requiredTools.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Wrench className="w-4 h-4 text-gray-400" />
                    <p className="text-sm text-gray-600">Tools</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {job.requiredTools.map((tool, idx) => (
                      <Badge key={idx} variant="outline" className="bg-gray-50 border-gray-200 text-gray-700">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          )}

          {/* Payment Breakdown */}
          <Card className="p-6 border-gray-100">
            <h3 className="text-gray-900 mb-4">Payment Details</h3>
            
            {isDIY ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                      <Gift className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Credits Earned</p>
                      <p className="text-lg text-purple-600">+{job.creditsEarned || 0} credits</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-900">Total Cost</span>
                  <span className="text-xl text-[#00C853]">$0 (DIY)</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {job.laborCost !== undefined && (
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Labor Cost</span>
                    <span>${job.laborCost}</span>
                  </div>
                )}
                {job.partsCost !== undefined && job.partsCost > 0 && (
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Parts Cost</span>
                    <span>${job.partsCost}</span>
                  </div>
                )}
                {job.travelFee > 0 && (
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Travel Fee</span>
                    <span>${job.travelFee}</span>
                  </div>
                )}
                {job.serviceFee !== undefined && (
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Service Fee</span>
                    <span>${job.serviceFee}</span>
                  </div>
                )}
                
                {job.creditsRedeemed !== undefined && job.creditsRedeemed > 0 && (
                  <>
                    <Separator />
                    <div className="flex items-center justify-between text-purple-600">
                      <div className="flex items-center gap-2">
                        <Gift className="w-4 h-4" />
                        <span>Credits Redeemed</span>
                      </div>
                      <span>-${job.creditsRedeemed}</span>
                    </div>
                  </>
                )}

                {job.tax !== undefined && (
                  <>
                    <Separator />
                    <div className="flex items-center justify-between text-gray-600">
                      <span>Tax</span>
                      <span>${job.tax}</span>
                    </div>
                  </>
                )}

                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-gray-900">Total Paid</span>
                  <span className="text-xl text-gray-900">${job.cost}</span>
                </div>

                {job.paymentStatus && (
                  <Badge className={`${
                    job.paymentStatus === 'completed' ? 'bg-green-100 text-green-700' :
                    job.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {job.paymentStatus === 'completed' ? '✓ Paid' : 
                     job.paymentStatus === 'pending' ? 'Payment Pending' : 'Refunded'}
                  </Badge>
                )}
              </div>
            )}
          </Card>

          {/* Rating (if completed) */}
          {isCompleted && job.rating && (
            <Card className="p-6 border-gray-100">
              <h3 className="text-gray-900 mb-4">Your Rating</h3>
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < job.rating!
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-lg text-gray-600 ml-2">{job.rating}.0</span>
              </div>
            </Card>
          )}

          {/* Action Buttons */}
          {isCompleted && (
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 h-12 rounded-xl gap-2"
                onClick={() => {
                  // Download receipt functionality would go here
                  alert('Receipt download coming soon!');
                }}
              >
                <Download className="w-5 h-5" />
                Download Receipt
              </Button>
              {!isDIY && job.plumber && (
                <Button 
                  variant="outline" 
                  className="flex-1 h-12 rounded-xl gap-2"
                  onClick={() => {
                    // Message plumber functionality would go here
                    alert('Messaging feature coming soon!');
                  }}
                >
                  <MessageSquare className="w-5 h-5" />
                  Contact {job.plumber.name.split(' ')[0]}
                </Button>
              )}
            </div>
          )}

          {/* View Quotes Button for Pending Jobs with Quotes */}
          {job.status === 'pending' && job.quotesReceived && job.quotesReceived > 0 && (
            <Card className="p-4 border-green-200 bg-green-50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <div>
                    <h3 className="text-gray-900">Quotes Received</h3>
                    <p className="text-sm text-gray-600">{job.quotesReceived} plumber{job.quotesReceived !== 1 ? 's' : ''} responded to your request</p>
                  </div>
                </div>
              </div>
              <Button 
                className="w-full h-12 bg-[#00C853] hover:bg-[#00A344] rounded-xl gap-2"
                onClick={() => onNavigate('quote-comparison')}
              >
                <CheckCircle2 className="w-5 h-5" />
                Compare {job.quotesReceived} Quote{job.quotesReceived !== 1 ? 's' : ''}
              </Button>
            </Card>
          )}

          {/* Track Job Button for Active Jobs */}
          {!isCompleted && job.jobType === 'plumber' && job.status !== 'pending' && (
            <Button 
              className="w-full h-12 bg-[#007AFF] hover:bg-[#0051D5] rounded-xl gap-2"
              onClick={() => {
                if (onTrackJob) {
                  onTrackJob();
                } else {
                  onNavigate('job-tracker');
                }
              }}
            >
              Track Job Live
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
