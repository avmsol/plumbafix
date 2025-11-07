import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Home from './components/Home';
import Diagnostic from './components/Diagnostic';
import CameraInterface from './components/CameraInterface';
import DiagnosticResult from './components/DiagnosticResult';
import DIYGuide from './components/DIYGuide';
import DIYRewards from './components/DIYRewards';
import JobRequest from './components/JobRequest';
import PlumberMatching from './components/PlumberMatching';
import JobTracker from './components/JobTracker';
import UserDashboard from './components/UserDashboard';
import UserProfile from './components/UserProfile';
import UserSettings from './components/UserSettings';
import AddressSelect from './components/AddressSelect';
import AddAddressForm from './components/AddAddressForm';
import PlumberHome from './components/PlumberHome';
import PlumberJobTracker from './components/PlumberJobTracker';
import PlumberEarnings from './components/PlumberEarnings';
import PlumberProfile from './components/PlumberProfile';
import PlumberQuoteReview from './components/PlumberQuoteReview';
import PlumberQuoteSubmitted from './components/PlumberQuoteSubmitted';
import CustomerQuoteReview from './components/CustomerQuoteReview';
import QuoteComparison from './components/QuoteComparison';
import BookingConfirmation from './components/BookingConfirmation';
import PaymentScreen from './components/PaymentScreen';
import PaymentSuccess from './components/PaymentSuccess';
import Jobs from './components/Jobs';
import JobDetails from './components/JobDetails';
import AIReport from './components/AIReport';

export type Screen = 
  | 'welcome' 
  | 'login' 
  | 'home' 
  | 'diagnostic'
  | 'camera'
  | 'diagnostic-result'
  | 'diy-guide'
  | 'diy-rewards'
  | 'job-request' 
  | 'plumber-matching' 
  | 'job-tracker'
  | 'jobs'
  | 'job-details'
  | 'ai-report'
  | 'user-dashboard'
  | 'user-profile'
  | 'user-settings'
  | 'address-select'
  | 'add-address'
  | 'plumber-home'
  | 'plumber-job-tracker'
  | 'plumber-earnings'
  | 'plumber-quote-review'
  | 'plumber-quote-submitted'
  | 'customer-quote-review'
  | 'quote-comparison'
  | 'booking-confirmation'
  | 'payment'
  | 'payment-success';

export type UserType = 'customer' | 'plumber' | null;

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlockedAt?: string;
}

export interface UserProfile {
  credits: number;
  level: number;
  levelName: string;
  diyCompletedCount: number;
  badges: Badge[];
  totalCreditsEarned: number;
}

export interface DiagnosticData {
  issue: string;
  image?: string;
  estimatedPrice: { min: number; max: number };
  diyTip?: string;
  severity?: 'low' | 'medium' | 'high';
  confidence?: number;
  aiAnalysis?: string;
  detectedAt?: string;
  youtubeRecommendations?: Array<{
    title: string;
    channel: string;
    duration: string;
    thumbnail: string;
    url: string;
  }>;
  repairSteps?: string[];
}

export interface PlumberData {
  id: string;
  name: string;
  photo: string;
  rating: number;
  experience: number;
  phoneNumber?: string;
}

