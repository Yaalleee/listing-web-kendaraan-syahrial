# API Integration Guide

## Overview
Aplikasi telah diintegrasikan dengan UniversalListing API. Semua data mobil sekarang diambil dari server API, bukan dari data static lokal.

## API Configuration

### Base URL
```
http://listing-webki-production.up.railway.app/api
```

### Authentication
API menggunakan JWT Bearer Token untuk endpoint yang protected. Token disimpan di localStorage dengan key `listing_jwt_token`.

## File Structure

```
src/
├── services/
│   └── api.ts              # API client dan service layer
├── data/
│   └── car.ts             # Data converter dan fetch functions
├── pages/
│   ├── Home.tsx           # Updated dengan API call
│   └── CarDetail.tsx      # Updated dengan API call
└── styles/
    ├── Home.css           # Updated dengan loading/search styles
    └── CarDetail.css      # Updated dengan loading styles
```

## How It Works

### 1. API Service (`src/services/api.ts`)

Menyediakan helper functions untuk semua endpoint API:

```typescript
// Authentication
await authLogin(email, password)
await getAuthUser()

// Listings
await getListings(params?)
await getListingById(id)
await createListing(listing)
await updateListing(id, listing)
await deleteListing(id)

// Categories
await getCategories()
await getCategoryById(id)
await createCategory(category)
await updateCategory(id, category)
await deleteCategory(id)
```

### 2. Data Converter (`src/data/car.ts`)

Converts API responses to internal Car format:

```typescript
// Fetch all cars
const cars = await fetchCars()

// Search cars
const results = await searchCars('toyota')

// Filter by category
const filtered = await filterCarsByCategory('kendaraan')

// Get single car
const car = await fetchCarById('123')
```

### 3. Home Page Usage

```typescript
useEffect(() => {
  loadCars() // Fetch cars on mount
}, [])

const handleSearch = async (term) => {
  const results = await searchCars(term)
  setCars(results)
}
```

## Features

### ✅ Search
- Real-time search functionality
- API endpoint: `GET /api/listings?search=keyword`

### ✅ Pagination
- Supports limit parameter
- Default limit: 12 items

### ✅ Error Handling
- Try-catch blocks di semua API calls
- Error messages ditampilkan ke user
- Fallback ke empty state jika data kosong

### ✅ Loading States
- Loading indicator saat fetch data
- Spinner animation

### ✅ JWT Authentication
- Token stored/retrieved dari localStorage
- Automatically added to request headers
- Can logout with `removeToken()`

## Usage Examples

### Login User
```typescript
import { authLogin, setToken, getToken } from './services/api'

const handleLogin = async () => {
  try {
    const response = await authLogin('user@example.com', 'password')
    console.log('Token:', getToken())
  } catch (error) {
    console.error('Login failed:', error)
  }
}
```

### Search Cars
```typescript
import { searchCars } from './data/car'

const handleSearch = async (keyword) => {
  const results = await searchCars(keyword)
  console.log('Results:', results)
}
```

### Get Categories
```typescript
import { getCategories } from './services/api'

const categories = await getCategories()
```

### Query Parameters
```typescript
// Search with pagination
const listings = await getListings({
  search: 'toyota',
  page: 1,
  limit: 10,
  sort: 'newest'
})

// Filter by category
const listings = await getListings({
  category: 'kendaraan'
})
```

## Data Flow

```
1. Home Page mounts
   ↓
2. useEffect calls fetchCars()
   ↓
3. API Service makes GET /api/listings
   ↓
4. Response converted to Car format
   ↓
5. Data displayed in CarCard components
   ↓
6. User clicks car
   ↓
7. Navigate to /car/:id
   ↓
8. CarDetail fetches car by ID
   ↓
9. Display detail page
```

## Error Handling

Aplikasi menangani beberapa jenis error:

1. **Network Error** - Koneksi gagal
2. **API Error** - Server error (4xx, 5xx)
3. **Data Not Found** - Resource tidak ada
4. **Validation Error** - Input tidak valid

Semua error ditampilkan dalam user-friendly format dengan opsi untuk retry.

## Future Enhancements

- [ ] Add filters (price, year, brand)
- [ ] Add sorting options
- [ ] Add favorites/wishlist
- [ ] Add user reviews and ratings
- [ ] Add image gallery for each car
- [ ] Add comparison tool
- [ ] Add contact form integration

## Troubleshooting

### CORS Error
Jika terjadi CORS error, pastikan API server sudah enable CORS untuk domain frontend Anda.

### Token Expired
Token yang expired otomatis akan hilang dari localStorage. User perlu login kembali.

### No Data Showing
1. Pastikan API server aktif
2. Check browser console untuk error messages
3. Verify API credentials jika using protected endpoints

## API Docs
Full API documentation tersedia di:
```
http://listing-webki-production.up.railway.app/api
```
