
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  CreditCard, 
  Headphones, 
  Shield, 
  ThumbsUp, 
  Star 
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Delhi",
    message: "I found the perfect hotel for our honeymoon through BharatStays. The booking process was seamless, and the accommodations exceeded our expectations!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
  },
  {
    id: 2,
    name: "Rajesh Patel",
    location: "Mumbai",
    message: "As a frequent business traveler, I rely on BharatStays for all my hotel bookings. Their customer service is outstanding, and they always find me the best deals.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
  },
  {
    id: 3,
    name: "Anjali Verma",
    location: "Bangalore",
    message: "The mobile app is so intuitive and easy to use. I can book a hotel in under 2 minutes, and their loyalty program gives amazing discounts!",
    rating: 4,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
  },
];

const features = [
  {
    icon: <Calendar className="h-10 w-10 text-hotel-secondary" />,
    title: "Easy Booking",
    description: "Book your stay in just a few clicks with our simple booking process.",
  },
  {
    icon: <Shield className="h-10 w-10 text-hotel-secondary" />,
    title: "Trusted Hotels",
    description: "We partner only with verified and highly-rated hotels for quality assurance.",
  },
  {
    icon: <Headphones className="h-10 w-10 text-hotel-secondary" />,
    title: "24/7 Support",
    description: "Our support team is available around the clock to assist with any issues.",
  },
  {
    icon: <CreditCard className="h-10 w-10 text-hotel-secondary" />,
    title: "Secure Payments",
    description: "Your payment and personal information are protected with advanced encryption.",
  },
  {
    icon: <Clock className="h-10 w-10 text-hotel-secondary" />,
    title: "Instant Confirmation",
    description: "Receive immediate booking confirmation and details via email.",
  },
  {
    icon: <ThumbsUp className="h-10 w-10 text-hotel-secondary" />,
    title: "Best Price Guarantee",
    description: "We promise the best rates for all hotels on our platform.",
  },
];

const popularDestinations = [
  {
    name: "New Delhi",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    hotels: 12,
  },
  {
    name: "Mumbai",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    hotels: 8,
  },
  {
    name: "Jaipur",
    image: "https://images.unsplash.com/photo-1703665180697-523baf7c88ec?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hotels: 9,
  },
  {
    name: "Goa",
    image: "https://images.unsplash.com/photo-1701421016474-09b19faa9f77?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hotels: 6,
  },
];

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen max-h-[800px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
            alt="Luxury hotel resort"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-2xl animate-fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Find Your Perfect Stay in India
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Discover amazing hotels and resorts across India with best prices guaranteed
            </p>
          </div>
          
          <div className="mt-6 animate-fade-up animation-delay-200">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-hotel-primary mb-4">Popular Destinations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our most searched destinations and find your next getaway
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularDestinations.map((destination) => (
              <Link
                key={destination.name}
                to={`/hotels?destination=${destination.name}`}
                className="group relative h-64 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 flex flex-col justify-end">
                  <h3 className="text-xl font-semibold text-white">{destination.name}</h3>
                  <p className="text-white/80">{destination.hotels} Hotels</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-hotel-primary mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We make hotel booking easy and stress-free with these key features
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-hotel-primary">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-hotel-primary mb-4">What Our Users Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Read testimonials from our satisfied customers around the world
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-6 rounded-lg shadow-md testimonial-card"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-medium text-hotel-primary">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.message}"</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < testimonial.rating ? "text-hotel-accent fill-hotel-accent" : "text-gray-300"}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-hotel-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Book Your Next Stay?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied travelers and find your perfect accommodation today.
          </p>
          <Link to="/hotels">
            <Button className="bg-hotel-secondary hover:bg-hotel-secondary/90 text-white">
              Browse Hotels
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