export interface JobData {
  id: string;
  issueType: string;
  date: string;
  cost: number;
  status: 'pending' | 'accepted' | 'on-the-way' | 'on-site' | 'completed' | 'left';
  jobType: 'diy' | 'plumber';
  plumber?: PlumberData;
  address: string;
  baseFee: number;
  travelFee: number;
  eta?: number;
  rating?: number;
  image?: string;
  description?: string;
  requiredParts?: string[];
  requiredTools?: string[];
  scheduledDate?: string;
  scheduledTime?: string;
  laborCost?: number;
  partsCost?: number;
  serviceFee?: number;
  tax?: number;
  creditsRedeemed?: number;
  estimatedDuration?: string;
  paymentStatus?: 'pending' | 'completed' | 'refunded';
  creditsEarned?: number;
  completionDate?: string;
  diagnosticData?: DiagnosticData;
  quotesReceived?: number;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [userType, setUserType] = useState<UserType>(null);
  const [diagnosticData, setDiagnosticData] = useState<DiagnosticData | null>(null);
  const [currentJob, setCurrentJob] = useState<JobData | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string>('Downtown, Seattle');
  const [selectedQuoteRequestId, setSelectedQuoteRequestId] = useState<string | null>(null);
  const [submittedQuoteDetails, setSubmittedQuoteDetails] = useState<{
    issueType: string;
    customerName: string;
    totalQuote: number;
    estimatedTime: string;
  } | null>(null);
  const [selectedCustomerQuoteId, setSelectedCustomerQuoteId] = useState<string | null>(null);
  const [bookingDetails, setBookingDetails] = useState<{
    address: string;
    date: Date;
    timeSlot: string;
  } | null>(null);
  const [creditsRedeemedInPayment, setCreditsRedeemedInPayment] = useState<number>(0);
  const [returnToScreen, setReturnToScreen] = useState<Screen>('home');
  const [userProfile, setUserProfile] = useState<UserProfile>({
    credits: 120,
    level: 2,
    levelName: 'Apprentice',
    diyCompletedCount: 4,
    badges: [
      {
        id: 'first-fix',
        name: 'First Fix',
        icon: '🔧',
        description: 'Completed your first DIY repair',
        unlockedAt: new Date().toISOString(),
      },
      {
        id: 'three-streak',
        name: 'Getting Started',
        icon: '🌟',
        description: 'Completed 3 DIY repairs',
        unlockedAt: new Date().toISOString(),
      },
    ],
    totalCreditsEarned: 220,
  });
  const [allJobs, setAllJobs] = useState<JobData[]>([
    {
      id: 'DIY-001',
      issueType: 'Leaky Faucet',
      date: 'Oct 20, 2025',
      cost: 0,
      status: 'completed',
      jobType: 'diy',
      address: '123 Main St, Seattle, WA',
      baseFee: 0,
      travelFee: 0,
      creditsEarned: 50,
      completionDate: 'Oct 20, 2025',
      description: 'Fixed a dripping kitchen faucet',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1759757707824-4e5f54b7a43c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFraW5nJTIwZmF1Y2V0JTIwcGx1bWJpbmd8ZW58MXx8fHwxNzYxNTY4MDMwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      requiredParts: ['Replacement Washer', 'O-Ring', 'Plumber\'s Tape'],
      requiredTools: ['Adjustable Wrench', 'Screwdriver', 'Pliers'],
      diagnosticData: {
        issue: 'Leaky Faucet',
        image: 'https://images.unsplash.com/photo-1759757707824-4e5f54b7a43c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFraW5nJTIwZmF1Y2V0JTIwcGx1bWJpbmd8ZW58MXx8fHwxNzYxNTY4MDMwfDA&ixlib=rb-4.1.0&q=80&w=1080',
        estimatedPrice: { min: 40, max: 70 },
        diyTip: 'Try tightening the faucet handle. If the leak persists, the washer likely needs replacement.',
        severity: 'medium',
        confidence: 92,
        aiAnalysis: 'Our AI detected a leaking faucet caused by a worn washer with 92% confidence. The drip appears steady, indicating internal component wear.',
        detectedAt: 'October 20, 2025, 9:30 AM',
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
      },
    },
    {
      id: 'DIY-002',
      issueType: 'Clogged Drain',
      date: 'Oct 15, 2025',
      cost: 0,
      status: 'completed',
      jobType: 'diy',
      address: '123 Main St, Seattle, WA',
      baseFee: 0,
      travelFee: 0,
      creditsEarned: 75,
      completionDate: 'Oct 15, 2025',
      description: 'Cleared bathroom sink drain',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG9nZ2VkJTIwZHJhaW4lMjBwbHVtYmluZ3xlbnwxfHx8fDE3NjE1NjgwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      requiredParts: ['Drain Cleaner', 'Baking Soda', 'Vinegar'],
      requiredTools: ['Plunger', 'Drain Snake'],
      diagnosticData: {
        issue: 'Clogged Drain',
        image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG9nZ2VkJTIwZHJhaW4lMjBwbHVtYmluZ3xlbnwxfHx8fDE3NjE1NjgwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        estimatedPrice: { min: 30, max: 60 },
        diyTip: 'Try using a plunger first. For tougher clogs, a drain snake or chemical drain cleaner may help.',
        severity: 'low',
        confidence: 88,
        aiAnalysis: 'Our AI detected a clogged bathroom sink drain with 88% confidence. The slow drainage suggests a partial blockage, likely caused by hair and soap buildup.',
        detectedAt: 'October 15, 2025, 2:15 PM',
        youtubeRecommendations: [
          {
            title: 'How to Unclog a Bathroom Sink Drain - Easy Method',
            channel: 'Home Repair Tutor',
            duration: '6:30',
            thumbnail: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=400&h=300&fit=crop',
            url: 'https://www.youtube.com/watch?v=example3',
          },
          {
            title: 'Clear a Clogged Drain Without Chemicals',
            channel: 'The Handyman',
            duration: '4:20',
            thumbnail: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=300&fit=crop',
            url: 'https://www.youtube.com/watch?v=example4',
          },
        ],
        repairSteps: [
          'Remove any visible debris from the drain opening using gloves or tweezers.',
          'Pour boiling water down the drain to help loosen the clog.',
          'Use a plunger: Fill the sink with a few inches of water, place the plunger over the drain, and plunge vigorously for 30 seconds.',
          'If the clog persists, try the baking soda and vinegar method: Pour 1/2 cup of baking soda down the drain, followed by 1/2 cup of white vinegar.',
          'Cover the drain with a stopper or cloth and wait 15-30 minutes for the reaction to work.',
          'Flush with hot water to clear the drain.',
          'For stubborn clogs, use a drain snake: Insert it into the drain and twist to grab or break up the blockage.',
          'Remove the snake slowly and dispose of any debris, then flush with hot water.',
        ],
      },
    },
    {
      id: 'JOB-12345678',
      issueType: 'Water Heater Repair',
      date: 'Oct 10, 2025',
      cost: 280,
      status: 'completed',
      jobType: 'plumber',
      address: '123 Main St, Seattle, WA',
      baseFee: 200,
      travelFee: 50,
      plumber: {
        id: 'plumber-1',
        name: 'Mike Johnson',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
        rating: 4.9,
        experience: 8,
      },
      scheduledDate: 'Wednesday, October 10, 2025',
      scheduledTime: '2:00 PM - 4:00 PM',
      laborCost: 200,
      partsCost: 50,
      serviceFee: 12,
      tax: 21,
      estimatedDuration: '2 hours',
      paymentStatus: 'completed',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGhlYXRlciUyMHBsdW1iaW5nfGVufDF8fHx8MTc2MTU2ODAzMHww&ixlib=rb-4.1.0&q=80&w=1080',
      requiredParts: ['Heating Element', 'Thermostat', 'Anode Rod'],
      requiredTools: ['Socket Wrench', 'Multimeter', 'Screwdriver Set'],
      diagnosticData: {
        issue: 'Water Heater Repair',
        image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGhlYXRlciUyMHBsdW1iaW5nfGVufDF8fHx8MTc2MTU2ODAzMHww&ixlib=rb-4.1.0&q=80&w=1080',
        estimatedPrice: { min: 250, max: 400 },
        diyTip: 'Water heater issues can be complex and potentially dangerous. Professional service is recommended.',
        severity: 'high',
        confidence: 95,
        aiAnalysis: 'Our AI detected a malfunctioning water heater with 95% confidence. The issue appears to involve a faulty heating element or thermostat. This requires professional service due to electrical and safety considerations.',
        detectedAt: 'October 10, 2025, 8:45 AM',
        youtubeRecommendations: [
          {
            title: 'Water Heater Troubleshooting - Common Problems',
            channel: 'Ask This Old House',
            duration: '12:15',
            thumbnail: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop',
            url: 'https://www.youtube.com/watch?v=example5',
          },
          {
            title: 'How to Replace a Water Heater Element',
            channel: 'Plumbing Basics',
            duration: '15:40',
            thumbnail: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop',
            url: 'https://www.youtube.com/watch?v=example6',
          },
        ],
      },
    },
  ]);

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const switchToPlumberView = () => {
    setUserType('plumber');
    setCurrentScreen('plumber-home');
  };

