import React from 'react';
import { Link } from 'react-router-dom';
import { Hotel, Mail, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-hotel-primary text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Hotel className="h-6 w-6" />
              <span className="font-bold text-xl">BharatStays</span>
            </div>
            <p className="text-gray-300 mb-4">
              Book your perfect stay with us. Discover amazing hotels and resorts across India.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="hover:text-hotel-secondary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-hotel-secondary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-hotel-secondary transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-hotel-secondary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/hotels" className="text-gray-300 hover:text-hotel-secondary transition-colors">
                  Browse Hotels
                </Link>
              </li>
              <li>
                <Link to="/my-bookings" className="text-gray-300 hover:text-hotel-secondary transition-colors">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-hotel-secondary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-hotel-secondary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-hotel-secondary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-hotel-secondary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-hotel-secondary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail size={18} />
                <span>support@bharatstays.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone size={18} />
                <span>+91 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-300">
          <p>© {new Date().getFullYear()} BharatStays. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
