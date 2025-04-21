
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
    description: "Experience luxury in the capital at Taj Palace, with world-class amenities and royal elegance.",
    price: 14999,
    currency: "₹",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    amenities: ["Free WiFi", "Swimming Pool", "Fitness Center", "Restaurant", "Spa", "Room Service"]
  },
  {
    id: 2,
    name: "The Oberoi",
    location: "Mumbai, Maharashtra",
    description: "A five-star haven with sea views and award-winning restaurants in Mumbai's business district.",
    price: 18499,
    currency: "₹",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    amenities: ["Beachfront", "Spa", "Restaurant", "Bar", "Fitness Center"]
  },
  {
    id: 3,
    name: "Leela Ambience",
    location: "Gurugram, Haryana",
    description: "Luxury property featuring a famed spa, fine dining, and easy access to cyber city.",
    price: 12799,
    currency: "₹",
    rating: 4.65,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    amenities: ["Free WiFi", "Swimming Pool", "Fitness Center", "Spa", "Restaurant"]
  },
  {
    id: 4,
    name: "ITC Rajputana",
    location: "Jaipur, Rajasthan",
    description: "A palatial hotel with Rajasthani-style interiors and traditional hospitality.",
    price: 9999,
    currency: "₹",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    amenities: ["Spa", "Swimming Pool", "Restaurant", "Free Parking"]
  },
  {
    id: 5,
    name: "Vivanta Dal View",
    location: "Srinagar, Jammu & Kashmir",
    description: "Overlooking Dal Lake, this luxury hotel offers breathtaking views and tranquil vibes.",
    price: 18999,
    currency: "₹",
    rating: 4.85,
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    amenities: ["Free Wifi", "Mountain Views", "Restaurant", "Spa", "Room Service"]
  },
  {
    id: 6,
    name: "The Park",
    location: "Kolkata, West Bengal",
    description: "Stay at this stylish downtown hotel known for its nightlife and dining experiences.",
    price: 8999,
    currency: "₹",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    amenities: ["Free WiFi", "Restaurant", "Bar", "Room Service"]
  },
  {
    id: 7,
    name: "Radisson Blu",
    location: "Noida, Uttar Pradesh",
    description: "Contemporary hotel with luxurious rooms and excellent conference facilities.",
    price: 10999,
    currency: "₹",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1466744915671-0b5d5da0b0bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    amenities: ["Free WiFi", "Swimming Pool", "Restaurant", "Business Center"]
  },
  {
    id: 8,
    name: "Fortune Select Grand",
    location: "Chennai, Tamil Nadu",
    description: "Conveniently located for business and leisure travelers, offering all-day dining and a tranquil pool.",
    price: 8499,
    currency: "₹",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    amenities: ["Free WiFi", "Fitness Center", "Restaurant", "Bar", "Parking"]
  },
  {
    id: 9,
    name: "Novotel Candolim",
    location: "Goa",
    description: "Close to Candolim Beach, featuring a tropical pool, great food, and vibrant nightlife.",
    price: 11299,
    currency: "₹",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    amenities: ["Swimming Pool", "Beach Access", "Restaurant", "Pet Friendly"]
  },
  {
    id: 10,
    name: "JW Marriott",
    location: "Pune, Maharashtra",
    description: "Ultimate comfort in Pune's business hub with rooftop bars and luxury spa facilities.",
    price: 16449,
    currency: "₹",
    rating: 4.75,
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    amenities: ["Rooftop Bar", "Spa", "Fitness Center", "Swimming Pool"]
  },
  {
    id: 11,
    name: "Hyatt Regency",
    location: "Ahmedabad, Gujarat",
    description: "Premium business hotel set by the Sabarmati River, offering comfort and contemporary design.",
    price: 10500,
    currency: "₹",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    amenities: ["Free WiFi", "Spa", "Restaurant", "Business Center", "Parking"]
  },
  {
    id: 12,
    name: "Hotel Lake View",
    location: "Udaipur, Rajasthan",
    description: "Relax by Lake Pichola with beautiful views, a rooftop restaurant, and serene ambiance.",
    price: 7499,
    currency: "₹",
    rating: 4.25,
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    amenities: ["Lake Views", "Restaurant", "Free Parking"]
  },
  {
    id: 13,
    name: "Shivani Heritage",
    location: "Jodhpur, Rajasthan",
    description: "A boutique heritage stay with traditional charm and gourmet Rajasthani cuisine.",
    price: 6599,
    currency: "₹",
    rating: 4.05,
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    amenities: ["Restaurant", "Free WiFi", "Pet Friendly", "Room Service"]
  },
  {
    id: 14,
    name: "Grand Mercure",
    location: "Bangalore, Karnataka",
    description: "Upscale accommodation in the city’s tech hub, with garden dining and modern rooms.",
    price: 13699,
    currency: "₹",
    rating: 4.45,
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    amenities: ["Fitness Center", "Restaurant", "Spa", "Swimming Pool"]
  },
  {
    id: 15,
    name: "Sheraton Grand",
    location: "Hyderabad, Telangana",
    description: "Centrally located hotel offering luxury amenities and excellent conference facilities.",
    price: 12999,
    currency: "₹",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    amenities: ["Free WiFi", "Spa", "Restaurant", "Bar", "Business Center"]
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
  const [priceRange, setPriceRange] = useState([0, 500]);
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
                  Price Range
                </label>
                <div className="mb-2">
                  <Slider
                    defaultValue={priceRange}
                    min={0}
                    max={500}
                    step={10}
                    onValueChange={(value: number[]) => setPriceRange(value)}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
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
                    <SelectItem value="any">Any Rating</SelectItem>
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
                  setPriceRange([0, 500]);
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
                    setPriceRange([0, 500]);
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

