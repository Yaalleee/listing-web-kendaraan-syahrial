import type { ListingApiResponse } from '../services/api';
import { getListings } from '../services/api';

export interface Car {
  id: string | number;
  brand?: string;
  model?: string;
  year?: number;
  price: number;
  image: string;
  rating?: number;
  reviews?: number;
  title?: string;
  description?: string;
  category?: string;
}

// Convert API response to Car format
const convertApiToCar = (listing: ListingApiResponse): Car => {
  const titleParts = listing.title?.split(' ') || [];
  const brand = titleParts[0] || '';
  const model = titleParts.slice(1).join(' ') || '';

  return {
    id: listing.id,
    brand,
    model,
    year: new Date(listing.createdAt).getFullYear(),
    price: listing.price,
    image: listing.imageUrl || 'https://images.unsplash.com/photo-1606611013016-969c19f27081?w=400&q=80',
    title: listing.title,
    description: listing.description,
    category: listing.category,
    rating: 4.5, // Default rating
    reviews: 0, // Default reviews count
  };
};

// Fetch cars from API
export const fetchCars = async (): Promise<Car[]> => {
  try {
    const listings = await getListings({ limit: 12 });
    return listings.map(convertApiToCar);
  } catch (error) {
    console.error('Failed to fetch cars:', error);
    // Return empty array on error
    return [];
  }
};

// Fetch single car by ID
export const fetchCarById = async (id: string | number): Promise<Car | null> => {
  try {
    const listing = await getListings({ search: id.toString() });
    if (listing.length > 0) {
      return convertApiToCar(listing[0]);
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch car:', error);
    return null;
  }
};

// Search cars by keyword
export const searchCars = async (keyword: string): Promise<Car[]> => {
  try {
    const listings = await getListings({ search: keyword });
    return listings.map(convertApiToCar);
  } catch (error) {
    console.error('Failed to search cars:', error);
    return [];
  }
};

// Filter cars by category
export const filterCarsByCategory = async (category: string): Promise<Car[]> => {
  try {
    const listings = await getListings({ category });
    return listings.map(convertApiToCar);
  } catch (error) {
    console.error('Failed to filter cars:', error);
    return [];
  }
};
