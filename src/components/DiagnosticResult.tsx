import { useState } from 'react';
import { ArrowLeft, Wrench, Settings, ChevronRight, Phone, ChevronDown, Play, Hammer, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Screen, DiagnosticData, JobData } from '../App';

interface DiagnosticResultProps {
  onNavigate: (screen: Screen) => void;
  data: DiagnosticData;
  onRequestPlumber: (job: JobData) => void;
}

export default function DiagnosticResult({ onNavigate, data, onRequestPlumber }: DiagnosticResultProps) {
  const [partsExpanded, setPartsExpanded] = useState(false);
  const [toolsExpanded, setToolsExpanded] = useState(false);
  const [videosExpanded, setVideosExpanded] = useState(false);
  const handleRequestPlumber = () => {
    const newJob: JobData = {
      id: `job-${Date.now()}`,
      issueType: data.issue,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      cost: 0,
      status: 'pending',
      jobType: 'plumber',
      address: '123 Main St, San Francisco, CA 94102',
      baseFee: 50,
      travelFee: 15,
      eta: 25,
      image: data.image,
      description: `Issue detected: ${data.issue}. ${data.diyTip || ''}`,
      requiredParts: requiredParts.map(part => part.name),
      requiredTools: requiredTools.map(tool => tool.name),
      diagnosticData: data,
    };
    onRequestPlumber(newJob);
  };

  const requiredParts = [
    {
      name: 'Single-handle deck-mount kitchen faucet (replacement assembly)',
      details: [
        'Replace the malfunctioning/failed faucet body and worn internal seals in one unit',
        'Choose a similar finish',
        'Ceramic cartridge',
        '1 or 3 holes/mounting holes base',
        '8-16 in spout height',
      ]
    },
    {
      name: 'Braided stainless steel faucet supply lines, 3/8 in compression x 1/2 in IPS',
      details: [
        'New supplies ensure leak-free connections from shutoff valves (to the replacement faucet)',
        '12 in length typical',
        'Stainless braided',
      ]
    },
    {
      name: "Plumber's putty or 100% silicone sealant",
      details: [
        'Seals the faucet to prevent water intrusion under the deck',
        'Use non-staining/clear/neutral cure silicone (preferred)',
      ]
    },
    {
      name: '3/8 in compression angle stop valve',
      details: [
        'Replace old/stuck valves if they will not fully close or seem leaky (one per line)',
        '1/2 in nominal',
        '1 stop/line (2 total)',
      ]
    },
  ];

  const requiredTools = [
    {
      name: 'Basin wrench',
      description: 'Reach and loosen/tighten the faucet mounting nuts in the tight space behind the sink',
    },
    {
      name: 'Adjustable wrench',
      description: 'Turn/remove old and new supply lines at the shutoff valves and faucet tails',
    },
    {
      name: 'Channel-lock pliers',
      description: 'Lock back fitting while tightening or avoid twisting copper or flex lines',
    },
    {
      name: 'Putty knife or razor scraper',
      description: 'Remove any carefully and old remnants from the sink deck for a clean starting surface',
    },
    {
      name: 'Phillips/flathead screwdriver',
      description: 'Install or remove brackets and screws provided with the faucet mounting hardware',
    },
  ];

  const repairSteps = [
    'Turn off the hot and cold water at the under-sink shutoff valves or at the main, and wear gloves and eye protection.',
    'Open the faucet to relieve pressure, then place a bucket and towels under the sink and around the base to catch residual water.',
    'Use an adjustable wrench to disconnect the hot and cold supply lines from the shutoff valves and the faucet, allowing water to drain into the bucket.',
    'With a basin wrench, remove the faucet mounting nuts from below, cut any old sealant with a putty knife, and lift out the old faucet unit.',
    'Thoroughly clean the sink deck and escutcheon area to bare, smooth surfaces, removing corrosion and old sealant.',
    'Set the new faucet with its gasket or a bead of plumber\'s putty/silicone on the base, then secure it from below with the provided mounting hardware, snugging it evenly.',
    'Attach new braided supply lines to the faucet and shutoff valves, using two wrenches to support fittings and tightening snug (but don\'t over-tighten).',
    'Slowly reopen the shutoff valves, run the faucet for several minutes, and inspect all connections and the faucet base for leaks, wiping dry and rechecking after a few minutes.',
  ];

  const recommendedVideos = [
    {
      id: '1',
      thumbnail: 'https://images.unsplash.com/photo-1635221798248-8a3452ad07cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmVyJTIwZml4aW5nJTIwZmF1Y2V0fGVufDF8fHx8MTc2MTQyMzg0NHww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'How to Fix a Leaking Kitchen Faucet - Complete Guide',
      channel: 'PlumbingPro',
      views: '2.4M views',
      duration: '12:45',
    },
    {
      id: '2',
      thumbnail: 'https://images.unsplash.com/photo-1681249537103-9e0c7316d91e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmluZyUyMHJlcGFpciUyMHR1dG9yaWFsfGVufDF8fHx8MTc2MTQyMzg0NHww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Replace a Single-Handle Faucet in Under 30 Minutes',
      channel: 'DIY Home Repairs',
      views: '1.8M views',
      duration: '18:22',
    },
    {
      id: '3',
      thumbnail: 'https://images.unsplash.com/photo-1662405964427-0e5e4c483a7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwc2luayUyMHJlcGFpcnxlbnwxfHx8fDE3NjE0MjM4NDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Fixing Cracked Faucet Body - Step by Step Tutorial',
      channel: 'The Handyman',
      views: '956K views',
      duration: '15:08',
    },
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-6 pt-16 border-b border-gray-100 flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onNavigate('home')}
          className="rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Issue Image */}
        <div className="w-full aspect-[2/1] overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1759757707824-4e5f54b7a43c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFraW5nJTIwZmF1Y2V0JTIwd2F0ZXJ8ZW58MXx8fHwxNzYxNDIyOTU3fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Leaking faucet"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Issue Details */}
        <div className="p-6">
          {/* Title and Badge */}
          <div className="mb-4">
            <h1 className="mb-3">Cracked Faucet Body and Failed Seals Causing Pressurized Spray</h1>
            <Badge className="bg-red-50 text-red-600 hover:bg-red-50 border border-red-200">
              🔴 HIGH PRIORITY
            </Badge>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            Water is visibly rinsing from the faucet body and pooling around the base, indicating a corroded or cracked spout 
            and a degraded base gasket/O-rings. These failures allow water to escape sideways and below the mounting 
            deck and, if ignored, they will saturate within-faucet assembly and erode wood floor underneath a plumbing system.
          </p>

          {/* Required Parts Section */}
          <div className="mb-6">
            <div className="border border-gray-200 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#007AFF]/10 rounded-full flex items-center justify-center">
                    <Wrench className="w-5 h-5 text-[#007AFF]" />
                  </div>
                  <span className="text-[#007AFF]">Required Parts</span>
                </div>
              </div>
              <div className="relative">
                <div 
                  className="px-5 overflow-hidden transition-all duration-300"
                  style={{ maxHeight: partsExpanded ? '2000px' : '200px' }}
                >
                  <div className="space-y-4 pb-5">
                    {requiredParts.map((part, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                        <div className="flex items-start gap-3 mb-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm text-gray-900 mb-2">{part.name}</p>
                            <ul className="space-y-1">
                              {part.details.map((detail, idx) => (
                                <li key={idx} className="text-xs text-gray-500 pl-0">
                                  {idx === 0 ? detail : `• ${detail}`}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {!partsExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none" />
                )}
              </div>
              <button
                onClick={() => setPartsExpanded(!partsExpanded)}
                className="w-full py-3 border-t border-gray-200 flex items-center justify-center gap-2 text-sm text-[#007AFF] hover:bg-gray-50 transition-colors"
              >
                {partsExpanded ? 'See Less' : 'See More'}
                <ChevronDown className={`w-4 h-4 transition-transform ${partsExpanded ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* Required Tools Section */}
          <div className="mb-6">
            <div className="border border-gray-200 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#007AFF]/10 rounded-full flex items-center justify-center">
                    <Settings className="w-5 h-5 text-[#007AFF]" />
                  </div>
                  <span className="text-[#007AFF]">Required Tools</span>
                </div>
              </div>
              <div className="relative">
                <div 
                  className="px-5 overflow-hidden transition-all duration-300"
                  style={{ maxHeight: toolsExpanded ? '2000px' : '180px' }}
                >
                  <div className="space-y-4 pb-5">
                    {requiredTools.map((tool, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                          <Settings className="w-5 h-5 text-[#007AFF]" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-900 mb-1">{tool.name}</p>
                          <p className="text-xs text-gray-500 leading-relaxed">{tool.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {!toolsExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none" />
                )}
              </div>
              <button
                onClick={() => setToolsExpanded(!toolsExpanded)}
                className="w-full py-3 border-t border-gray-200 flex items-center justify-center gap-2 text-sm text-[#007AFF] hover:bg-gray-50 transition-colors"
              >
                {toolsExpanded ? 'See Less' : 'See More'}
                <ChevronDown className={`w-4 h-4 transition-transform ${toolsExpanded ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* Recommended YouTube Videos */}
          <div className="mb-6">
            <div className="border border-gray-200 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-600/10 rounded-full flex items-center justify-center">
                    <Play className="w-5 h-5 text-red-600 fill-red-600" />
                  </div>
                  <span className="text-red-600">Recommended YouTube Videos</span>
                </div>
              </div>
              <div className="relative">
                <div 
                  className="px-5 overflow-hidden transition-all duration-300"
                  style={{ maxHeight: videosExpanded ? '2000px' : '200px' }}
                >
                  <div className="space-y-3 pb-5">
                    {recommendedVideos.map((video) => (
                      <a
                        key={video.id}
                        href={`https://youtube.com/results?search_query=${encodeURIComponent(video.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-3 hover:bg-gray-50 rounded-xl p-2 -m-2 transition-colors"
                      >
                        <div className="relative w-40 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                          <ImageWithFallback
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                            {video.duration}
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm text-gray-900 mb-1 line-clamp-2 leading-snug">
                            {video.title}
                          </h4>
                          <p className="text-xs text-gray-600 mb-0.5">{video.channel}</p>
                          <p className="text-xs text-gray-500">{video.views}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
                {!videosExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none" />
                )}
              </div>
              <button
                onClick={() => setVideosExpanded(!videosExpanded)}
                className="w-full py-3 border-t border-gray-200 flex items-center justify-center gap-2 text-sm text-red-600 hover:bg-gray-50 transition-colors"
              >
                {videosExpanded ? 'See Less' : 'See More'}
                <ChevronDown className={`w-4 h-4 transition-transform ${videosExpanded ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* Choose Your Path */}
          <div className="mb-6">
            <h3 className="text-gray-900 mb-4 px-1">What would you like to do?</h3>
            
            {/* DIY Option */}
            <div 
              onClick={() => onNavigate('diy-guide')}
              className="border-2 border-gray-200 rounded-2xl p-5 mb-4 hover:border-[#007AFF] hover:bg-blue-50/30 transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-[#007AFF]/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#007AFF] transition-colors">
                  <Hammer className="w-7 h-7 text-[#007AFF] group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-gray-900">DIY Repair</h4>
                    <Badge variant="outline" className="text-[#00C853] border-[#00C853]">Free</Badge>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    Follow our step-by-step guide with a completion checklist to fix the issue yourself.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">
                      Interactive Guide
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">
                      Progress Tracking
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#007AFF] flex-shrink-0 mt-1 transition-colors" />
              </div>
            </div>

            {/* Book Plumber Option */}
            <div 
              onClick={handleRequestPlumber}
              className="border-2 border-[#007AFF] rounded-2xl p-5 bg-[#007AFF]/5 hover:bg-[#007AFF]/10 transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-[#007AFF] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-gray-900">Book Expert Plumber</h4>
                    <Badge className="bg-[#007AFF] text-white">Recommended</Badge>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    Get matched with certified plumbers nearby and track your job in real-time.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-white text-gray-700 px-2.5 py-1 rounded-full border border-gray-200">
                      ${data.estimatedPrice.min}-${data.estimatedPrice.max}
                    </span>
                    <span className="text-xs bg-white text-gray-700 px-2.5 py-1 rounded-full border border-gray-200">
                      Certified Pros
                    </span>
                    <span className="text-xs bg-white text-gray-700 px-2.5 py-1 rounded-full border border-gray-200">
                      Real-time Tracking
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#007AFF] flex-shrink-0 mt-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
