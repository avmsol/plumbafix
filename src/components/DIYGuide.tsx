import { useState } from 'react';
import { ArrowLeft, CheckCircle2, Circle } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Checkbox } from './ui/checkbox';
import type { Screen } from '../App';

interface DIYGuideProps {
  onNavigate: (screen: Screen) => void;
  issueTitle: string;
  repairSteps: string[];
}

export default function DIYGuide({ onNavigate, issueTitle, repairSteps }: DIYGuideProps) {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (index: number) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedSteps(newCompleted);
  };

  const progress = (completedSteps.size / repairSteps.length) * 100;

  return (
    <div className="h-full flex flex-col bg-[#F4F8FB]">
      {/* Header */}
      <div className="bg-white p-6 pt-16 border-b border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onNavigate('diagnostic-result')}
            className="rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="flex-1">
            <h1 className="text-gray-900">DIY Repair Guide</h1>
            <p className="text-sm text-gray-500 mt-1">{issueTitle}</p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-[#F4F8FB] rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="text-sm text-[#007AFF]">
              {completedSteps.size} of {repairSteps.length} steps
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-gray-500 mt-2">
            {progress === 100 
              ? '🎉 All steps completed!' 
              : 'Check off each step as you complete it'}
          </p>
        </div>
      </div>

      {/* Steps List */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {repairSteps.map((step, index) => {
            const isCompleted = completedSteps.has(index);
            return (
              <div 
                key={index}
                className={`bg-white rounded-2xl border-2 transition-all ${
                  isCompleted 
                    ? 'border-[#00C853] bg-green-50/30' 
                    : 'border-gray-200'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    {/* Step Number */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm ${
                      isCompleted 
                        ? 'bg-[#00C853] text-white' 
                        : 'bg-[#007AFF] text-white'
                    }`}>
                      {index + 1}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 pt-0.5">
                      <p className={`text-sm leading-relaxed ${
                        isCompleted ? 'text-gray-500 line-through' : 'text-gray-900'
                      }`}>
                        {step}
                      </p>
                    </div>

                    {/* Checkbox */}
                    <button
                      onClick={() => toggleStep(index)}
                      className="flex-shrink-0 mt-0.5"
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-[#00C853] fill-[#00C853]" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-300" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Completion Message */}
        {progress === 100 && (
          <div className="mt-6 bg-gradient-to-r from-[#00C853]/10 to-[#007AFF]/10 rounded-2xl p-6 border-2 border-[#00C853]">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#00C853] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-gray-900 mb-2">Repair Complete! 🎉</h3>
              <p className="text-sm text-gray-600 mb-4">
                Great job! You've completed all the repair steps. Claim your rewards!
              </p>
              <Button 
                onClick={() => onNavigate('diy-rewards')}
                className="bg-gradient-to-r from-[#00C853] to-[#00A843] text-white hover:from-[#00A843] hover:to-[#008f3a]"
              >
                Claim Rewards 🎁
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      {progress < 100 && (
        <div className="p-6 bg-white border-t border-gray-100">
          <div className="flex gap-3">
            <Button 
              variant="outline"
              onClick={() => onNavigate('home')}
              className="flex-1 border-gray-300"
            >
              Save & Exit
            </Button>
            <Button 
              onClick={() => {
                // Mark all as complete for demo
                setCompletedSteps(new Set(repairSteps.map((_, i) => i)));
              }}
              className="flex-1 bg-[#007AFF] text-white hover:bg-[#0056b3]"
            >
              Mark All Complete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
