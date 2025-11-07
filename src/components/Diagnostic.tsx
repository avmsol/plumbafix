import { useState, useEffect } from 'react';
import { ArrowLeft, Camera, Upload, Video, Sparkles, Lightbulb } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import BottomNavigation from './BottomNavigation';
import type { Screen, DiagnosticData } from '../App';

interface DiagnosticProps {
  onNavigate: (screen: Screen) => void;
  onDiagnosticComplete: (data: DiagnosticData) => void;
}

export default function Diagnostic({ onNavigate, onDiagnosticComplete }: DiagnosticProps) {
  const [uploaded, setUploaded] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const handleUpload = () => {
    setUploaded(true);
    setAnalysisProgress(0);
  };

  // Animate progress when uploaded
  useEffect(() => {
    if (uploaded) {
      const interval = setInterval(() => {
        setAnalysisProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            // Navigate to results after completion
            setTimeout(() => {
              const diagnosticData: DiagnosticData = {
                issue: 'Leaking Faucet - Worn Washer',
                estimatedPrice: { min: 40, max: 70 },
                diyTip: 'Try tightening the faucet handle. If the leak persists, the washer likely needs replacement.',
              };
              onDiagnosticComplete(diagnosticData);
              onNavigate('diagnostic-result');
            }, 300);
            return 100;
          }
          return prev + 2;
        });
      }, 30);

      return () => clearInterval(interval);
    }
  }, [uploaded, onDiagnosticComplete, onNavigate]);

  return (
    <div className="h-full flex flex-col bg-white relative">
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
        <h1 className="text-2xl mb-2">Diagnose Issue</h1>
        <p className="text-gray-600">Upload a photo or video of your plumbing problem</p>
      </div>

      {/* Upload Area */}
      <div className="flex-1 p-6 pb-24 overflow-y-auto">
        {!uploaded ? (
          <>
            {/* Primary Action - Open Camera */}
            <Button 
              onClick={() => onNavigate('camera')}
              className="w-full h-40 bg-[#007AFF] hover:bg-[#0051D5] rounded-3xl flex flex-col gap-4 shadow-lg shadow-[#007AFF]/20 mb-6"
            >
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <Camera className="w-11 h-11 text-white" />
              </div>
              <div className="text-center">
                <div className="text-lg text-white mb-1">Open Camera</div>
                <div className="text-sm text-white/70">Take photo or record video</div>
              </div>
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-sm text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Secondary Action - Choose File */}
            <Button 
              onClick={handleUpload}
              variant="outline"
              className="w-full h-16 border-2 border-gray-200 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-50"
            >
              <Upload className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">Choose from Gallery</span>
            </Button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full px-8">
            {/* Icon with sparkle effect */}
            <div className="w-24 h-24 bg-[#007AFF]/10 rounded-full flex items-center justify-center mb-6 relative">
              <Sparkles className="w-12 h-12 text-[#007AFF]" />
              <div className="absolute inset-0 rounded-full bg-[#007AFF]/5 animate-ping" />
            </div>

            {/* Title */}
            <h2 className="mb-3 text-center">Analyzing Your Plumbing Issue</h2>
            
            {/* Subtitle */}
            <p className="text-sm text-gray-500 text-center mb-8">
              AI is examining the image and identifying the problem...
            </p>

            {/* Progress Section */}
            <div className="w-full max-w-sm mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-600">Analysis Progress</span>
                <span className="text-sm text-[#007AFF]">{analysisProgress}%</span>
              </div>
              <Progress value={analysisProgress} className="h-2" />
            </div>

            {/* Plumbing Tip */}
            <div className="w-full max-w-sm bg-[#F4F8FB] rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-[#007AFF]" />
                <span className="text-[#007AFF]">Plumbing Tip</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Check toilet flappers yearly - a worn flapper can waste up to 200 gallons of water per day.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Tips */}
      {!uploaded && (
        <div className="p-6 bg-[#F4F8FB] rounded-t-3xl mb-20">
          <h3 className="text-sm mb-3">💡 Tips for Best Results</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex gap-2">
              <span>✓</span>
              <span>Ensure good lighting</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>Show the entire problem area</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>Include any visible leaks or damage</span>
            </li>
          </ul>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNavigation activeScreen="services" onNavigate={onNavigate} />
    </div>
  );
}
