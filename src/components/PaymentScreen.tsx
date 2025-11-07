import { useState } from 'react';
import { ArrowLeft, CreditCard, Shield, Lock, CheckCircle2, DollarSign, User, Calendar, Clock, AlertCircle, Gift, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Slider } from './ui/slider';
import type { Screen, UserProfile } from '../App';

interface PlumberQuote {
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

interface PaymentScreenProps {
  onNavigate: (screen: Screen) => void;
  quote: PlumberQuote;
  onPaymentComplete: (creditsRedeemed: number) => void;
  userProfile: UserProfile;
}

export default function PaymentScreen({ onNavigate, quote, onPaymentComplete, userProfile }: PaymentScreenProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'apple' | 'venmo'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [venmoUsername, setVenmoUsername] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [creditsToRedeem, setCreditsToRedeem] = useState(0);

  // Calculate fees
  const serviceFee = Math.round(quote.quote.totalCost * 0.05); // 5% platform fee
  const subtotal = quote.quote.totalCost + serviceFee;
  const creditsDiscount = creditsToRedeem; // 1 credit = $1
  const afterCredits = Math.max(0, subtotal - creditsDiscount);
  const tax = Math.round(afterCredits * 0.08); // 8% Sales Tax (average) - applied after credits
  const totalAmount = afterCredits + tax;
  
  // Calculate max credits that can be redeemed (can't exceed subtotal)
  const maxCreditsRedeemable = Math.min(userProfile.credits, subtotal);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) { // 16 digits + 3 spaces
      setCardNumber(formatted);
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    if (formatted.length <= 5) {
      setExpiryDate(formatted);
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 4) { // Amex has 4-digit CVV
      setCvv(value);
    }
  };

  const handlePayment = () => {
    // Validation
    if (paymentMethod === 'card') {
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        alert('Please fill in all card details');
        return;
      }
      const cardDigits = cardNumber.replace(/\s/g, '').length;
      if (cardDigits !== 15 && cardDigits !== 16) {
        alert('Please enter a valid card number');
        return;
      }
      if (cvv.length < 3) {
        alert('Please enter a valid CVV');
        return;
      }
    } else if (paymentMethod === 'paypal') {
      if (!paypalEmail) {
        alert('Please enter your PayPal email');
        return;
      }
    } else if (paymentMethod === 'venmo') {
      if (!venmoUsername) {
        alert('Please enter your Venmo username');
        return;
      }
    }

    // Process payment
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccessDialog(true);
      
      // Auto-redirect after 2 seconds
      setTimeout(() => {
        onPaymentComplete(creditsToRedeem);
      }, 2000);
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col bg-[#F4F8FB] relative">
      {/* Header */}
      <div className="bg-white p-6 lg:p-8 pt-16 lg:pt-8 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onNavigate('customer-quote-review')}
            className="mb-4"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl mb-2">Secure Payment</h1>
              <p className="text-gray-600">Complete payment to book your plumber</p>
            </div>
            <div className="hidden lg:flex items-center gap-2 text-green-600">
              <Shield className="w-5 h-5" />
              <span className="text-sm">Secure & Encrypted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-32 lg:pb-8">
        <div className="p-6 lg:p-8 max-w-4xl mx-auto">
          
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Payment Form */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Security Banner */}
              <Card className="p-4 border-green-100 bg-gradient-to-r from-green-50 to-emerald-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Lock className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <strong className="text-green-900">100% Secure Payment</strong>
                    </p>
                    <p className="text-xs text-green-700">Your payment information is encrypted and secure</p>
                  </div>
                </div>
              </Card>

