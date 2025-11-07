import { ArrowLeft, Search, MapPin, Phone, Home as HomeIcon, Briefcase, MapPinned, ImageIcon, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useState } from 'react';
import type { Screen } from '../App';

interface AddAddressFormProps {
  onNavigate: (screen: Screen) => void;
  editAddress?: {
    label: string;
    address: string;
    phone: string;
  } | null;
}

export default function AddAddressForm({ onNavigate, editAddress }: AddAddressFormProps) {
  const [selectedType, setSelectedType] = useState<'home' | 'work' | 'other'>(
    editAddress ? 'home' : 'home'
  );
  const [addressDetails, setAddressDetails] = useState('');
  const [receiverName] = useState('Gautam Kumar');
  const [receiverPhone] = useState('7001685402');

  const handleSaveAddress = () => {
    // Save address logic
    onNavigate('address-select');
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onNavigate('address-select')}
            className="p-0 h-auto hover:bg-transparent"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </Button>
          
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
            <Input 
              placeholder="Search..."
              className="pl-12 h-11 rounded-lg border-gray-200 bg-white"
            />
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Map */}
        <div className="h-56 relative bg-gray-100">
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 relative">
            {/* Map Grid Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-6 grid-rows-6 h-full w-full">
                {[...Array(36)].map((_, i) => (
                  <div key={i} className="border border-gray-300" />
                ))}
              </div>
            </div>
            
            {/* Center Pin */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full">
              <MapPin className="w-10 h-10 text-red-500" fill="#EF4444" />
            </div>

            {/* Use Current Location Button */}
            <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 border border-gray-200 hover:bg-gray-50 transition-colors mt-8">
              <MapPinned className="w-4 h-4 text-red-500" />
              <span className="text-red-500 text-sm">Use current location</span>
            </button>

            {/* Google Maps Attribution */}
            <div className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded text-[10px] text-gray-500 shadow">
              Google
            </div>
          </div>
        </div>

        {/* Selected Address Card */}
        <div className="px-6 py-4 bg-white border-b border-gray-100">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
            <div className="flex-1 min-w-0">
              <p className="text-gray-900 mb-1">Windsor Apartment, <span className="text-gray-600">Datta Mandir</span></p>
              <p className="text-sm text-gray-500">
                Road,Shankar Kalat Nagar,Wakad,Pimpri-Chinchwad
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
          </div>
        </div>

        {/* Form Fields */}
        <div className="px-6 py-6 space-y-6">
          {/* Address Details */}
          <div>
            <Label htmlFor="address-details" className="text-gray-600 text-sm mb-2 block">
              Address details*
            </Label>
            <Input
              id="address-details"
              placeholder="E.g. Floor, Flat no., Tower"
              value={addressDetails}
              onChange={(e) => setAddressDetails(e.target.value)}
              className="h-12 rounded-lg border-gray-200 bg-white text-gray-400"
            />
          </div>

          {/* Receiver Details */}
          <div>
            <h3 className="text-gray-600 text-sm mb-3">Receiver details for this address</h3>
            
            <div className="border border-gray-200 rounded-lg p-4 bg-white hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <p className="text-gray-900">{receiverName}, {receiverPhone}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Save Address As */}
          <div>
            <h3 className="text-gray-600 text-sm mb-3">Save address as</h3>
            
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedType('home')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-colors ${
                  selectedType === 'home'
                    ? 'border-red-500 bg-red-50 text-red-500'
                    : 'border-gray-200 bg-white text-gray-600'
                }`}
              >
                <HomeIcon className="w-5 h-5" />
                <span>Home</span>
              </button>

              <button
                onClick={() => setSelectedType('work')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-colors ${
                  selectedType === 'work'
                    ? 'border-red-500 bg-red-50 text-red-500'
                    : 'border-gray-200 bg-white text-gray-600'
                }`}
              >
                <Briefcase className="w-5 h-5" />
                <span>Work</span>
              </button>

              <button
                onClick={() => setSelectedType('other')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-colors ${
                  selectedType === 'other'
                    ? 'border-red-500 bg-red-50 text-red-500'
                    : 'border-gray-200 bg-white text-gray-600'
                }`}
              >
                <MapPin className="w-5 h-5" />
                <span>Other</span>
              </button>
            </div>
          </div>

          {/* Door/Building Image */}
          <div>
            <h3 className="text-gray-600 text-sm mb-3">Door/building image (optional)</h3>
            
            <button className="w-full border-2 border-dashed border-gray-200 rounded-lg p-8 bg-white hover:bg-gray-50 transition-colors">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-3">
                  <ImageIcon className="w-6 h-6 text-red-500" />
                </div>
                <p className="text-red-500 mb-2">Add an image</p>
                <p className="text-sm text-gray-500">
                  This helps our delivery partners find<br />your exact location faster
                </p>
              </div>
            </button>
          </div>

          {/* Bottom Spacing */}
          <div className="h-20" />
        </div>
      </div>

      {/* Save Button - Fixed at Bottom */}
      <div className="px-6 py-4 bg-white border-t border-gray-200">
        <Button 
          className="w-full h-12 bg-red-500 hover:bg-red-600 text-white rounded-lg"
          onClick={handleSaveAddress}
        >
          Save address
        </Button>
      </div>
    </div>
  );
}
