
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar, MapPin, Users, CreditCard, Check, Download, Printer, Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const bookingId = "HB" + Math.floor(100000 + Math.random() * 900000);
  
  // Mock booking details - in a real app, this would come from the API/state
  const bookingDetails = {
    hotelName: "Grand Plaza Hotel",
    hotelAddress: "123 Broadway, New York, NY 10001",
    roomType: "Deluxe King Room",
    checkIn: "Apr 20, 2025",
    checkOut: "Apr 23, 2025",
    guests: 2,
    nights: 3,
    price: 299,
    totalPrice: 897,
    currency: "$",
    paymentMethod: "Visa **** 1234",
    bookedBy: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="max-w-3xl mx-auto">
          {/* Success Message */}
          <div className="bg-green-50 rounded-lg p-6 mb-8 flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-green-800 mb-1">Booking Confirmed!</h2>
              <p className="text-green-700">
                Your booking has been successfully completed. Your booking ID is <span className="font-semibold">{bookingId}</span>.
              </p>
            </div>
          </div>
          
          {/* Booking Details Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-hotel-primary">Booking Summary</h1>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>Email</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Printer className="h-4 w-4 mr-2" />
                  <span>Print</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  <span>Download</span>
                </Button>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Booking ID</p>
                  <p className="font-semibold">{bookingId}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 mb-1">Booking Date</p>
                  <p className="font-semibold">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            {/* Hotel Info */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-hotel-primary mb-4">Hotel Information</h2>
              <div className="flex flex-col md:flex-row md:items-center bg-white border rounded-lg p-4">
                <img 
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" 
                  alt={bookingDetails.hotelName}
                  className="w-full md:w-32 h-24 object-cover rounded-md mb-4 md:mb-0 md:mr-4"
                />
                <div>
                  <h3 className="font-semibold text-lg">{bookingDetails.hotelName}</h3>
                  <div className="flex items-center text-gray-600 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{bookingDetails.hotelAddress}</span>
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Room Type:</span> {bookingDetails.roomType}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Stay Details */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-hotel-primary mb-4">Stay Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border rounded-lg p-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-hotel-secondary mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Check-in</p>
                      <p className="font-semibold">{bookingDetails.checkIn}</p>
                      <p className="text-sm text-gray-500 mt-1">From 3:00 PM</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border rounded-lg p-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-hotel-secondary mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Check-out</p>
                      <p className="font-semibold">{bookingDetails.checkOut}</p>
                      <p className="text-sm text-gray-500 mt-1">Until 11:00 AM</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border rounded-lg p-4">
                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-hotel-secondary mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Guests</p>
                      <p className="font-semibold">{bookingDetails.guests} Guests</p>
                      <p className="text-sm text-gray-500 mt-1">{bookingDetails.nights} Nights</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payment Summary */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-hotel-primary mb-4">Payment Summary</h2>
              <div className="bg-white border rounded-lg p-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Room Rate ({bookingDetails.nights} Nights)</span>
                    <span>{bookingDetails.currency}{bookingDetails.price} x {bookingDetails.nights}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes & Fees</span>
                    <span>Included</span>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between font-semibold">
                    <span>Total Amount</span>
                    <span>{bookingDetails.currency}{bookingDetails.totalPrice}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 text-hotel-secondary mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Payment Method</p>
                      <p className="font-medium">{bookingDetails.paymentMethod}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Guest Information */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-hotel-primary mb-4">Guest Information</h2>
              <div className="bg-white border rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{bookingDetails.bookedBy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{bookingDetails.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{bookingDetails.phone}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Next Steps */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-hotel-primary mb-3">What's Next?</h2>
              <p className="text-gray-600 mb-4">
                A confirmation email has been sent to your email address. You can also access your booking anytime in your account under "My Bookings".
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="bg-hotel-primary hover:bg-hotel-primary/90 text-white"
                  onClick={() => navigate('/my-bookings')}
                >
                  View All Bookings
                </Button>
                <Button
                  variant="outline"
                  className="border-hotel-secondary text-hotel-secondary hover:bg-hotel-secondary hover:text-white"
                  onClick={() => navigate('/')}
                >
                  Back to Home
                </Button>
              </div>
            </div>
          </div>
          
          {/* Help Section */}
          <div className="text-center">
            <p className="text-gray-600 mb-2">Need help with your booking?</p>
            <p className="font-medium">
              <Link to="/contact" className="text-hotel-secondary hover:underline">Contact Support</Link> or call +1 (800) 123-4567
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookingConfirmation;
