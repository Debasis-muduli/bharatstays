import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CalendarDays, Users, Hotel, IndianRupee } from 'lucide-react';

const bookingStatusColors: { [key: string]: string } = {
  upcoming: 'bg-green-100 text-green-800',
  completed: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-red-100 text-red-800',
};

// Mock booking data
const mockBookings = [
  {
    id: 'BK12345',
    hotelName: 'Taj Palace Hotel',
    location: 'New Delhi, Delhi',
    checkIn: '2023-10-15',
    checkOut: '2023-10-18',
    roomType: 'Deluxe King Room',
    guests: 2,
    totalPrice: 47997,
    currency: '₹',
    status: 'completed',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'BK12346',
    hotelName: 'Leela Palace',
    location: 'Mumbai, Maharashtra',
    checkIn: '2023-12-23',
    checkOut: '2023-12-27',
    roomType: 'Executive Suite',
    guests: 2,
    totalPrice: 73996,
    currency: '₹',
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'BK12347',
    hotelName: 'Himalayan View Resort',
    location: 'Shimla, Himachal Pradesh',
    checkIn: '2023-08-05',
    checkOut: '2023-08-10',
    roomType: 'Mountain View Room',
    guests: 3,
    totalPrice: 47495,
    currency: '₹',
    status: 'completed',
    image: 'https://images.unsplash.com/photo-1518733057094-95b53143d2a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'BK12348',
    hotelName: 'Goa Beachside Resort',
    location: 'Panaji, Goa',
    checkIn: '2024-01-15',
    checkOut: '2024-01-20',
    roomType: 'Beach Villa',
    guests: 4,
    totalPrice: 74995,
    currency: '₹',
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'BK12349',
    hotelName: 'Haveli Heritage Inn',
    location: 'Jaipur, Rajasthan',
    checkIn: '2023-11-10',
    checkOut: '2023-11-12',
    roomType: 'Heritage Suite',
    guests: 2,
    totalPrice: 15998,
    currency: '₹',
    status: 'cancelled',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  },
];

const MyBookings = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold text-hotel-primary mb-6">My Bookings</h1>

        {mockBookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={booking.image}
                  alt={booking.hotelName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-hotel-primary mb-2">{booking.hotelName}</h2>
                  <div className="flex items-center text-gray-500 mb-2">
                    <Hotel className="h-4 w-4 mr-1" />
                    <span>{booking.location}</span>
                  </div>
                  <div className="flex items-center text-gray-500 mb-2">
                    <CalendarDays className="h-4 w-4 mr-1" />
                    <span>{booking.checkIn} - {booking.checkOut}</span>
                  </div>
                  <div className="flex items-center text-gray-500 mb-2">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{booking.guests} Guests, {booking.roomType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-hotel-primary">
                        <IndianRupee className="inline-block h-5 w-5 mr-1" />
                        {booking.totalPrice}
                      </span>
                    </div>
                    <div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bookingStatusColors[booking.status]}`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No bookings found</h3>
            <p className="text-gray-500">You don't have any upcoming or past bookings.</p>
            <Link to="/hotels" className="text-blue-600 hover:underline">
              Explore Hotels
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MyBookings;