  const switchToCustomerView = () => {
    setUserType('customer');
    setCurrentScreen('home');
  };

  const toggleUserType = () => {
    if (userType === 'customer') {
      switchToPlumberView();
    } else {
      switchToCustomerView();
    }
  };

  const handleLogout = () => {
    setUserType(null);
    setCurrentScreen('login');
    setDiagnosticData(null);
    setCurrentJob(null);
  };

  // Mock quote requests data
  const mockQuoteRequests = [
    {
      id: '1',
      issueType: 'Leaking Faucet',
      description: 'The kitchen faucet has been dripping constantly for the past week. Water is leaking from the base of the spout and creating a puddle around the sink area.',
      customerName: 'Sarah Anderson',
      location: '742 Evergreen Terrace, Springfield',
      distance: '2.3 mi',
      travelTime: '12 min',
      image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&h=600&fit=crop',
      requiredParts: [
        'Faucet cartridge replacement',
        'O-rings and washers',
        'Plumber\'s putty or silicone sealant'
      ],
      requiredTools: [
        'Basin wrench',
        'Adjustable wrench',
        'Screwdriver set'
      ],
      payout: 125,
      commission: 25,
      customerRating: 4.8,
      postedTime: '15 min ago',
    },
    {
      id: '2',
      issueType: 'Clogged Kitchen Sink',
      description: 'Kitchen sink is completely backed up and won\'t drain. Water is standing in both sides of the double sink. Already tried using a plunger with no success.',
      customerName: 'James Mitchell',
      location: '123 Oak Street, Springfield',
      distance: '3.1 mi',
      travelTime: '18 min',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop',
      requiredParts: [
        'P-trap replacement (if damaged)',
        'Drain cleaner solution'
      ],
      requiredTools: [
        'Drain snake/auger',
        'Pipe wrench',
        'Bucket'
      ],
      payout: 95,
      commission: 19,
      customerRating: 5.0,
      postedTime: '32 min ago',
    },
  ];

