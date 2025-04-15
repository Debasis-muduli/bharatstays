
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HotelCard, { HotelProps } from '@/components/HotelCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { MapPin, Filter, Search, Hotel } from 'lucide-react';

// Mock data for hotels
const mockHotels: HotelProps[] = [
  {
    id: 1,
    name: "Taj Palace",
    location: "New Delhi, Delhi",
    description: "Experience luxury in the heart of India's capital with stunning views of diplomatic enclave and easy access to iconic landmarks.",
    price: 15999,
    currency: "₹",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    amenities: ["Free WiFi", "Swimming Pool", "Fitness Center", "Restaurant", "Spa", "Room Service"]
  },
  {
    id: 2,
    name: "Leela Palace",
    location: "Mumbai, Maharashtra",
    description: "Beachfront paradise with direct access to pristine beaches, multiple pools, and world-class dining options.",
    price: 18499,
    currency: "₹",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    amenities: ["Beachfront", "Spa", "Multiple Pools", "Restaurant", "Bar", "Fitness Center"]
  },
  {
    id: 3,
    name: "Haveli Heritage Inn",
    location: "Jaipur, Rajasthan",
    description: "Affordable comfort in pink city with easy access to business districts and tourist attractions.",
    price: 7999,
    currency: "₹",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    amenities: ["Free WiFi", "Business Center", "Restaurant", "Parking"]
  },
  {
    id: 4,
    name: "Himalayan View Resort",
    location: "Shimla, Himachal Pradesh",
    description: "Rustic elegance with breathtaking mountain views, perfect for nature lovers and outdoor enthusiasts.",
    price: 9499,
    currency: "₹",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1518733057094-95b53143d2a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    amenities: ["Mountain Views", "Hiking Trails", "Restaurant", "Free Parking", "Pet Friendly"]
  },
  {
    id: 5,
    name: "Colonial Heritage Hotel",
    location: "Kolkata, West Bengal",
    description: "Charming hotel housed in a beautifully restored colonial-era building in Kolkata's historic district.",
    price: 12499,
    currency: "₹",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    amenities: ["Historic Building", "Free WiFi", "Restaurant", "Bar", "Room Service"]
  },
  {
    id: 6,
    name: "Goa Beachside Resort",
    location: "Panaji, Goa",
    description: "Modern coastal retreat featuring multiple pools, beachfront access, and spectacular sunset views.",
    price: 14999,
    currency: "₹",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    amenities: ["Multiple Pools", "Beach Access", "Spa", "Restaurant", "Bar", "Fitness Center"]
  },
];

// Amenities for filter
const allAmenities = [
  "Free WiFi", 
  "Swimming Pool", 
  "Fitness Center", 
  "Spa", 
  "Restaurant", 
  "Bar", 
  "Room Service", 
  "Parking", 
  "Pet Friendly", 
  "Business Center"
];

const Hotels = () => {
  const [searchParams] = useSearchParams();
  const initialDestination = searchParams.get('destination') || '';
  
  const [destination, setDestination] = useState(initialDestination);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<HotelProps[]>(mockHotels);
  
  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };
  
  // Apply filters
  useEffect(() => {
    let result = mockHotels;
    
    // Filter by destination
    if (destination) {
      const searchTerm = destination.toLowerCase();
      result = result.filter(
        hotel => hotel.name.toLowerCase().includes(searchTerm) || 
                hotel.location.toLowerCase().includes(searchTerm)
      );
    }
    
    // Filter by price range
    result = result.filter(
      hotel => hotel.price >= priceRange[0] && hotel.price <= priceRange[1]
    );
    
    // Filter by rating
    if (selectedRating) {
      const rating = parseFloat(selectedRating);
      result = result.filter(hotel => hotel.rating >= rating);
    }
    
    // Filter by amenities
    if (selectedAmenities.length > 0) {
      result = result.filter(
        hotel => selectedAmenities.every(amenity => hotel.amenities.includes(amenity))
      );
    }
    
    setFilteredHotels(result);
  }, [destination, priceRange, selectedRating, selectedAmenities]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-hotel-primary">Filters</h2>
                <Filter className="h-5 w-5 text-hotel-secondary" />
              </div>
              
              {/* Search */}
              <div className="mb-6">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                  Destination
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="search"
                    placeholder="City or Hotel Name"
                    className="pl-10"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range (₹)
                </label>
                <div className="mb-2">
                  <Slider
                    defaultValue={priceRange}
                    min={0}
                    max={20000}
                    step={1000}
                    onValueChange={(value: number[]) => setPriceRange(value)}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>
              
              {/* Rating */}
              <div className="mb-6">
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <Select value={selectedRating} onValueChange={setSelectedRating}>
                  <SelectTrigger id="rating">
                    <SelectValue placeholder="Any Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any Rating</SelectItem>
                    <SelectItem value="3">3+ Stars</SelectItem>
                    <SelectItem value="4">4+ Stars</SelectItem>
                    <SelectItem value="4.5">4.5+ Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Amenities */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Amenities</h3>
                <div className="space-y-2">
                  {allAmenities.map((amenity) => (
                    <div key={amenity} className="flex items-center">
                      <Checkbox 
                        id={`amenity-${amenity}`}
                        checked={selectedAmenities.includes(amenity)}
                        onCheckedChange={() => toggleAmenity(amenity)}
                      />
                      <Label 
                        htmlFor={`amenity-${amenity}`}
                        className="ml-2 text-sm text-gray-600 cursor-pointer"
                      >
                        {amenity}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Clear Filters */}
              <Button 
                variant="outline" 
                className="w-full mt-6"
                onClick={() => {
                  setDestination('');
                  setPriceRange([0, 20000]);
                  setSelectedRating('');
                  setSelectedAmenities([]);
                }}
              >
                Clear Filters
              </Button>
            </div>
          </aside>

          {/* Hotel List */}
          <div className="flex-grow">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-hotel-primary">
                {destination ? `Hotels in ${destination}` : "All Hotels"}
              </h1>
              <p className="text-gray-500">{filteredHotels.length} hotels found</p>
            </div>
            
            {filteredHotels.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-lg">
                <Hotel className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No hotels found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters to find more results.</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setDestination('');
                    setPriceRange([0, 20000]);
                    setSelectedRating('');
                    setSelectedAmenities([]);
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Hotels;
