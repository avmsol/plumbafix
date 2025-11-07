# Booking Flow Guide

## Overview
Complete booking flow from quote acceptance to job tracking with address confirmation, date/time selection, payment processing, and success confirmation.

## Flow Sequence

### 1. Quote Review → Booking Confirmation
**File:** `/components/CustomerQuoteReview.tsx`
- Customer reviews the selected quote
- Clicks "Continue" button
- Navigates to `booking-confirmation` screen

### 2. Booking Confirmation
**File:** `/components/BookingConfirmation.tsx`

**Features:**
- **Address Confirmation:**
  - Displays current selected address
  - Option to change address (links to address-select screen)
  - Alert reminder to ensure someone is available

- **Date Selection:**
  - Interactive calendar component
  - Prevents selection of past dates
  - Shows selected date in a card format
  - Click to change date

- **Time Slot Selection:**
  - Shows available time slots for selected date
  - Visual indication of:
    - Available slots (with "Available" badge)
    - Unavailable slots (disabled/grayed out)
    - Selected slot (highlighted with purple accent)
  - Pre-configured slots:
    - 9:00 AM - 11:00 AM
    - 11:00 AM - 1:00 PM
    - 1:00 PM - 3:00 PM (example: unavailable)
    - 3:00 PM - 5:00 PM
    - 5:00 PM - 7:00 PM

- **Booking Summary:**
  - Appears when both date and time are selected
  - Shows complete booking details:
    - Service type
    - Plumber name
    - Date and time
    - Location
  - Green confirmation styling

- **Validation:**
  - "Continue to Payment" button disabled until both date and time are selected
  - Clear visual feedback for form completion

**Navigation:**
- Back button → Returns to `customer-quote-review`
- Continue button → Proceeds to `payment` screen with booking details

### 3. Payment Screen
**File:** `/components/PaymentScreen.tsx`
- Existing payment wall implementation
- Displays booking details
- Multiple payment methods
- On successful payment → navigates to `payment-success`

### 4. Payment Success
**File:** `/components/PaymentSuccess.tsx`

**Features:**
- **Success Animation:**
  - Animated checkmark icon
  - Confetti effect (3 seconds)
  - Green gradient background pulse

- **Booking Confirmation:**
  - Unique booking ID (format: PBF-XXXXXX)
  - Success message and status badge

- **Plumber Card:**
  - Plumber photo with verified badge
  - Notification message
  - Reassurance text

- **Detailed Booking Information:**
  - Service type with icon
  - Date (formatted as "Monday, October 28, 2025")
  - Time slot
  - Service address
  - Amount paid with payment method

- **Next Steps Section:**
  - SMS/Email confirmation
  - Real-time tracking
  - Direct chat with plumber
  - Rating reminder

- **Action Buttons:**
  - Primary: "Track Your Booking" → job-tracker screen
  - Secondary: "Back to Home" → home screen

- **Support Information:**
  - Email: support@plumbafix.com
  - Phone: 1-800-PLUMBAFIX

**Navigation:**
- "Track Your Booking" → Creates job object and navigates to `job-tracker`
- "Back to Home" → Returns to `home` screen

### 5. Job Tracker
**File:** `/components/JobTracker.tsx`
- Existing job tracking implementation
- Real-time plumber location
- Job status updates
- Chat functionality

## Complete User Journey

```
Quote Comparison
    ↓
Customer Quote Review
    ↓ (Continue)
Booking Confirmation
    ├── Select/Confirm Address
    ├── Choose Date
    └── Choose Time Slot
    ↓ (Continue to Payment)
Payment Screen
    ├── Review booking details
    ├── Select payment method
    └── Complete payment
    ↓ (Payment Successful)
Payment Success Screen
    ├── View confirmation
    ├── See booking details
    └── Read next steps
    ↓ (Track Your Booking)
Job Tracker
    ├── Real-time tracking
    ├── Status updates
    └── Communication with plumber
```

## State Management

**App.tsx State:**
- `selectedCustomerQuoteId`: Tracks which quote was selected
- `selectedCustomerQuote`: Full quote object
- `bookingDetails`: Object containing:
  - `address`: Service address
  - `date`: Selected date (Date object)
  - `timeSlot`: Selected time slot string
- `currentJob`: Job object created after successful payment
- `selectedAddress`: Current user address

## Screen Types Added

```typescript
export type Screen = 
  // ... existing screens
  | 'booking-confirmation'
  | 'payment-success';
```

## Component Props

### BookingConfirmation
```typescript
interface BookingConfirmationProps {
  onNavigate: (screen: Screen) => void;
  quote: PlumberQuote;
  currentAddress: string;
  onConfirmBooking: (bookingDetails: {
    address: string;
    date: Date;
    timeSlot: string;
  }) => void;
}
```

### PaymentSuccess
```typescript
interface PaymentSuccessProps {
  onNavigate: (screen: Screen) => void;
  quote: PlumberQuote;
  bookingDetails: BookingDetails;
  onContinueToTracking: () => void;
}
```

## Design System

**Colors:**
- Primary Blue: `#007AFF`
- Success Green: `#00C853`
- Background: `#F4F8FB`
- Purple Accent: Used for time slots
- Orange Accent: Used for time icons

**Components Used:**
- ShadCN Calendar component
- Custom time slot selector
- Responsive cards with gradients
- Icon-based visual hierarchy

## Mobile Optimization

- Fixed bottom action bar on mobile
- Responsive padding (pb-28 for mobile, pb-8 for desktop)
- Touch-friendly button sizes (h-12 mobile, h-14 desktop)
- Calendar modal for date selection
- Scrollable content areas

## Future Enhancements

1. **Dynamic Time Slots:**
   - Fetch available slots from plumber's calendar
   - Real-time availability updates
   - Buffer time between appointments

2. **Address Autocomplete:**
   - Integration with Google Places API
   - Address validation
   - Geolocation support

3. **Rescheduling:**
   - Edit booking from success screen
   - Reschedule from job tracker
   - Cancellation flow

4. **Notifications:**
   - Push notifications for booking confirmation
   - SMS reminders
   - Email receipts

5. **Calendar Integration:**
   - Add to Apple Calendar
   - Add to Google Calendar
   - Export .ics file

## Testing Checklist

- [ ] Can select future dates only
- [ ] Can select available time slots only
- [ ] Form validation prevents proceeding without selections
- [ ] Back navigation preserves state
- [ ] Payment success shows correct details
- [ ] Booking ID is unique
- [ ] Job tracker receives correct job data
- [ ] Mobile responsive on all screens
- [ ] Calendar modal works correctly
- [ ] Address change navigation works
