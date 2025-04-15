
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import { 
  Star, 
  MapPin, 
  Calendar as CalendarIcon, 
  Users, 
  Coffee, 
  Wifi, 
  Dumbbell, 
  Car, 
  Waves, 
  Utensils, 
  Wine, 
  Bed, 
  ChevronLeft, 
  ChevronRight,
  Phone,
  Globe,
  ThumbsUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock hotel data
const mockHotelDetails = {
  id: 1,
  name: "Taj Palace Hotel",
  location: "2 Sardar Patel Marg, Diplomatic Enclave, New Delhi, 110021",
  description: "Experience luxury in the heart of India's capital with stunning views of diplomatic enclave and easy access to iconic landmarks. Our hotel features elegantly appointed rooms, world-class dining, and exceptional service to make your stay truly memorable. Enjoy our state-of-the-art fitness center, relaxing spa, and rooftop pool with panoramic city views.",
  price: 15999,
  currency: "₹",
  rating: 4.8,
  reviewCount: 534,
  checkInTime: "2:00 PM",
  checkOutTime: "12:00 PM",
  images: [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80"
  ],
  amenities: [
    { name: "Free WiFi", icon: <Wifi className="h-5 w-5" /> },
    { name: "Swimming Pool", icon: <Waves className="h-5 w-5" /> },
    { name: "Fitness Center", icon: <Dumbbell className="h-5 w-5" /> },
    { name: "Restaurant", icon: <Utensils className="h-5 w-5" /> },
    { name: "Bar", icon: <Wine className="h-5 w-5" /> },
    { name: "Room Service", icon: <Coffee className="h-5 w-5" /> },
    { name: "Parking", icon: <Car className="h-5 w-5" /> }
  ],
  rooms: [
    {
      id: 101,
      name: "Deluxe King Room",
      description: "Spacious room with a king-sized bed and city views",
      maxOccupancy: 2,
      price: 15999,
      currency: "₹",
      image: "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
      amenities: ["King Bed", "50\" Smart TV", "Free WiFi", "Work Desk", "Mini Bar"]
    },
    {
      id: 102,
      name: "Executive Suite",
      description: "Luxurious suite with separate living area and premium amenities",
      maxOccupancy: 3,
      price: 25999,
      currency: "₹",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
      amenities: ["King Bed", "Separate Living Area", "65\" Smart TV", "Premium WiFi", "Executive Lounge Access", "Nespresso Machine"]
    },
    {
      id: 103,
      name: "Double Queen Room",
      description: "Comfortable room with two queen-sized beds, perfect for families",
      maxOccupancy: 4,
      price: 18999,
      currency: "₹",
      image: "https://images.unsplash.com/photo-1590490359683-658d3d23f972?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
      amenities: ["Two Queen Beds", "50\" Smart TV", "Free WiFi", "Mini Bar"]
    }
  ],
  reviews: [
    {
      id: 1,
      user: "Aditya Mehta",
      rating: 5,
      date: "July 15, 2023",
      comment: "Excellent hotel in a perfect location. Staff was incredibly helpful and the rooms were immaculate. Would definitely stay again!"
    },
    {
      id: 2,
      user: "Sunita Reddy",
      rating: 4,
      date: "June 22, 2023",
      comment: "Very nice hotel with great amenities. The room was spacious and comfortable. Only complaint is that the pool was closed for maintenance during our stay."
    },
    {
      id: 3,
      user: "Deepak Kumar",
      rating: 5,
      date: "May 10, 2023",
      comment: "One of the best hotels I've stayed at in Delhi. The bed was heavenly and the view from our room was spectacular. The restaurant on-site is also fantastic."
    }
  ],
  policies: {
    cancellation: "Free cancellation up to 48 hours before check-in. Cancellations made within 48 hours of check-in are subject to a one-night charge.",
    children: "Children of all ages are welcome. Children 12 and under stay free when using existing bedding.",
    pets: "Pets are not allowed.",
    smoking: "This is a non-smoking property."
  }
};

const HotelDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>();
  const [guests, setGuests] = useState("1");
  const [rooms, setRooms] = useState("1");
  const [selectedRoom, setSelectedRoom] = useState<string | undefined>();

  const hotel = mockHotelDetails; // In a real app, you'd fetch hotel details based on ID

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? hotel.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === hotel.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleBookNow = () => {
    if (!checkInDate || !checkOutDate) {
      alert("Please select check-in and check-out dates");
      return;
    }

    if (!selectedRoom) {
      alert("Please select a room type");
      return;
    }

    // In a real app, you'd navigate to booking confirmation page with selected parameters
    console.log({
      hotelId: hotel.id,
      roomId: selectedRoom,
      checkIn: format(checkInDate, 'yyyy-MM-dd'),
      checkOut: format(checkOutDate, 'yyyy-MM-dd'),
      guests,
      rooms
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-hotel-secondary">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/hotels" className="hover:text-hotel-secondary">Hotels</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{hotel.name}</span>
        </div>
        
        {/* Hotel Name and Rating */}
        <div className="flex justify-between items-start mb-6 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold text-hotel-primary mb-2">{hotel.name}</h1>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{hotel.location}</span>
            </div>
          </div>
          
          <div className="flex items-center bg-white shadow-sm rounded-lg px-4 py-2 mt-2 sm:mt-0">
            <div className="flex items-center mr-3">
              <span className="text-xl font-semibold mr-1">{hotel.rating}</span>
              <Star className="h-5 w-5 text-hotel-accent fill-hotel-accent" />
            </div>
            <div className="text-sm">
              <div className="font-semibold">Excellent</div>
              <div className="text-gray-500">{hotel.reviewCount} reviews</div>
            </div>
          </div>
        </div>
        
        {/* Image Gallery */}
        <div className="relative mb-8">
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
            <img
              src={hotel.images[currentImageIndex]}
              alt={`${hotel.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-[500px] object-cover object-center"
            />
          </div>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
            onClick={handlePreviousImage}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
            onClick={handleNextImage}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {hotel.images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>
        
        {/* Grid Layout for Details and Booking */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Hotel Details */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview">
              <TabsList className="w-full grid grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="rooms">Rooms</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="policies">Policies</TabsTrigger>
              </TabsList>
              
              {/* Overview Tab */}
              <TabsContent value="overview" className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-hotel-primary mb-3">About This Hotel</h2>
                    <p className="text-gray-600">{hotel.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-hotel-primary mb-3">Check-in & Check-out</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-500 mb-1">Check-in Time</div>
                        <div className="font-medium">{hotel.checkInTime}</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-500 mb-1">Check-out Time</div>
                        <div className="font-medium">{hotel.checkOutTime}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-hotel-primary mb-4">Amenities</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4">
                      {hotel.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center">
                          <div className="text-hotel-secondary mr-2">
                            {amenity.icon}
                          </div>
                          <span>{amenity.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Rooms Tab */}
              <TabsContent value="rooms" className="pt-6">
                <div className="space-y-6">
                  {hotel.rooms.map((room) => (
                    <div key={room.id} className="border rounded-lg overflow-hidden bg-white">
                      <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className="h-full">
                          <img 
                            src={room.image} 
                            alt={room.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="md:col-span-2 p-6">
                          <h3 className="text-xl font-semibold text-hotel-primary mb-2">{room.name}</h3>
                          <p className="text-gray-600 mb-4">{room.description}</p>
                          
                          <div className="flex items-center text-gray-600 mb-4">
                            <Users className="h-5 w-5 mr-2" />
                            <span>Max {room.maxOccupancy} {room.maxOccupancy > 1 ? 'guests' : 'guest'}</span>
                          </div>
                          
                          <div className="mb-4">
                            <h4 className="font-medium text-gray-700 mb-2">Room Amenities</h4>
                            <div className="flex flex-wrap gap-2">
                              {room.amenities.map((amenity, index) => (
                                <span 
                                  key={index}
                                  className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                                >
                                  {amenity}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between pt-4 border-t">
                            <div>
                              <span className="text-2xl font-bold text-hotel-primary">
                                {room.currency}{room.price}
                              </span>
                              <span className="text-gray-500"> / night</span>
                            </div>
                            <Button 
                              className="bg-hotel-primary hover:bg-hotel-primary/90 text-white"
                              onClick={() => setSelectedRoom(room.id.toString())}
                            >
                              Select Room
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              {/* Reviews Tab */}
              <TabsContent value="reviews" className="pt-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-hotel-primary">
                      Guest Reviews ({hotel.reviewCount})
                    </h2>
                    <div className="flex items-center">
                      <span className="text-xl font-semibold mr-1">{hotel.rating}</span>
                      <Star className="h-5 w-5 text-hotel-accent fill-hotel-accent" />
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {hotel.reviews.map((review) => (
                      <div key={review.id} className="bg-white rounded-lg p-6 shadow-sm">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-hotel-primary">{review.user}</h4>
                            <p className="text-sm text-gray-500">{review.date}</p>
                          </div>
                          <div className="flex items-center">
                            <span className="font-semibold mr-1">{review.rating}</span>
                            <Star className="h-4 w-4 text-hotel-accent fill-hotel-accent" />
                          </div>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              {/* Policies Tab */}
              <TabsContent value="policies" className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-hotel-primary mb-2">Cancellation Policy</h3>
                    <p className="text-gray-600">{hotel.policies.cancellation}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-hotel-primary mb-2">Children Policy</h3>
                    <p className="text-gray-600">{hotel.policies.children}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-hotel-primary mb-2">Pet Policy</h3>
                    <p className="text-gray-600">{hotel.policies.pets}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-hotel-primary mb-2">Smoking Policy</h3>
                    <p className="text-gray-600">{hotel.policies.smoking}</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Booking Form */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-20">
              <div className="flex justify-between items-baseline mb-4">
                <span className="text-2xl font-bold text-hotel-primary">
                  {hotel.currency}{hotel.price}
                </span>
                <span className="text-gray-500">per night</span>
              </div>
              
              <div className="space-y-4">
                {/* Check-in Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                
                {/* Check-out Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                
                {/* Guests & Rooms */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Guests
                    </label>
                    <Select value={guests} onValueChange={setGuests}>
                      <SelectTrigger>
                        <SelectValue placeholder="Guests" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rooms
                    </label>
                    <Select value={rooms} onValueChange={setRooms}>
                      <SelectTrigger>
                        <SelectValue placeholder="Rooms" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Room Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Type
                  </label>
                  <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Room Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {hotel.rooms.map((room) => (
                        <SelectItem key={room.id} value={room.id.toString()}>
                          {room.name} - {room.currency}{room.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Book Now Button */}
                <Button 
                  className="w-full bg-hotel-accent hover:bg-hotel-accent/90 text-white mt-2"
                  onClick={handleBookNow}
                >
                  Book Now
                </Button>
                
                {/* Additional Info */}
                <div className="text-sm text-gray-500 space-y-2 mt-4">
                  <div className="flex items-center">
                    <ThumbsUp className="h-4 w-4 mr-2 text-hotel-secondary" />
                    <span>Free cancellation up to 48 hours before check-in</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-hotel-secondary" />
                    <span>24/7 customer support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HotelDetails;