              {/* Credits Redemption */}
              {userProfile.credits > 0 && (
                <Card className="p-5 lg:p-6 border-gray-100 bg-gradient-to-br from-purple-50 to-blue-50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <Gift className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="flex items-center gap-2">
                        Redeem DIY Credits
                        <Sparkles className="w-4 h-4 text-yellow-500" />
                      </h3>
                      <p className="text-xs text-gray-600 mt-0.5">
                        You have <span className="text-purple-600">{userProfile.credits} credits</span> available • 1 credit = $1
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Label className="text-sm">Credits to Redeem</Label>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200">
                            ${creditsToRedeem} OFF
                          </Badge>
                        </div>
                      </div>
                      
                      <Slider
                        value={[creditsToRedeem]}
                        onValueChange={(value) => setCreditsToRedeem(value[0])}
                        max={maxCreditsRedeemable}
                        step={1}
                        className="mb-3"
                      />
                      
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>0 credits</span>
                        <span>{maxCreditsRedeemable} credits (max)</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setCreditsToRedeem(Math.min(25, maxCreditsRedeemable))}
                        className="flex-1 h-9 rounded-lg text-xs"
                        disabled={maxCreditsRedeemable < 25}
                      >
                        Use 25
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setCreditsToRedeem(Math.min(50, maxCreditsRedeemable))}
                        className="flex-1 h-9 rounded-lg text-xs"
                        disabled={maxCreditsRedeemable < 50}
                      >
                        Use 50
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setCreditsToRedeem(maxCreditsRedeemable)}
                        className="flex-1 h-9 rounded-lg text-xs"
                        disabled={maxCreditsRedeemable === 0}
                      >
                        Use Max
                      </Button>
                    </div>

                    {creditsToRedeem > 0 && (
                      <div className="p-3 bg-white rounded-lg border border-purple-200">
                        <div className="flex items-center gap-2 text-xs text-purple-700">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Saving ${creditsToRedeem} with DIY rewards!</span>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              )}

              {/* Payment Method Selection */}
              <Card className="p-5 lg:p-6 border-gray-100">
                <h3 className="mb-4">Select Payment Method</h3>
                
                <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                  <div className="space-y-3">
                    {/* Credit/Debit Card */}
                    <div 
                      className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'card' 
                          ? 'border-[#007AFF] bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <RadioGroupItem value="card" id="card" />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-[#007AFF]" />
                        </div>
                        <div className="flex-1">
                          <Label htmlFor="card" className="cursor-pointer">Credit / Debit Card</Label>
                          <p className="text-xs text-gray-500">Visa, Mastercard, Amex, Discover</p>
                        </div>
                      </div>
                    </div>

                    {/* PayPal */}
                    <div 
                      className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'paypal' 
                          ? 'border-[#007AFF] bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setPaymentMethod('paypal')}
                    >
                      <RadioGroupItem value="paypal" id="paypal" />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-lg">💳</span>
                        </div>
                        <div className="flex-1">
                          <Label htmlFor="paypal" className="cursor-pointer">PayPal</Label>
                          <p className="text-xs text-gray-500">Pay with your PayPal account</p>
                        </div>
                      </div>
                    </div>

                    {/* Apple Pay / Google Pay */}
                    <div 
                      className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'apple' 
                          ? 'border-[#007AFF] bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setPaymentMethod('apple')}
                    >
                      <RadioGroupItem value="apple" id="apple" />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-lg">📱</span>
                        </div>
                        <div className="flex-1">
                          <Label htmlFor="apple" className="cursor-pointer">Digital Wallet</Label>
                          <p className="text-xs text-gray-500">Apple Pay, Google Pay</p>
                        </div>
                      </div>
                    </div>

                    {/* Venmo */}
                    <div 
                      className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'venmo' 
                          ? 'border-[#007AFF] bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setPaymentMethod('venmo')}
                    >
                      <RadioGroupItem value="venmo" id="venmo" />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-lg">💸</span>
                        </div>
                        <div className="flex-1">
                          <Label htmlFor="venmo" className="cursor-pointer">Venmo</Label>
                          <p className="text-xs text-gray-500">Pay with Venmo</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </Card>

              {/* Payment Details Form */}
              {paymentMethod === 'card' && (
                <Card className="p-5 lg:p-6 border-gray-100">
                  <h3 className="mb-4">Card Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        className="mt-2 h-12 rounded-xl"
                      />
                      <div className="flex items-center gap-2 mt-2">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-5" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" className="h-5" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/57/Discover_Card_logo.svg" alt="Discover" className="h-5" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        placeholder="Name on card"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="mt-2 h-12 rounded-xl"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChange={handleExpiryChange}
                          className="mt-2 h-12 rounded-xl"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          type="password"
                          placeholder="123"
                          value={cvv}
                          onChange={handleCvvChange}
                          className="mt-2 h-12 rounded-xl"
                        />
                        <p className="text-xs text-gray-500 mt-1">3 or 4 digits</p>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {paymentMethod === 'paypal' && (
                <Card className="p-5 lg:p-6 border-gray-100">
                  <h3 className="mb-4">PayPal Details</h3>
                  
                  <div>
                    <Label htmlFor="paypalEmail">PayPal Email</Label>
                    <Input
                      id="paypalEmail"
                      type="email"
                      placeholder="your.email@example.com"
                      value={paypalEmail}
                      onChange={(e) => setPaypalEmail(e.target.value)}
                      className="mt-2 h-12 rounded-xl"
                    />
                    <p className="text-xs text-gray-500 mt-2">You'll be redirected to PayPal to complete your payment</p>
                  </div>
                  
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg flex items-center gap-3">
                    <div className="text-2xl">💳</div>
                    <p className="text-xs text-gray-700">
                      Your PayPal account will be securely linked to complete this transaction
                    </p>
                  </div>
                </Card>
              )}

              {paymentMethod === 'apple' && (
                <Card className="p-5 lg:p-6 border-gray-100">
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">📱</span>
                    </div>
                    <h3 className="mb-2">Digital Wallet Payment</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Use Apple Pay, Google Pay, or Samsung Pay to complete your payment securely
                    </p>
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="px-4 py-2 bg-black text-white rounded-lg text-sm">
                         Apple Pay
                      </div>
                      <div className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg text-sm">
                        G Pay
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      Click "Pay" to authorize payment with your default digital wallet
                    </p>
                  </div>
                </Card>
              )}

              {paymentMethod === 'venmo' && (
                <Card className="p-5 lg:p-6 border-gray-100">
                  <h3 className="mb-4">Venmo Details</h3>
                  
                  <div>
                    <Label htmlFor="venmoUsername">Venmo Username</Label>
                    <Input
                      id="venmoUsername"
                      placeholder="@username"
                      value={venmoUsername}
                      onChange={(e) => setVenmoUsername(e.target.value)}
                      className="mt-2 h-12 rounded-xl"
                    />
                    <p className="text-xs text-gray-500 mt-2">Enter your Venmo username (e.g., @john-doe)</p>
                  </div>
                  
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg flex items-center gap-3">
                    <div className="text-2xl">💸</div>
                    <p className="text-xs text-gray-700">
                      You'll be redirected to Venmo to confirm and complete your payment
                    </p>
                  </div>
                </Card>
              )}

            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Plumber Summary */}
              <Card className="p-5 border-gray-100 sticky top-6">
                <h3 className="mb-4">Booking Summary</h3>
                
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                  <Avatar className="w-12 h-12 border-2 border-white shadow">
                    <img src={quote.plumber.photo} alt={quote.plumber.name} className="w-full h-full object-cover" />
                  </Avatar>
                  <div className="flex-1">
                    <p className="mb-1">{quote.plumber.name}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <span>⭐</span>
                      <span>{quote.plumber.rating}</span>
                    </div>
                  </div>
                  {quote.plumber.verified && (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                      ✓ Verified
                    </Badge>
                  )}
                </div>

                <div className="space-y-3 mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Issue</p>
                      <p className="text-sm">{quote.issueType}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Est. Time</p>
                      <p className="text-sm">{quote.quote.estimatedTime} hours</p>
                    </div>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Labor Cost</span>
                    <span>${quote.quote.laborCost}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Parts & Materials</span>
                    <span>${quote.quote.partsCost}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Service Fee (5%)</span>
                    <span>${serviceFee}</span>
                  </div>

                  {creditsToRedeem > 0 && (
                    <>
                      <div className="h-px bg-gray-200 my-2" />
                      <div className="flex justify-between text-sm">
                        <span className="text-purple-600 flex items-center gap-1">
                          <Gift className="w-3.5 h-3.5" />
                          DIY Credits Applied
                        </span>
                        <span className="text-purple-600">-${creditsToRedeem}</span>
                      </div>
                    </>
                  )}

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Sales Tax (8%)</span>
                    <span>${tax}</span>
                  </div>

                  <div className="h-px bg-gray-200 my-3" />

                  <div className="flex justify-between items-center">
                    <span className="text-lg">Total Amount</span>
                    <div className="text-right">
                      {creditsToRedeem > 0 && (
                        <div className="text-xs text-gray-500 line-through mb-1">
                          ${quote.quote.totalCost + serviceFee + Math.round((quote.quote.totalCost + serviceFee) * 0.08)}
                        </div>
                      )}
                      <span className="text-2xl text-[#007AFF]">${totalAmount}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-gray-700 text-center">
                    💳 Payment is 100% secure and will be held until job completion
                  </p>
                </div>
              </Card>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Payment Button - Mobile */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-6 lg:hidden">
        <Button 
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full h-14 bg-[#00C853] hover:bg-green-700 rounded-2xl text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="w-5 h-5 mr-2" />
              Pay ${totalAmount}
            </>
          )}
        </Button>
      </div>

      {/* Bottom Payment Button - Desktop */}
      <div className="hidden lg:block bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto p-6 lg:p-8">
          <Button 
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full h-14 bg-[#00C853] hover:bg-green-700 rounded-2xl text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Processing Payment...
              </>
            ) : (
              <>
                <Lock className="w-5 h-5 mr-2" />
                Pay & Book Plumber - ${totalAmount}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Success Dialog */}
      {showSuccessDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <Card className="w-full max-w-md p-8 text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-[#00C853] to-green-600 rounded-full flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h2 className="text-2xl mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-4">
              Your booking is confirmed. Redirecting to job tracker...
            </p>
            
            {creditsToRedeem > 0 && (
              <div className="mb-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center justify-center gap-2 text-sm text-purple-700">
                  <Gift className="w-4 h-4" />
                  <span>You saved ${creditsToRedeem} with DIY Credits!</span>
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
            )}
            
            <div className="flex justify-center">
              <div className="w-8 h-8 border-3 border-[#007AFF] border-t-transparent rounded-full animate-spin" />
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