  const selectedQuoteRequest = selectedQuoteRequestId 
    ? mockQuoteRequests.find(req => req.id === selectedQuoteRequestId) 
    : null;

  // Mock customer quotes (quotes received by customer from plumbers)
  const mockCustomerQuotes = [
    {
      id: '1',
      plumber: {
        id: 'p1',
        name: 'Mike Johnson',
        photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
        rating: 4.9,
        completedJobs: 247,
        responseTime: '< 15 min',
        verified: true,
      },
      quote: {
        laborCost: 85,
        partsCost: 40,
        totalCost: 125,
        estimatedTime: '2',
        additionalNotes: 'I have all the necessary parts in stock. Can complete this job today if accepted within the next hour.',
      },
      issueType: 'Leaking Faucet',
      submittedAt: '15 min ago',
    },
    {
      id: '2',
      plumber: {
        id: 'p2',
        name: 'Sarah Martinez',
        photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
        rating: 4.8,
        completedJobs: 189,
        responseTime: '< 20 min',
        verified: true,
      },
      quote: {
        laborCost: 75,
        partsCost: 35,
        totalCost: 110,
        estimatedTime: '1.5',
        additionalNotes: 'Experienced with this type of repair. I can start within 2 hours if needed.',
      },
      issueType: 'Leaking Faucet',
      submittedAt: '22 min ago',
    },
    {
      id: '3',
      plumber: {
        id: 'p3',
        name: 'David Chen',
        photo: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=400&fit=crop',
        rating: 4.7,
        completedJobs: 312,
        responseTime: '< 10 min',
        verified: true,
      },
      quote: {
        laborCost: 95,
        partsCost: 50,
        totalCost: 145,
        estimatedTime: '2.5',
        additionalNotes: 'Will use premium parts with extended warranty. Free follow-up inspection included.',
      },
      issueType: 'Leaking Faucet',
      submittedAt: '8 min ago',
    },
    {
      id: '4',
      plumber: {
        id: 'p4',
        name: 'James Wilson',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
        rating: 5.0,
        completedJobs: 156,
        responseTime: '< 30 min',
        verified: false,
      },
      quote: {
        laborCost: 70,
        partsCost: 45,
        totalCost: 115,
        estimatedTime: '2',
        additionalNotes: 'New to the area but highly experienced. Competitive pricing to build my reputation!',
      },
      issueType: 'Leaking Faucet',
      submittedAt: '45 min ago',
    },
  ];

  const selectedCustomerQuote = selectedCustomerQuoteId 
    ? mockCustomerQuotes.find(q => q.id === selectedCustomerQuoteId) 
    : null;

  const isAuthScreen = currentScreen === 'welcome' || currentScreen === 'login';
  const showSidebar = !isAuthScreen && userType !== null;

