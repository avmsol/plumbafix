import { useState } from 'react';
import { ArrowLeft, MapPin, Wrench, Package, Hammer } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Screen, JobData, UserProfile } from '../App';

interface JobRequestProps {
  onNavigate: (screen: Screen) => void;
  job: JobData;
  onConfirm: () => void;
  userProfile?: UserProfile;
}

export default function JobRequest({ onNavigate, job, onConfirm }: JobRequestProps) {
  const [issueDescription, setIssueDescription] = useState('');

  return (
    <div className="h-full flex flex-col bg-[#F4F8FB] relative">
      {/* Header */}
      <div className="bg-white p-6 lg:p-8 pt-16 lg:pt-8 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onNavigate('diagnostic-result')}
            className="mb-4 lg:hidden"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl lg:text-3xl mb-2">Request Quote</h1>
          <p className="text-gray-600">Review issue details and get a quote from plumbers</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-20 lg:pb-8">
        <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
          
          {/* Image Captured */}
          {job.image && (
            <Card className="overflow-hidden border-gray-100">
              <div className="bg-gradient-to-br from-[#007AFF]/10 to-transparent p-4">
                <h3 className="flex items-center gap-2 mb-3">
                  <span className="text-xl">📸</span>
                  <span>Captured Image</span>
                </h3>
              </div>
              <div className="p-4 pt-0">
                <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden">
                  <ImageWithFallback 
                    src={job.image}
                    alt="Issue captured"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Issue Headline */}
          <Card className="p-5 lg:p-6 border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#007AFF]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Wrench className="w-6 h-6 text-[#007AFF]" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Issue Type</p>
                <h2 className="text-xl text-gray-900">{job.issueType}</h2>
              </div>
            </div>
          </Card>

          {/* Issue Description Auto-filled */}
          {job.description && (
            <Card className="p-5 lg:p-6 border-gray-100">
              <h3 className="mb-3">AI-Detected Issue Description</h3>
              <p className="text-gray-700 leading-relaxed">{job.description}</p>
            </Card>
          )}

          {/* Describe the Issue Text Field */}
          <Card className="p-5 lg:p-6 border-gray-100">
            <h3 className="mb-3">Describe the Issue</h3>
            <Textarea
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              placeholder="Add any additional details about the problem to help plumbers provide an accurate quote"
              className="min-h-32 rounded-xl border-gray-200 focus:border-[#007AFF] resize-none"
            />
            <p className="text-xs text-gray-500 mt-2">
              💡 The more details you provide, the better the quote accuracy
            </p>
          </Card>

          {/* Required Parts */}
          {job.requiredParts && job.requiredParts.length > 0 && (
            <Card className="p-5 lg:p-6 border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="">Required Parts</h3>
                  <p className="text-sm text-gray-500">Parts likely needed for this repair</p>
                </div>
              </div>
              <div className="space-y-3">
                {job.requiredParts.map((part, index) => (
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
              <div className="mt-4 bg-blue-50 rounded-xl p-3">
                <p className="text-sm text-blue-900">
                  💡 Plumbers will confirm exact parts needed and pricing
                </p>
              </div>
            </Card>
          )}

          {/* Required Tools */}
          {job.requiredTools && job.requiredTools.length > 0 && (
            <Card className="p-5 lg:p-6 border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Hammer className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="">Required Tools</h3>
                  <p className="text-sm text-gray-500">Tools needed for this repair</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {job.requiredTools.map((tool, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-3 bg-purple-50/50 rounded-xl border border-purple-100"
                  >
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Hammer className="w-4 h-4 text-purple-600" />
                    </div>
                    <p className="text-sm text-gray-900 flex-1">{tool}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-purple-50 rounded-xl p-3">
                <p className="text-sm text-purple-900">
                  🔧 Professional plumbers bring all necessary tools
                </p>
              </div>
            </Card>
          )}

          {/* Service Location */}
          <Card className="p-5 lg:p-6 border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Service Location</p>
                <p className="text-gray-900 mb-2">{job.address}</p>
                <button 
                  onClick={() => onNavigate('address-select')}
                  className="text-sm text-[#007AFF] hover:underline"
                >
                  Change Address
                </button>
              </div>
            </div>
          </Card>

          {/* Info Note */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-5 border border-blue-100">
            <div className="flex gap-3">
              <span className="text-2xl">ℹ️</span>
              <div>
                <h4 className="text-gray-900 mb-2">How It Works</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex gap-2">
                    <span className="text-[#007AFF]">1.</span>
                    <span>Submit your request with all details</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#007AFF]">2.</span>
                    <span>Certified plumbers review and send quotes</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#007AFF]">3.</span>
                    <span>Compare quotes and choose your plumber</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#007AFF]">4.</span>
                    <span>Schedule and track your service</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Get Quote CTA */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-6 lg:hidden">
        <Button 
          onClick={onConfirm}
          className="w-full h-14 bg-[#007AFF] hover:bg-[#0051D5] rounded-2xl text-lg gap-2"
        >
          <span>📝</span>
          Get Quote from Plumbers
        </Button>
      </div>

      {/* Desktop CTA */}
      <div className="hidden lg:block bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto p-6 lg:p-8">
          <Button 
            onClick={onConfirm}
            className="w-full h-14 bg-[#007AFF] hover:bg-[#0051D5] rounded-2xl text-lg gap-2"
          >
            <span>📝</span>
            Get Quote from Plumbers
          </Button>
        </div>
      </div>
    </div>
  );
}
