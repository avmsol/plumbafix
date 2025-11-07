# Quote Comparison Feature Guide

## Overview
The Quote Comparison feature allows customers to receive multiple quotes from different plumbers for the same job request and compare them side-by-side before making a decision.

## User Flow

### 1. Customer Journey
1. **Job Request**: Customer submits a plumbing issue through the diagnostic flow
2. **Quote Notification**: Multiple plumbers submit quotes for the job
3. **Quote Comparison Screen**: Customer sees all quotes in one place
4. **Individual Review**: Customer can view detailed information for each quote
5. **Accept Quote**: Customer accepts one quote and proceeds to job tracking

### 2. Navigation Flow
```
Home (with quote notification)
  ↓
Quote Comparison (compare all quotes)
  ↓
Customer Quote Review (detailed view of selected quote)
  ↓
Payment Screen (secure payment)
  ↓
Job Tracker (after successful payment)
```

## Features

### Quote Comparison Screen (`/components/QuoteComparison.tsx`)

#### Overview Stats
- **Best Price**: Shows the lowest quote amount
- **Average Price**: Calculated average of all quotes
- **Average Rating**: Average plumber rating across all quotes

#### Sorting Options
Customers can sort quotes by:
- **Price** (default): Shows best price first
- **Rating**: Shows highest-rated plumbers first
- **Time**: Shows fastest completion time first

#### View Modes

**List View**
- Displays quotes in a vertical list
- Shows plumber photo, name, rating, and total cost
- Displays cost breakdown (labor, parts, estimated time)
- Preview of plumber's notes
- Highlights the best price with a badge
- Quick action button to view full details

**Side-by-Side Comparison**
- Horizontal scrollable cards
- Compare multiple quotes at once
- Shows all key metrics in uniform layout
- Visual price comparison with badges
- Easy to spot differences

#### Quote Cards Include:
- Plumber profile photo with verification badge
- Plumber name and rating
- Number of completed jobs
- Total quote cost with price badges:
  - 🟢 **Best Price**: Lowest quote
  - 🔴 **Highest**: Highest quote
- Cost breakdown:
  - Labor cost
  - Parts & materials cost
  - Estimated completion time
- Quote submission time
- Preview of additional notes
- Action button to view full details

### Individual Quote Review (`/components/CustomerQuoteReview.tsx`)

#### Detailed Information
- Complete plumber profile
- Full cost breakdown
- Estimated completion time
- Plumber's detailed notes
- What's included in the service
- Payment information
- Contact options (Call/Message)

#### Actions
- **Continue to Payment**: Proceeds to secure payment screen
- **Decline Quote**: Returns to comparison view
- **Back**: Returns to comparison screen
- **Contact Plumber**: Call or message options

### Payment Screen (`/components/PaymentScreen.tsx`)

#### Secure Payment Processing
After accepting a quote, customers must complete payment before booking is confirmed.

**Features:**
- Multiple payment methods (Card, UPI, Wallet)
- Secure payment form with validation
- Cost breakdown with fees and taxes
- Terms and conditions acceptance
- Processing animations
- Success confirmation

**See PAYMENT_FLOW_GUIDE.md for complete payment documentation**

## Mock Data Structure

### Quote Object
```typescript
{
  id: string;
  plumber: {
    id: string;
    name: string;
    photo: string;
    rating: number;
    completedJobs: number;
    responseTime: string;
    verified: boolean;
  };
  quote: {
    laborCost: number;
    partsCost: number;
    totalCost: number;
    estimatedTime: string;
    additionalNotes?: string;
  };
  issueType: string;
  submittedAt: string;
}
```

## Example Mock Quotes (App.tsx)

The app includes 4 sample quotes with varying prices ($110-$145), ratings (4.7-5.0), and completion times (1.5-2.5 hours).

### Sample Plumbers:
1. **Mike Johnson** - $125, 4.9★, 247 jobs
2. **Sarah Martinez** - $110, 4.8★, 189 jobs (Best Price)
3. **David Chen** - $145, 4.7★, 312 jobs (Highest)
4. **James Wilson** - $115, 5.0★, 156 jobs

## Key Components

### 1. QuoteComparison.tsx
- Main comparison interface
- Sorting and filtering
- Two view modes (list/comparison)
- Navigation to detailed views

### 2. CustomerQuoteReview.tsx
- Detailed quote view
- Accept/Decline actions
- Plumber contact options
- Full breakdown display

### 3. Home.tsx
- Quote notification banner
- Shows pending quote count
- Quick navigation to comparison

## State Management (App.tsx)

### State Variables
```typescript
const [selectedCustomerQuoteId, setSelectedCustomerQuoteId] = useState<string | null>(null);
const mockCustomerQuotes = [...]; // Array of quote objects
```

### Navigation
- `quote-comparison`: Shows all quotes
- `customer-quote-review`: Shows individual quote details
- `payment`: Secure payment processing
- `job-tracker`: Shows after successful payment

## Design Features

### Visual Elements
- **Color Coding**: 
  - Green for best price
  - Red for highest price
  - Blue for average/selected items
- **Badges**: Visual indicators for price rankings
- **Icons**: Trending down/up for price indicators
- **Cards**: Clean, rounded cards with shadows
- **Responsive**: Works on mobile and desktop

### User Experience
- **Quick Comparison**: Easy to scan and compare
- **Detailed Review**: Full information when needed
- **Sorting Options**: Multiple ways to organize quotes
- **Back Navigation**: Easy to return to comparison
- **Clear CTAs**: Prominent accept/decline buttons

## Mobile Optimization

- Bottom navigation for easy thumb access
- Swipe-friendly horizontal scrolling in comparison view
- Large touch targets for buttons
- Optimized card layouts for mobile screens
- Responsive grid system

## Tips for Customers (Built-in)

The app provides helpful guidance:
- Consider not just price, but also rating and experience
- Review plumber's notes for additional value
- Check completion time estimates
- Verify plumber certification status
- Message plumbers before accepting

## Future Enhancements

Potential additions:
- Filter by availability
- Filter by certification type
- Save favorite plumbers
- Request clarifications on quotes
- Counter-offer capability
- Schedule preferred time slots
- Read plumber reviews
- View plumber portfolio/photos

## Testing the Feature

### To test the quote comparison:
1. Navigate to Home screen as a customer
2. Notice the green quote notification banner (shows "4 new quotes")
3. Click the banner to view Quote Comparison
4. Try different sorting options (Price, Rating, Time)
5. Switch between List and Side-by-Side views
6. Click "View Details & Accept" on any quote
7. Review the detailed quote information
8. Use Back button to return to comparison
9. Click "Continue to Payment" to proceed to payment screen
10. Complete payment details and submit
11. Watch success animation and auto-redirect to Job Tracker
12. Or use Back button at any step to return

## Integration Points

### With Other Components:
- **Home**: Entry point via notification
- **JobTracker**: Exit point after acceptance
- **DiagnosticResult**: Could trigger quote requests
- **UserDashboard**: Could show quote history

### With Backend (Future):
- Real-time quote updates
- Plumber availability checking
- Quote expiration handling
- Plumber notification system
- Quote acceptance confirmation
