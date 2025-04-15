
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Search, Calendar as CalendarIcon, Users } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

const SearchBar = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>();
  const [guests, setGuests] = useState('1');

  const handleSearch = () => {
    // Prepare search parameters
    const params = new URLSearchParams();
    if (destination) params.append('destination', destination);
    if (checkInDate) params.append('checkIn', format(checkInDate, 'yyyy-MM-dd'));
    if (checkOutDate) params.append('checkOut', format(checkOutDate, 'yyyy-MM-dd'));
    params.append('guests', guests);

    // Navigate to hotels page with search parameters
    navigate(`/hotels?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1 md:col-span-1">
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
            Destination
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              id="destination"
              placeholder="Where are you going?"
              className="pl-10"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
        </div>

        <div className="col-span-1 md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Check-in
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !checkInDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkInDate ? format(checkInDate, 'PP') : <span>Select date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 pointer-events-auto">
              <Calendar
                mode="single"
                selected={checkInDate}
                onSelect={setCheckInDate}
                initialFocus
                disabled={(date) => date < new Date()}
                className="p-3"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="col-span-1 md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Check-out
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !checkOutDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkOutDate ? format(checkOutDate, 'PP') : <span>Select date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 pointer-events-auto">
              <Calendar
                mode="single"
                selected={checkOutDate}
                onSelect={setCheckOutDate}
                initialFocus
                disabled={(date) => date < (checkInDate || new Date())}
                className="p-3"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="col-span-1 md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Guests
          </label>
          <div className="flex space-x-2">
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger className="flex-1">
                <Users className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Guests" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              onClick={handleSearch} 
              className="bg-hotel-primary hover:bg-hotel-primary/90 text-white"
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
