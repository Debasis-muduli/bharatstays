
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, X, Hotel, User } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Hotel className="h-6 w-6 text-hotel-primary" />
          <span className="hidden font-bold text-xl text-hotel-primary sm:inline-block">StayEasy</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-hotel-secondary">
            Home
          </Link>
          <Link to="/hotels" className="text-sm font-medium transition-colors hover:text-hotel-secondary">
            Browse Hotels
          </Link>
          <Link to="/my-bookings" className="text-sm font-medium transition-colors hover:text-hotel-secondary">
            My Bookings
          </Link>
        </nav>

        {/* Authentication */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login">
            <Button variant="outline" className="border-hotel-secondary text-hotel-secondary hover:bg-hotel-secondary hover:text-white">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button className="bg-hotel-primary text-white hover:bg-hotel-primary/90">
              Register
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Toggle Menu">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-6 mt-10">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold transition-colors hover:text-hotel-secondary">
                Home
              </Link>
              <Link to="/hotels" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold transition-colors hover:text-hotel-secondary">
                Browse Hotels
              </Link>
              <Link to="/my-bookings" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold transition-colors hover:text-hotel-secondary">
                My Bookings
              </Link>
              <hr className="my-2" />
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold transition-colors hover:text-hotel-secondary">
                Login
              </Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold transition-colors hover:text-hotel-secondary">
                Register
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
