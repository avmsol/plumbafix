import { ArrowLeft, AlertCircle, Package, Wrench, Youtube, BookOpen, CheckCircle2, Camera, Zap, DollarSign, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Screen, JobData } from '../App';

interface AIReportProps {
  onNavigate: (screen: Screen) => void;
  job: JobData;
}

export default function AIReport({ onNavigate, job }: AIReportProps) {
  const diagnosticData = job.diagnosticData;

  if (!diagnosticData) {
    return (
      <div className="h-full flex items-center justify-center bg-[#F4F8FB] p-6">
        <div className="text-center">
          <p className="text-gray-600">No AI diagnostic data available for this job.</p>
          <Button 
            onClick={() => onNavigate('job-details')}
            className="mt-4"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const isDIY = job.jobType === 'diy';

  return (
    <div className="h-full flex flex-col bg-[#F4F8FB]">
      {/* Header */}
      <div className="bg-white p-6 lg:p-8 pt-16 lg:pt-8 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onNavigate('job-details')}
              className="rounded-full"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl lg:text-3xl mb-2">Full AI Report</h1>
              <p className="text-gray-600">{job.issueType}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-8 pb-24 lg:pb-8">
        <div className="max-w-4xl mx-auto space-y-4">
          
          {/* Captured Image */}
          {diagnosticData.image && (
            <Card className="p-4 border-gray-100 overflow-hidden">
              <div className="flex items-center gap-2 mb-3">
                <Camera className="w-5 h-5 text-gray-400" />
                <h3 className="text-gray-900">Captured Image</h3>
              </div>
              <div className="relative rounded-lg overflow-hidden bg-gray-100">
                <ImageWithFallback 
                  src={diagnosticData.image} 
                  alt={diagnosticData.issue}
                  className="w-full h-auto object-cover"
                />
              </div>
            </Card>
          )}

          {/* AI Analysis Summary */}
          <Card className="p-6 border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-[#007AFF]" />
              <h3 className="text-gray-900">AI Analysis Summary</h3>
            </div>
            
            <div className="space-y-4">
              {/* Severity and Confidence */}
              <div className="flex items-center gap-3 flex-wrap">
                {diagnosticData.severity && (
                  <Badge className={`
                    ${diagnosticData.severity === 'high' ? 'bg-red-100 text-red-700' : 
                      diagnosticData.severity === 'medium' ? 'bg-orange-100 text-orange-700' : 
                      'bg-green-100 text-green-700'}
                  `}>
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {diagnosticData.severity.charAt(0).toUpperCase() + diagnosticData.severity.slice(1)} Severity
                  </Badge>
                )}
                {diagnosticData.confidence !== undefined && (
                  <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                    {diagnosticData.confidence}% Confidence
                  </Badge>
                )}
              </div>

              {/* Issue Description */}
              <div>
                <h4 className="text-sm text-gray-600 mb-2">Issue Description</h4>
                <p className="text-gray-900">{diagnosticData.issue}</p>
              </div>

              {/* AI Analysis Text */}
              {diagnosticData.aiAnalysis && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-700">{diagnosticData.aiAnalysis}</p>
                </div>
              )}

              {/* Estimated Cost */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">Estimated Repair Cost</span>
                </div>
                <span className="text-gray-900">
                  ${diagnosticData.estimatedPrice.min} - ${diagnosticData.estimatedPrice.max}
                </span>
              </div>

              {/* DIY Tip */}
              {diagnosticData.diyTip && (
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm text-purple-900 mb-1">Quick Tip</h4>
                      <p className="text-sm text-purple-700">{diagnosticData.diyTip}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Required Parts */}
          {job.requiredParts && job.requiredParts.length > 0 && (
            <Card className="p-6 border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-gray-400" />
                <h3 className="text-gray-900">Required Parts</h3>
              </div>
              <div className="space-y-2">
                {job.requiredParts.map((part, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{part}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Required Tools */}
          {job.requiredTools && job.requiredTools.length > 0 && (
            <Card className="p-6 border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Wrench className="w-5 h-5 text-gray-400" />
                <h3 className="text-gray-900">Required Tools</h3>
              </div>
              <div className="space-y-2">
                {job.requiredTools.map((tool, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{tool}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* YouTube Recommendations */}
          {diagnosticData.youtubeRecommendations && diagnosticData.youtubeRecommendations.length > 0 && (
            <Card className="p-6 border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Youtube className="w-5 h-5 text-red-600" />
                <h3 className="text-gray-900">Recommended Video Tutorials</h3>
              </div>
              <div className="space-y-3">
                {diagnosticData.youtubeRecommendations.map((video, idx) => (
                  <a
                    key={idx}
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                  >
                    <div className="w-32 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback 
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm text-gray-900 mb-1 group-hover:text-[#007AFF] line-clamp-2">
                        {video.title}
                      </h4>
                      <p className="text-xs text-gray-600">{video.channel}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {video.duration}
                        </Badge>
                        <ExternalLink className="w-3 h-3 text-gray-400" />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </Card>
          )}

          {/* Step-by-Step Guide (DIY Only) */}
          {isDIY && diagnosticData.repairSteps && diagnosticData.repairSteps.length > 0 && (
            <Card className="p-6 border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-gray-400" />
                <h3 className="text-gray-900">Step-by-Step Repair Guide</h3>
              </div>
              <div className="space-y-3">
                {diagnosticData.repairSteps.map((step, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#007AFF] text-white flex items-center justify-center flex-shrink-0 text-sm">
                      {idx + 1}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-6" />
              
              <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm text-green-900 mb-1">Safety First!</h4>
                    <p className="text-sm text-green-700">
                      Always turn off water supply before starting repairs. Wear protective gear and work in a well-lit area. 
                      If you're unsure about any step, consider consulting a professional plumber.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Detection Info */}
          {diagnosticData.detectedAt && (
            <Card className="p-4 border-gray-100 bg-gray-50">
              <p className="text-xs text-gray-600 text-center">
                AI Analysis performed on {diagnosticData.detectedAt}
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
