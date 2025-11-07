# Payment Flow Guide - PlumbaFix

## Overview
The payment flow ensures secure transactions before booking a plumber. Users must complete payment before the job is confirmed and tracked.

## User Journey

### Complete Flow
```
Quote Comparison
  ↓
Quote Review (detailed view)
  ↓ (Click "Continue to Payment")
Payment Screen
  ↓ (Complete payment)
Job Tracker (with confirmed booking)
```

## Payment Screen Features

### Layout
The payment screen uses a **two-column layout** on desktop:
- **Left Column (2/3)**: Payment methods and forms
- **Right Column (1/3)**: Booking summary (sticky)

On mobile, it stacks vertically with a fixed bottom payment button.

### Security Features

#### Visual Security Indicators
- 🔒 **Lock Icons**: Throughout the interface
- 🛡️ **Shield Badge**: "Secure & Encrypted" in header
- 💳 **Security Banner**: Prominent green banner at top
- ✅ **Trust Messages**: "Payment held until job completion"

#### Technical Security (Mock)
In production, this would include:
- SSL/TLS encryption
- PCI DSS compliance
- Tokenization of card details
- 3D Secure authentication
- Fraud detection

### Payment Methods

#### 1. Credit/Debit Card
**Supported Cards:**
- Visa
- Mastercard
- RuPay

**Required Fields:**
- Card Number (16 digits, auto-formatted with spaces)
- Cardholder Name
- Expiry Date (MM/YY format, auto-formatted)
- CVV (3 digits, password masked)

**Validation:**
- Card number must be 16 digits
- Expiry date format MM/YY
- CVV must be 3 digits
- All fields required

**Auto-Formatting:**
- Card number: `1234 5678 9012 3456`
- Expiry: `MM/YY` format with auto-slash insertion

#### 2. UPI Payment
**Supported Apps:**
- Google Pay
- PhonePe
- Paytm
- Any UPI app

**Required:**
- UPI ID (e.g., `user@paytm`, `9876543210@ybl`)

**In Production:**
- QR code generation
- Intent-based payment
- Real-time verification

#### 3. Wallet
**Supported Wallets:**
- Paytm Wallet
- PhonePe Wallet
- Other digital wallets

**Flow:**
- Redirects to wallet provider
- User authenticates
- Returns to app with payment status

### Booking Summary (Sidebar)

#### Plumber Information
- Profile photo
- Name
- Rating (⭐ stars)
- Verification badge (if verified)

#### Service Details
- Issue type
- Estimated completion time

#### Cost Breakdown
1. **Labor Cost**: Base plumber charges
2. **Parts & Materials**: Component costs
3. **Service Fee**: 5% platform fee
4. **GST**: 18% goods and services tax
5. **Total Amount**: Sum of all above

**Example Calculation:**
```
Labor Cost:           $85
Parts & Materials:    $40
Subtotal:            $125
Service Fee (5%):      $6
GST (18%):           $24
─────────────────────────
Total Amount:        $155
```

### Payment Processing

#### Validation Steps
1. Check payment method selected
2. Validate payment details:
   - Card: All fields filled, correct format
   - UPI: Valid UPI ID entered
   - Wallet: Terms accepted
3. Verify terms and conditions checkbox
4. Show error alerts if validation fails

#### Processing Flow
```javascript
1. User clicks "Pay & Book"
2. Validate all inputs
3. Show processing state (button disabled with spinner)
4. Simulate API call (2 second delay)
5. Show success dialog
6. Auto-redirect to Job Tracker (2 seconds)
7. Create job with all details
```

#### Success Dialog
**Features:**
- ✅ Animated success icon (pulsing green circle)
- Confirmation message
- "Redirecting..." status with spinner
- Auto-close and navigation

### Terms and Conditions

**Required Checkbox:**
Users must agree to:
- Terms & Conditions
- Cancellation Policy
- Payment hold understanding

**Key Points:**
- Payment held securely
- Released to plumber after job completion
- Cancellation policies apply
- Refund terms

### Error Handling

**Validation Errors:**
- "Please accept the terms and conditions"
- "Please fill in all card details"
- "Please enter a valid card number"
- "Please enter a valid CVV"
- "Please enter your UPI ID"

**In Production:**
Additional errors would include:
- Card declined
- Insufficient funds
- Network timeout
- Payment gateway errors
- Bank authentication failures

## Component Structure

### PaymentScreen.tsx

**State Management:**
```typescript
- paymentMethod: 'card' | 'upi' | 'wallet'
- cardNumber: string (auto-formatted)
- cardName: string
- expiryDate: string (MM/YY)
- cvv: string (masked)
- upiId: string
- agreeToTerms: boolean
- isProcessing: boolean
- showSuccessDialog: boolean
```

**Props:**
```typescript
{
  onNavigate: (screen: Screen) => void;
  quote: PlumberQuote;
  onPaymentComplete: () => void;
}
```

**Key Functions:**
- `formatCardNumber()`: Adds spaces every 4 digits
- `formatExpiryDate()`: Auto-formats to MM/YY
- `handleCardNumberChange()`: Validates and formats input
- `handleExpiryChange()`: Formats expiry date
- `handleCvvChange()`: Limits to 3 digits
- `handlePayment()`: Validates and processes payment

## Integration with App Flow

### Navigation States
```typescript
// App.tsx navigation
'customer-quote-review' → (Accept) → 'payment' → (Success) → 'job-tracker'
'payment' → (Back) → 'customer-quote-review'
```

