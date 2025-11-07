import { useState, useEffect } from 'react';
import { ArrowLeft, Camera, Video, RotateCcw, Check, X, Sparkles, Lightbulb } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import type { Screen, DiagnosticData } from '../App';

interface CameraInterfaceProps {
  onNavigate: (screen: Screen) => void;
  onDiagnosticComplete: (data: DiagnosticData) => void;
}

type CameraMode = 'photo' | 'video';
type CameraState = 'ready' | 'capturing' | 'preview';

export default function CameraInterface({ onNavigate, onDiagnosticComplete }: CameraInterfaceProps) {
  const [mode, setMode] = useState<CameraMode>('photo');
  const [state, setState] = useState<CameraState>('ready');
  const [isRecording, setIsRecording] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const handleCapture = () => {
    if (mode === 'photo') {
      // Take photo
      setState('preview');
    } else {
      // Start/stop video recording
      if (!isRecording) {
        setIsRecording(true);
      } else {
        setIsRecording(false);
        setState('preview');
      }
    }
  };

  const handleRetake = () => {
    setState('ready');
    setIsRecording(false);
  };

  const handleUse = () => {
    setState('capturing');
    setAnalysisProgress(0);
  };

  // Animate progress when in capturing state
  useEffect(() => {
    if (state === 'capturing') {
      const interval = setInterval(() => {
        setAnalysisProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            // Navigate to results after completion
            setTimeout(() => {
              const diagnosticData: DiagnosticData = {
                issue: 'Leaking Faucet - Worn Washer',
                image: 'https://images.unsplash.com/photo-1759757707824-4e5f54b7a43c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFraW5nJTIwZmF1Y2V0JTIwcGx1bWJpbmd8ZW58MXx8fHwxNzYxNTY4MDMwfDA&ixlib=rb-4.1.0&q=80&w=1080',
                estimatedPrice: { min: 40, max: 70 },
                diyTip: 'Try tightening the faucet handle. If the leak persists, the washer likely needs replacement.',
                severity: 'medium',
                confidence: 92,
                aiAnalysis: 'Our AI detected a leaking faucet caused by a worn washer with 92% confidence. The issue appears to be a steady drip from the spout, indicating internal component wear. This is a common household plumbing issue that can typically be resolved with basic tools and replacement parts.',
                detectedAt: new Date().toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit'
                }),
                youtubeRecommendations: [
                  {
                    title: 'How to Fix a Leaky Faucet - Kitchen Faucet Repair',
                    channel: 'This Old House',
                    duration: '8:45',
                    thumbnail: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=300&fit=crop',
                    url: 'https://www.youtube.com/watch?v=example1',
                  },
                  {
                    title: 'Replace a Worn Faucet Washer in 5 Minutes',
                    channel: 'DIY Plumbing Pro',
                    duration: '5:12',
                    thumbnail: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=300&fit=crop',
                    url: 'https://www.youtube.com/watch?v=example2',
                  },
                ],
                repairSteps: [
                  'Turn off the water supply at the shut-off valves under the sink.',
                  'Close the sink drain and place a towel in the sink to catch any dropped parts.',
                  'Remove the faucet handle by unscrewing the set screw (usually hidden under a decorative cap).',
                  'Use an adjustable wrench to remove the packing nut and pull out the stem.',
                  'Remove the old washer from the bottom of the stem using a flathead screwdriver.',
                  'Install the new washer, ensuring it fits snugly in place.',
                  'Reassemble the faucet by reversing the steps: insert the stem, tighten the packing nut, and reattach the handle.',
                  'Turn on the water supply and test the faucet for leaks.',
                ],
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
  }, [state, onDiagnosticComplete, onNavigate]);

  if (state === 'capturing') {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-white px-8">
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
    );
  }

  return (
    <div className="h-full flex flex-col bg-black relative">
      {/* Camera Feed Simulation */}
      <div className="flex-1 relative bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        {/* Simulated camera viewfinder */}
        <div className="absolute inset-0 flex items-center justify-center">
          {state === 'preview' ? (
            <div className="text-center">
              <div className="w-32 h-32 bg-[#007AFF]/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                {mode === 'photo' ? (
                  <Camera className="w-16 h-16 text-white/60" />
                ) : (
                  <Video className="w-16 h-16 text-white/60" />
                )}
              </div>
              <p className="text-white/80">
                {mode === 'photo' ? 'Photo captured' : 'Video recorded'}
              </p>
            </div>
          ) : (
            <>
              {/* Center focus indicator */}
              <div className="w-64 h-64 border-2 border-white/30 rounded-2xl" />
              
              {/* Camera placeholder icon */}
              <div className="absolute">
                <Camera className="w-20 h-20 text-white/30" />
              </div>

              {/* Recording indicator */}
              {isRecording && (
                <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-red-500 px-4 py-2 rounded-full flex items-center gap-2 animate-pulse">
                  <div className="w-3 h-3 bg-white rounded-full" />
                  <span className="text-white">REC</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Top Controls */}
        <div className="absolute top-0 left-0 right-0 p-6 pt-16 flex items-center justify-between z-10">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => state === 'preview' ? handleRetake() : onNavigate('diagnostic')}
            className="text-white hover:bg-white/10 rounded-full"
          >
            {state === 'preview' ? <X className="w-6 h-6" /> : <ArrowLeft className="w-6 h-6" />}
          </Button>

          {state === 'ready' && !isRecording && (
            <div className="flex bg-black/40 backdrop-blur-sm rounded-full p-1">
              <button
                onClick={() => setMode('photo')}
                className={`px-5 py-2 rounded-full transition-all text-sm ${
                  mode === 'photo' 
                    ? 'bg-white text-black' 
                    : 'text-white/70'
                }`}
              >
                Photo
              </button>
              <button
                onClick={() => setMode('video')}
                className={`px-5 py-2 rounded-full transition-all text-sm ${
                  mode === 'video' 
                    ? 'bg-white text-black' 
                    : 'text-white/70'
                }`}
              >
                Video
              </button>
            </div>
          )}

          {state === 'ready' && isRecording && (
            <div className="text-white text-sm">
              Video Mode
            </div>
          )}

          {state === 'preview' && (
            <div className="text-white text-sm">
              {mode === 'photo' ? 'Photo Mode' : 'Video Mode'}
            </div>
          )}

          <div className="w-10" /> {/* Spacer for alignment */}
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 pb-12 z-10">
          {state === 'preview' ? (
            // Preview actions
            <div className="flex items-center justify-center gap-4 px-6">
              <Button
                onClick={handleRetake}
                size="lg"
                variant="outline"
                className="rounded-full bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Retake
              </Button>
              <Button
                onClick={handleUse}
                size="lg"
                className="rounded-full bg-[#00C853] hover:bg-[#00A344] text-white gap-2 px-8"
              >
                <Check className="w-5 h-5" />
                Use {mode === 'photo' ? 'Photo' : 'Video'}
              </Button>
            </div>
          ) : (
            // Camera controls
            <div className="flex flex-col items-center gap-4">
              {/* Capture Button */}
              <button
                onClick={handleCapture}
                className="relative group"
              >
                <div className={`w-20 h-20 rounded-full border-4 border-white flex items-center justify-center transition-all ${
                  isRecording ? 'bg-red-500 scale-95' : 'bg-white/20 group-active:scale-90'
                }`}>
                  {mode === 'video' && isRecording ? (
                    <div className="w-7 h-7 bg-white rounded-sm" />
                  ) : (
                    <div className={`w-16 h-16 rounded-full ${
                      mode === 'video' ? 'bg-red-500' : 'bg-white'
                    }`} />
                  )}
                </div>
              </button>

              {/* Helper text */}
              <p className="text-white/60 text-sm">
                {mode === 'photo' ? 'Tap to capture' : isRecording ? 'Tap to stop recording' : 'Tap to start recording'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
