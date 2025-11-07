import { ArrowLeft, Search, Plus, MapPin, Home as HomeIcon, Briefcase, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import type { Screen } from '../App';

interface AddressSelectProps {
  onNavigate: (screen: Screen) => void;
  onAddressSelect?: (address: string) => void;
  returnScreen?: Screen;
}

const savedAddresses = [
  {
    id: '1',
    label: 'Home',
    icon: HomeIcon,
    distance: '0 m',
    address: '2014, Pine Street, Downtown, Seattle, WA 98101, United States',
    phone: '+1 (555) 123-4567',
  },
  {
    id: '2',
    label: 'Work',
    icon: Briefcase,
    distance: '3.2 mi',
    address: '1500, 4th Avenue, Pioneer Square, Seattle, WA 98134, United States',
    phone: '+1 (555) 123-4567',
  },
  {
    id: '3',
    label: 'Home',
    icon: HomeIcon,
    distance: '5.8 mi',
    address: '8801, Lake City Way NE, Maple Leaf, Seattle, WA 98115, United States',
    phone: '+1 (555) 987-6543',
  },
];

export default function AddressSelect({ onNavigate, onAddressSelect, returnScreen = 'home' }: AddressSelectProps) {
  const handleAddressClick = (address: string) => {
    if (onAddressSelect) {
      onAddressSelect(address);
    }
    onNavigate(returnScreen);
  };

  return (
    <div className="h-full flex flex-col bg-[#F4F8FB]">
      {/* Header */}
      <div className="bg-white p-6 pt-16 border-b border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onNavigate(returnScreen)}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl">Select a location</h1>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input 
            placeholder="Search for area, street name..."
            className="pl-12 h-12 rounded-xl border-gray-200 bg-gray-50"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Add Address */}
        <div 
          className="m-6 mb-4 cursor-pointer"
          onClick={() => onNavigate('add-address')}
        >
          <Card className="p-4 hover:shadow-md transition-shadow border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#007AFF]/10 rounded-full flex items-center justify-center">
                  <Plus className="w-5 h-5 text-[#007AFF]" />
                </div>
                <span className="text-[#007AFF]">Add address</span>
              </div>
              <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180" />
            </div>
          </Card>
        </div>

        {/* Current Location */}
        <Card 
          className="mx-6 mb-6 p-4 cursor-pointer hover:shadow-md transition-shadow border-gray-100"
          onClick={() => handleAddressClick('Downtown, Seattle')}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[#007AFF]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-[#007AFF]" />
            </div>
            <div className="flex-1">
              <p className="text-[#007AFF] mb-1">Use your current location</p>
              <p className="text-sm text-gray-500">Downtown, Seattle, WA 98101, United States</p>
            </div>
          </div>
        </Card>

        {/* Saved Addresses Section */}
        <div className="px-6">
          <h2 className="text-sm text-gray-400 mb-4 text-center">SAVED ADDRESSES</h2>
          
          <div className="space-y-4">
            {savedAddresses.map((address) => (
              <div key={address.id}>
                <Card 
                  className="p-4 border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleAddressClick(address.address)}
                >
                  <div className="flex gap-3">
                    {/* Icon and Distance Column */}
                    <div className="flex flex-col items-center gap-1 flex-shrink-0 pt-1">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <address.icon className="w-5 h-5 text-gray-600" />
                      </div>
                      <span className="text-xs text-gray-500">{address.distance}</span>
                    </div>
                    
                    {/* Content Column */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-900 mb-2">{address.label}</h3>
                      <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                        {address.address}
                      </p>
                      <p className="text-sm text-gray-500">
                        Phone number: {address.phone}
                      </p>
                    </div>

                    {/* Three Dots Menu */}
                    <div className="flex-shrink-0">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button 
                            className="text-[#007AFF] hover:text-[#0051D5] transition-colors p-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem 
                            className="cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigate('add-address');
                            }}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Address
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="cursor-pointer text-red-600 focus:text-red-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle delete address
                            }}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Address
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Spacing */}
        <div className="h-6" />
      </div>
    </div>
  );
}