### Job Creation
After successful payment:
```typescript
const newJob: JobData = {
  id: 'job-' + Date.now(),
  issueType: quote.issueType,
  date: new Date().toLocaleDateString(),
  cost: quote.quote.totalCost,
  status: 'accepted',
  plumber: { /* quote plumber details */ },
  address: selectedAddress,
  baseFee: quote.quote.laborCost,
  travelFee: 0,
  eta: 30,
};
```

## Design System Compliance

### Colors
- **Primary Blue**: `#007AFF` (buttons, accents)
- **Success Green**: `#00C853` (pay button, success states)
- **Background**: `#F4F8FB` (main background)
- **White**: Card backgrounds
- **Gray**: Text, borders, disabled states

### Components Used
- ✅ Button (primary, outline variants)
- ✅ Card (with borders and shadows)
- ✅ Badge (verification, status)
- ✅ Avatar (plumber photo)
- ✅ Input (with labels)
- ✅ Label (form fields)
- ✅ RadioGroup (payment method selection)
- ✅ Checkbox (terms acceptance)

### Spacing & Layout
- **Padding**: Consistent 6/8 spacing
- **Rounded Corners**: `rounded-2xl` (buttons), `rounded-xl` (cards, inputs)
- **Shadows**: Soft shadows on cards
- **Gaps**: `gap-6` between sections

### Responsive Design
- **Mobile**: Single column, bottom fixed button
- **Desktop**: Two columns (2:1 ratio), sticky sidebar
- **Breakpoint**: `lg:` prefix for desktop styles

## Testing the Payment Flow

### Test Cards (Mock)
Any 16-digit number works in mock mode:
- `4111 1111 1111 1111` (Visa)
- `5555 5555 5555 4444` (Mastercard)
- `6011 1111 1111 1117` (Discover)

### Test UPI IDs
Any valid format works:
- `user@paytm`
- `9876543210@ybl`
- `name@okaxis`

### Test Flow
1. Select a quote from comparison
2. Review quote details
3. Click "Continue to Payment"
4. Select payment method
5. Fill in payment details
6. Check terms and conditions
7. Click "Pay & Book"
8. Watch processing animation
9. See success dialog
10. Auto-redirect to Job Tracker

## Future Enhancements

### Payment Features
- [ ] Save card for future use
- [ ] Multiple saved payment methods
- [ ] Auto-fill from saved methods
- [ ] Apple Pay / Google Pay integration
- [ ] EMI options for large amounts
- [ ] Promotional codes / discounts
- [ ] PlumbaFix credits redemption

### Security Enhancements
- [ ] Real payment gateway integration (Stripe, Razorpay)
- [ ] 3D Secure authentication
- [ ] Biometric authentication
- [ ] Transaction PIN
- [ ] SMS/Email OTP verification
- [ ] Fraud detection
- [ ] Address verification

### User Experience
- [ ] Payment history
- [ ] Download receipt
- [ ] Email confirmation
- [ ] SMS confirmation
- [ ] Real-time payment status
- [ ] Failed payment retry
- [ ] Alternative payment suggestions

### Business Features
- [ ] Invoice generation
- [ ] Tax calculation by location
- [ ] Dynamic service fees
- [ ] Surge pricing
- [ ] Loyalty program integration
- [ ] Referral discounts

## Backend Integration (Future)

### API Endpoints Needed
```typescript
POST /api/payments/initiate
{
  quoteId: string;
  paymentMethod: string;
  amount: number;
}

POST /api/payments/process
{
  paymentId: string;
  paymentDetails: PaymentDetails;
}

GET /api/payments/status/:paymentId

POST /api/payments/verify
{
  paymentId: string;
  otp?: string;
}

GET /api/payments/receipt/:paymentId
```

### Webhooks
- Payment success notification
- Payment failure notification
- Refund processed
- Chargeback notification

### Database Schema
```sql
payments:
  - id
  - user_id
  - quote_id
  - job_id
  - amount
  - service_fee
  - tax
  - total_amount
  - payment_method
  - payment_status
  - transaction_id
  - created_at
  - updated_at
  - payment_gateway_response
```

## Compliance & Legal

### Requirements (Production)
- PCI DSS Level 1 compliance
- Data encryption at rest and in transit
- Secure key management
- Regular security audits
- Privacy policy compliance
- Terms of service
- Refund policy
- Dispute resolution process

### User Data Protection
- Never store CVV
- Tokenize card numbers
- Encrypt sensitive data
- Log access to payment data
- Implement data retention policies
- GDPR/CCPA compliance
- Right to be forgotten

## Troubleshooting

### Common Issues

**Payment button disabled:**
- Check if terms and conditions are checked
- Verify all payment fields are filled
- Ensure payment method is selected

**Validation errors:**
- Card number must be 16 digits
- Expiry date format must be MM/YY
- CVV must be 3 digits
- UPI ID must contain @

**Processing stuck:**
- Check network connection
- Verify API endpoints (in production)
- Check browser console for errors

## Best Practices

### UX Best Practices
- ✅ Auto-format input fields
- ✅ Clear error messages
- ✅ Loading states during processing
- ✅ Success confirmation
- ✅ Prevent double submission
- ✅ Show total amount in button
- ✅ Sticky summary on desktop
- ✅ Mobile-optimized input fields

### Security Best Practices
- ✅ HTTPS only
- ✅ Input validation
- ✅ Mask sensitive data (CVV)
- ✅ Clear messaging about security
- ✅ Terms acceptance required
- ✅ Timeout for inactive sessions
- ✅ Audit trail of all transactions

### Development Best Practices
- ✅ Separate payment logic
- ✅ Reusable components
- ✅ Type safety (TypeScript)
- ✅ Error boundaries
- ✅ Accessibility compliance
- ✅ Responsive design
- ✅ Clean code structure
