
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, MapPinIcon, Hotel, Calendar, MapPin, Ticket, FileText, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

// Mock booking data - in a real app, this would come from an API
const bookings = [
  {
    id: 'HB123456',
    hotelName: 'Grand Plaza Hotel',
    location: 'New York, NY',
    checkIn: new Date(2025, 3, 20),
    checkOut: new Date(2025, 3, 23),
    guests: 2,
    roomType: 'Deluxe King Room',
    totalPrice: 897,
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'HB789012',
    hotelName: 'Oceanview Resort & Spa',
    location: 'Miami Beach, FL',
    checkIn: new Date(2025, 5, 12),
    checkOut: new Date(2025, 5, 17),
    guests: 2,
    roomType: 'Premium Ocean Suite',
    totalPrice: 1450,
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'HB456789',
    hotelName: 'Mountain Lodge Retreat',
    location: 'Aspen, CO',
    checkIn: new Date(2025, 0, 5),
    checkOut: new Date(2025, 0, 10),
    guests: 4,
    roomType: 'Family Suite',
    totalPrice: 1280,
    status: 'completed',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'HB654321',
    hotelName: 'Sunset Bay Hotel',
    location: 'San Diego, CA',
    checkIn: new Date(2024, 11, 18),
    checkOut: new Date(2024, 11, 22),
    guests: 2,
    roomType: 'Deluxe Ocean View',
    totalPrice: 920,
    status: 'cancelled',
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
  }
];

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredBookings = activeTab === 'all' 
    ? bookings 
    : bookings.filter((booking) => booking.status === activeTab);

  // Function to render the appropriate status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Upcoming</Badge>;
      case 'completed':
        return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500 hover:bg-red-600">Cancelled</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 flex-grow">
        <h1 className="text-3xl font-bold text-hotel-primary mb-8">My Bookings</h1>
        
        <Tabs defaultValue="all" onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 max-w-md">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
        </Tabs>

        {filteredBookings.length === 0 ? (
          <Card className="border-dashed border-2 p-8">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="bg-gray-100 p-4 rounded-full">
                <Ticket className="h-10 w-10 text-gray-400" />
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2">No bookings found</h3>
                <p className="text-gray-500 mb-4">
                  {activeTab === 'all' 
                    ? "You don't have any bookings yet." 
                    : `You don't have any ${activeTab} bookings.`}
                </p>
                <Button 
                  className="bg-hotel-primary hover:bg-hotel-primary/90"
                  asChild
                >
                  <Link to="/hotels">Find Hotels</Link>
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <>
            {/* Mobile view - card layout */}
            <div className="md:hidden space-y-6">
              {filteredBookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden">
                  <div className="flex border-b">
                    <img 
                      src={booking.image} 
                      alt={booking.hotelName} 
                      className="w-24 h-24 object-cover"
                    />
                    <div className="p-4 flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-lg">{booking.hotelName}</h3>
                        {renderStatusBadge(booking.status)}
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{booking.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-4 pt-4">
                    <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                      <div>
                        <p className="text-gray-500">Booking ID</p>
                        <p className="font-medium">{booking.id}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Room Type</p>
                        <p className="font-medium">{booking.roomType}</p>
                      </div>
                      <div className="flex items-start">
                        <Calendar className="h-4 w-4 mr-1 mt-0.5 text-gray-500" />
                        <div>
                          <p className="text-gray-500">Check-in</p>
                          <p className="font-medium">{format(booking.checkIn, 'MMM dd, yyyy')}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Calendar className="h-4 w-4 mr-1 mt-0.5 text-gray-500" />
                        <div>
                          <p className="text-gray-500">Check-out</p>
                          <p className="font-medium">{format(booking.checkOut, 'MMM dd, yyyy')}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <div className="text-lg font-bold text-hotel-primary">${booking.totalPrice}</div>
                      <Button 
                        variant="outline" 
                        className="border-hotel-secondary text-hotel-secondary hover:bg-hotel-secondary hover:text-white"
                        asChild
                      >
                        <Link to={`/booking-details/${booking.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Desktop view - table layout */}
            <div className="hidden md:block">
              <Table>
                <TableCaption>A list of your bookings</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Hotel</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Guests</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img 
                            src={booking.image} 
                            alt={booking.hotelName} 
                            className="w-10 h-10 rounded-md object-cover"
                          />
                          <div>
                            <div className="font-medium">{booking.hotelName}</div>
                            <div className="text-sm text-gray-500">{booking.location}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>{format(booking.checkIn, 'MMM dd, yyyy')}</div>
                        <div className="text-sm text-gray-500">to</div>
                        <div>{format(booking.checkOut, 'MMM dd, yyyy')}</div>
                      </TableCell>
                      <TableCell>{booking.guests}</TableCell>
                      <TableCell className="font-semibold">${booking.totalPrice}</TableCell>
                      <TableCell>{renderStatusBadge(booking.status)}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-hotel-secondary text-hotel-secondary hover:bg-hotel-secondary hover:text-white"
                          asChild
                        >
                          <Link to={`/booking-details/${booking.id}`}>View Details</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default MyBookings;
