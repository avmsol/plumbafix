import { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, Clock, CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import DatePicker from './DatePicker';
import type { Screen } from '../App';

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

interface BookingConfirmationProps {
  onNavigate: (screen: Screen) => void;
  quote: PlumberQuote;
  currentAddress: string;
  onConfirmBooking: (bookingDetails: {
    address: string;
    date: Date;
    timeSlot: string;
  }) => void;
  onSetReturnScreen: (screen: Screen) => void;
}

const timeSlots = [
  { id: '1', time: '9:00 AM - 11:00 AM', available: true },
  { id: '2', time: '11:00 AM - 1:00 PM', available: true },
  { id: '3', time: '1:00 PM - 3:00 PM', available: false },
  { id: '4', time: '3:00 PM - 5:00 PM', available: true },
  { id: '5', time: '5:00 PM - 7:00 PM', available: true },
];

export default function BookingConfirmation({ onNavigate, quote, currentAddress, onConfirmBooking, onSetReturnScreen }: BookingConfirmationProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const handleContinue = () => {
    if (selectedDate && selectedTimeSlot) {
      onConfirmBooking({
        address: currentAddress,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
      });
    }
  };

  const isFormValid = selectedDate && selectedTimeSlot;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="h-full w-full flex flex-col bg-[#F4F8FB] relative overflow-hidden">
      {/* Header */}
      <div className="bg-white p-6 lg:p-8 pt-16 lg:pt-8 border-b border-gray-100 flex-shrink-0">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onNavigate('customer-quote-review')}
            className="mb-4"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl lg:text-3xl mb-2">Confirm Booking</h1>
          <p className="text-gray-600">Choose your preferred date and time</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-28 lg:pb-8">
        <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
          
          {/* Plumber Summary */}
          <Card className="p-5 border-gray-100 bg-white">
            <div className="flex items-center gap-4">
              <img 
                src={quote.plumber.photo} 
                alt={quote.plumber.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-green-100"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg">{quote.plumber.name}</h3>
                  {quote.plumber.verified && (
                    <CheckCircle2 className="w-4 h-4 text-[#00C853]" />
                  )}
                </div>
                <p className="text-sm text-gray-600">{quote.issueType}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl text-[#00C853]">${quote.quote.totalCost}</p>
                <p className="text-xs text-gray-500">Total Cost</p>
              </div>
            </div>
          </Card>

          {/* Service Address */}
          <Card className="overflow-hidden border-gray-100">
            <div className="bg-gradient-to-br from-blue-50 to-white p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#007AFF]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#007AFF]" />
                  </div>
                  <div>
                    <h3 className="mb-1">Service Address</h3>
                    <p className="text-gray-700">{currentAddress}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    onSetReturnScreen('booking-confirmation');
                    onNavigate('address-select');
                  }}
                  className="text-[#007AFF] hover:bg-blue-100"
                >
                  Change
                </Button>
              </div>
              
              <div className="bg-blue-100/50 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-[#007AFF] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">
                  Please ensure someone is available at this address during the selected time slot.
                </p>
              </div>
            </div>
          </Card>

          {/* Date Selection */}
          <Card className="overflow-hidden border-gray-100">
            <div className="bg-white p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#00C853]" />
                </div>
                <div className="flex-1">
                  <h3>Select Date</h3>
                  <p className="text-sm text-gray-600">Choose your preferred service date</p>
                </div>
                {selectedDate && (
                  <button
                    onClick={() => setShowCalendarModal(true)}
                    className="text-sm text-[#007AFF] hover:underline"
                  >
                    Change
                  </button>
                )}
              </div>

              {selectedDate ? (
                <div className="bg-gradient-to-br from-green-50 to-white border-2 border-green-200 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#00C853] rounded-xl flex flex-col items-center justify-center text-white">
                      <span className="text-xs">{selectedDate.toLocaleDateString('en-US', { month: 'short' })}</span>
                      <span className="text-lg leading-none">{selectedDate.getDate()}</span>
                    </div>
                    <div>
                      <p className="text-gray-900">{formatDate(selectedDate)}</p>
                      <p className="text-sm text-green-600">✓ Date selected</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center">
                  <DatePicker
                    selectedDate={selectedDate}
                    onSelect={(date) => setSelectedDate(date)}
                    onCancel={() => {}}
                    minDate={new Date()}
                    showCancelButton={false}
                  />
                </div>
              )}
            </div>
          </Card>

          {/* Time Slot Selection */}
          {selectedDate && (
            <Card className="overflow-hidden border-gray-100">
              <div className="bg-white p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3>Select Time Slot</h3>
                    <p className="text-sm text-gray-600">Available slots for {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => slot.available && setSelectedTimeSlot(slot.time)}
                      disabled={!slot.available}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        !slot.available
                          ? 'bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed'
                          : selectedTimeSlot === slot.time
                          ? 'bg-gradient-to-br from-purple-50 to-white border-purple-400 shadow-sm'
                          : 'bg-white border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedTimeSlot === slot.time
                              ? 'border-purple-600 bg-purple-600'
                              : 'border-gray-300'
                          }`}>
                            {selectedTimeSlot === slot.time && (
                              <CheckCircle2 className="w-3 h-3 text-white fill-white" />
                            )}
                          </div>
                          <div>
                            <p className="text-gray-900">{slot.time}</p>
                            {!slot.available && (
                              <p className="text-xs text-gray-500">Not available</p>
                            )}
                          </div>
                        </div>
                        {slot.available && selectedTimeSlot !== slot.time && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Available
                          </Badge>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* Booking Summary */}
          {isFormValid && (
            <Card className="p-5 border-green-100 bg-gradient-to-br from-green-50 to-white">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#00C853]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-[#00C853]" />
                </div>
                <div>
                  <h3 className="mb-2">Booking Summary</h3>
                  <div className="space-y-1.5 text-sm text-gray-700">
                    <p><span className="text-gray-600">Service:</span> {quote.issueType}</p>
                    <p><span className="text-gray-600">Plumber:</span> {quote.plumber.name}</p>
                    <p><span className="text-gray-600">Date:</span> {selectedDate && formatDate(selectedDate)}</p>
                    <p><span className="text-gray-600">Time:</span> {selectedTimeSlot}</p>
                    <p><span className="text-gray-600">Location:</span> {currentAddress}</p>
                  </div>
                </div>
              </div>
            </Card>
          )}

        </div>
      </div>

      {/* Bottom Action - Mobile */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 lg:hidden">
        <Button 
          onClick={handleContinue}
          disabled={!isFormValid}
          className="w-full h-12 bg-[#007AFF] hover:bg-[#0051D5] rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Payment
        </Button>
      </div>

      {/* Bottom Action - Desktop */}
      <div className="hidden lg:block bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto p-6 lg:p-8">
          <Button 
            onClick={handleContinue}
            disabled={!isFormValid}
            className="w-full h-14 bg-[#007AFF] hover:bg-[#0051D5] rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue to Payment
          </Button>
        </div>
      </div>

      {/* Calendar Modal - for changing date */}
      {showCalendarModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <DatePicker
            selectedDate={selectedDate}
            onSelect={(date) => {
              setSelectedDate(date);
              setShowCalendarModal(false);
            }}
            onCancel={() => setShowCalendarModal(false)}
            minDate={new Date()}
            showCancelButton={true}
          />
        </div>
      )}
    </div>
  );
}
