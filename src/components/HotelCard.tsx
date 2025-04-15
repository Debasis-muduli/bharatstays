
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface HotelProps {
  id: number;
  name: string;
  location: string;
  description: string;
  price: number;
  currency: string;
  rating: number;
  image: string;
  amenities: string[];
}

interface HotelCardProps {
  hotel: HotelProps;
  className?: string;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, className }) => {
  return (
    <div className={cn("bg-white rounded-lg shadow-md overflow-hidden hotel-card", className)}>
      <div className="relative h-[200px]">
        <img 
          src={hotel.image} 
          alt={hotel.name} 
          className="w-full h-full object-cover"
        />
        {hotel.rating >= 4.5 && (
          <Badge 
            className="absolute top-4 left-4 bg-hotel-secondary text-white"
          >
            Top Rated
          </Badge>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-hotel-primary line-clamp-1">{hotel.name}</h3>
          <div className="flex items-center">
            <span className="font-semibold mr-1">{hotel.rating}</span>
            <Star className="h-4 w-4 text-hotel-accent fill-hotel-accent" />
          </div>
        </div>
        
        <div className="flex items-center text-gray-500 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{hotel.location}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{hotel.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.amenities.slice(0, 3).map((amenity, index) => (
            <span 
              key={index}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
            >
              {amenity}
            </span>
          ))}
          {hotel.amenities.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              +{hotel.amenities.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xl font-bold text-hotel-primary">
              {hotel.currency}{hotel.price}
            </span>
            <span className="text-gray-500 text-sm"> / night</span>
          </div>
          <Link to={`/hotels/${hotel.id}`}>
            <Button className="bg-hotel-primary hover:bg-hotel-primary/90 text-white">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