  return (
    <div className="min-h-screen bg-[#F4F8FB] overflow-x-hidden">
      {/* Sidebar for Desktop - Only show after auth */}
      {showSidebar && (
        <Sidebar 
          activeScreen={currentScreen}
          onNavigate={navigate}
          userType={userType}
          userProfile={userProfile}
          onSwitchUserType={toggleUserType}
        />
      )}

      {/* Main Content */}
      <div className={`${showSidebar ? 'lg:pl-72' : ''} min-h-screen overflow-x-hidden`}>
        {/* Content Container */}
        <div className="h-screen overflow-hidden">
          {currentScreen === 'welcome' && <Welcome onNavigate={navigate} />}
          {currentScreen === 'login' && <Login onNavigate={navigate} onUserTypeSelect={setUserType} />}
          {currentScreen === 'home' && (
            <Home 
              onNavigate={navigate} 
              onSwitchView={switchToPlumberView}
              currentAddress={selectedAddress}
              userProfile={userProfile}
              onViewQuote={setSelectedCustomerQuoteId}
              pendingQuotesCount={mockCustomerQuotes.length}
            />
          )}
          {currentScreen === 'diagnostic' && (
            <Diagnostic 
              onNavigate={navigate} 
              onDiagnosticComplete={setDiagnosticData}
            />
          )}
          {currentScreen === 'camera' && (
            <CameraInterface 
              onNavigate={navigate} 
              onDiagnosticComplete={setDiagnosticData}
            />
          )}
          {currentScreen === 'diagnostic-result' && diagnosticData && (
            <DiagnosticResult 
              onNavigate={navigate} 
              data={diagnosticData}
              onRequestPlumber={(job) => {
                setCurrentJob(job);
                navigate('job-request');
              }}
            />
          )}
          {currentScreen === 'diy-guide' && diagnosticData && (
            <DIYGuide 
              onNavigate={navigate} 
              issueTitle={diagnosticData.issue}
              repairSteps={diagnosticData.repairSteps || [
                'Turn off the hot and cold water at the under-sink shutoff valves or at the main, and wear gloves and eye protection.',
                'Open the faucet to relieve pressure, then place a bucket and towels under the sink and around the base to catch residual water.',
                'Use an adjustable wrench to disconnect the hot and cold supply lines from the shutoff valves and the faucet, allowing water to drain into the bucket.',
                'With a basin wrench, remove the faucet mounting nuts from below, cut any old sealant with a putty knife, and lift out the old faucet unit.',
                'Thoroughly clean the sink deck and escutcheon area to bare, smooth surfaces, removing corrosion and old sealant.',
                'Set the new faucet with its gasket or a bead of plumber\'s putty/silicone on the base, then secure it from below with the provided mounting hardware, snugging it evenly.',
                'Attach new braided supply lines to the faucet and shutoff valves, using two wrenches to support fittings and tightening snug (but don\'t over-tighten).',
                'Slowly reopen the shutoff valves, run the faucet for several minutes, and inspect all connections and the faucet base for leaks, wiping dry and rechecking after a few minutes.',
              ]}
            />
          )}
          {currentScreen === 'diy-rewards' && diagnosticData && (
            <DIYRewards 
              onNavigate={navigate} 
              issueTitle={diagnosticData.issue}
              currentProfile={userProfile}
              onUpdateProfile={setUserProfile}
              onJobCompleted={(creditsEarned) => {
                // Create a DIY job record
                const diyJob: JobData = {
                  id: 'DIY-' + Date.now().toString().slice(-8),
                  issueType: diagnosticData.issue,
                  date: new Date().toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  }),
                  cost: 0,
                  status: 'completed',
                  jobType: 'diy',
                  address: selectedAddress,
                  baseFee: 0,
                  travelFee: 0,
                  creditsEarned: creditsEarned,
                  completionDate: new Date().toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  }),
                  description: `Successfully completed DIY repair: ${diagnosticData.issue}`,
                  rating: 5,
                  image: diagnosticData.image,
                  diagnosticData: {
                    ...diagnosticData,
                    severity: 'medium',
                    confidence: 92,
                    aiAnalysis: `Our AI detected ${diagnosticData.issue.toLowerCase()} with high confidence. ${diagnosticData.diyTip || 'This is a common issue that can typically be resolved with basic tools and replacement parts.'}`,
                    detectedAt: new Date().toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit'
                    }),
                  },
                };
                // Add to all jobs list
                setAllJobs([diyJob, ...allJobs]);
              }}
            />
          )}
          {currentScreen === 'job-request' && currentJob && (
            <JobRequest 
              onNavigate={navigate} 
              job={currentJob}
              userProfile={userProfile}
              onConfirm={() => {
                // Create a pending job request with mock quotes received
                const pendingJob: JobData = {
                  id: 'REQ-' + Date.now().toString().slice(-8),
                  issueType: currentJob.issueType,
                  date: new Date().toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  }),
                  cost: 0,
                  status: 'pending',
                  jobType: 'plumber',
                  address: currentJob.address || selectedAddress,
                  baseFee: 0,
                  travelFee: 0,
                  image: currentJob.image,
                  description: currentJob.description,
                  requiredParts: currentJob.requiredParts,
                  requiredTools: currentJob.requiredTools,
                  diagnosticData: currentJob.diagnosticData,
                  quotesReceived: 3, // Mock number of quotes received
                };
                
                // Add to jobs list
                setAllJobs([pendingJob, ...allJobs]);
                setCurrentJob(pendingJob);
                
                // Navigate to jobs screen
                navigate('jobs');
              }}
            />
          )}
          {currentScreen === 'plumber-matching' && currentJob && (
            <PlumberMatching 
              onNavigate={navigate} 
              onPlumberFound={(plumber) => {
                setCurrentJob({ ...currentJob, plumber, status: 'accepted' });
                navigate('job-tracker');
              }}
            />
          )}
          {currentScreen === 'job-tracker' && currentJob && (
            <JobTracker 
              onNavigate={navigate} 
              job={currentJob}
              onJobUpdate={setCurrentJob}
            />
          )}
          {currentScreen === 'jobs' && (
            <Jobs 
              onNavigate={navigate}
              jobs={allJobs}
              onViewJob={(job) => {
                setCurrentJob(job);
                navigate('job-details');
              }}
            />
          )}
          {currentScreen === 'job-details' && currentJob && (
            <JobDetails 
              onNavigate={navigate}
              job={currentJob}
              onTrackJob={() => {
                // Navigate to job tracker for active plumber jobs
                navigate('job-tracker');
              }}
            />
          )}
          {currentScreen === 'ai-report' && currentJob && (
            <AIReport 
              onNavigate={navigate}
              job={currentJob}
            />
          )}
          {currentScreen === 'user-dashboard' && (
            <UserDashboard 
              onNavigate={navigate} 
              userProfile={userProfile}
              onViewJob={(job) => {
                setCurrentJob(job);
                navigate('job-details');
              }}
            />
          )}
          {currentScreen === 'user-profile' && userType === 'customer' && (
            <UserProfile 
              onNavigate={navigate} 
              userProfile={userProfile}
              onLogout={handleLogout}
            />
          )}
          {currentScreen === 'user-profile' && userType === 'plumber' && (
            <PlumberProfile 
              onNavigate={navigate}
              onLogout={handleLogout}
            />
          )}
          {currentScreen === 'user-settings' && <UserSettings onNavigate={navigate} />}
          {currentScreen === 'address-select' && (
            <AddressSelect 
              onNavigate={navigate} 
              onAddressSelect={setSelectedAddress}
              returnScreen={returnToScreen}
            />
          )}
          {currentScreen === 'add-address' && (
            <AddAddressForm onNavigate={navigate} />
          )}
          {currentScreen === 'plumber-home' && (
            <PlumberHome 
              onNavigate={navigate}
              onSwitchView={switchToCustomerView}
              onSelectQuoteRequest={setSelectedQuoteRequestId}
            />
          )}
          {currentScreen === 'plumber-job-tracker' && (
            <PlumberJobTracker onNavigate={navigate} />
          )}
          {currentScreen === 'plumber-earnings' && (
            <PlumberEarnings onNavigate={navigate} />
          )}
          {currentScreen === 'plumber-quote-review' && selectedQuoteRequest && (
            <PlumberQuoteReview 
              onNavigate={navigate}
              quoteRequest={selectedQuoteRequest}
              onSubmitQuote={setSubmittedQuoteDetails}
            />
          )}
          {currentScreen === 'plumber-quote-submitted' && submittedQuoteDetails && (
            <PlumberQuoteSubmitted 
              onNavigate={navigate}
              quoteDetails={submittedQuoteDetails}
            />
          )}
          {currentScreen === 'quote-comparison' && (
            <QuoteComparison 
              onNavigate={navigate}
              quotes={mockCustomerQuotes}
              issueType="Leaking Faucet"
              onViewQuoteDetails={(quoteId) => {
                setSelectedCustomerQuoteId(quoteId);
                navigate('customer-quote-review');
              }}
            />
          )}
          {currentScreen === 'customer-quote-review' && selectedCustomerQuote && (
            <CustomerQuoteReview 
              onNavigate={navigate}
              quote={selectedCustomerQuote}
              showBackToComparison={true}
              onAcceptQuote={() => {
                // Navigate to booking confirmation screen
                navigate('booking-confirmation');
              }}
              onDeclineQuote={() => {
                navigate('quote-comparison');
              }}
            />
          )}
          {currentScreen === 'booking-confirmation' && selectedCustomerQuote && (
            <BookingConfirmation 
              onNavigate={navigate}
              quote={selectedCustomerQuote}
              currentAddress={selectedAddress}
              onConfirmBooking={(details) => {
                setBookingDetails(details);
                navigate('payment');
              }}
              onSetReturnScreen={setReturnToScreen}
            />
          )}
          {currentScreen === 'payment' && selectedCustomerQuote && bookingDetails && (
            <PaymentScreen 
              onNavigate={navigate}
              quote={selectedCustomerQuote}
              userProfile={userProfile}
              onPaymentComplete={(creditsRedeemed) => {
                // Deduct redeemed credits from user profile
                if (creditsRedeemed > 0) {
                  setUserProfile({
                    ...userProfile,
                    credits: userProfile.credits - creditsRedeemed
                  });
                }
                // Store credits redeemed for job creation
                setCreditsRedeemedInPayment(creditsRedeemed);
                // Navigate to success screen after payment
                navigate('payment-success');
              }}
            />
          )}
          {currentScreen === 'payment-success' && selectedCustomerQuote && bookingDetails && (
            <PaymentSuccess 
              onNavigate={navigate}
              quote={selectedCustomerQuote}
              bookingDetails={bookingDetails}
              onContinueToTracking={() => {
                // Calculate payment details
                const serviceFee = Math.round(selectedCustomerQuote.quote.totalCost * 0.05);
                const subtotal = selectedCustomerQuote.quote.totalCost + serviceFee;
                const afterCredits = Math.max(0, subtotal - creditsRedeemedInPayment);
                const tax = Math.round(afterCredits * 0.08);
                const totalCost = afterCredits + tax;

                // Create a job after payment success
                const newJob: JobData = {
                  id: 'JOB-' + Date.now().toString().slice(-8),
                  issueType: selectedCustomerQuote.issueType,
                  date: new Date().toLocaleDateString(),
                  cost: totalCost,
                  status: 'accepted',
                  jobType: 'plumber',
                  plumber: {
                    id: selectedCustomerQuote.plumber.id,
                    name: selectedCustomerQuote.plumber.name,
                    photo: selectedCustomerQuote.plumber.photo,
                    rating: selectedCustomerQuote.plumber.rating,
                    experience: selectedCustomerQuote.plumber.completedJobs,
                  },
                  address: bookingDetails.address,
                  baseFee: selectedCustomerQuote.quote.laborCost,
                  travelFee: 0,
                  eta: 30,
                  scheduledDate: bookingDetails.date.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  }),
                  scheduledTime: bookingDetails.timeSlot,
                  laborCost: selectedCustomerQuote.quote.laborCost,
                  partsCost: selectedCustomerQuote.quote.partsCost,
                  serviceFee: serviceFee,
                  tax: tax,
                  creditsRedeemed: creditsRedeemedInPayment,
                  estimatedDuration: selectedCustomerQuote.quote.estimatedTime + ' hours',
                  paymentStatus: 'completed',
                  description: selectedCustomerQuote.quote.additionalNotes || 'Professional plumbing service',
                };
                // Add to all jobs list
                setAllJobs([newJob, ...allJobs]);
                setCurrentJob(newJob);
                navigate('job-tracker');
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
