// API Configuration
const API_BASE_URL = import.meta.env.PROD ? 'https://listing-webki-production.up.railway.app/api' : '/api';

export interface ListingApiResponse {
  id: string | number;
  title: string;
  description: string;
  price?: number;
  imageUrl: string;
  category?: string;
  categoryId?: string | number;
  createdAt: string;
  updatedAt: string;
  metadata?: {
    fuel?: string;
    year?: number;
    brand?: string;
    model?: string;
    price?: number;
    transmission?: string;
  };
}

export interface CategoriesApiResponse {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface ListingsQueryParams {
  search?: string;
  category?: string;
  sort?: 'newest' | 'oldest';
  page?: number;
  limit?: number;
}

// Local Storage for JWT Token
const TOKEN_KEY = 'listing_jwt_token';

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

// API Request Helper
const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

// ============ AUTHENTICATION ============
export const authLogin = async (email: string, password: string): Promise<LoginResponse> => {
  const data = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  setToken(data.token);
  return data;
};

export const getAuthUser = async () => {
  return apiRequest('/auth/me', {
    method: 'GET',
  });
};

// ============ LISTINGS ============
export const getListings = async (params?: ListingsQueryParams): Promise<ListingApiResponse[]> => {
  const queryString = new URLSearchParams();

  // Always filter by kendaraan category
  queryString.append('category', 'kendaraan');

  if (params?.search) queryString.append('search', params.search);
  if (params?.category) queryString.append('category', params.category);
  if (params?.sort) queryString.append('sort', params.sort);
  if (params?.page) queryString.append('page', params.page.toString());
  if (params?.limit) queryString.append('limit', params.limit.toString());

  const endpoint = `/listings${queryString.toString() ? `?${queryString.toString()}` : ''}`;
  const data = await apiRequest(endpoint, { method: 'GET' });

  return Array.isArray(data) ? data : data.data || [];
};

export const getListingById = async (id: string | number): Promise<ListingApiResponse> => {
  const data = await apiRequest(`/listings/${id}`, { method: 'GET' });
  // Handle both direct response and wrapped response
  return data.data || data || null;
};

export const createListing = async (listing: Partial<ListingApiResponse>): Promise<ListingApiResponse> => {
  return apiRequest('/listings', {
    method: 'POST',
    body: JSON.stringify(listing),
  });
};

export const updateListing = async (
  id: string,
  listing: Partial<ListingApiResponse>
): Promise<ListingApiResponse> => {
  return apiRequest(`/listings/${id}`, {
    method: 'PUT',
    body: JSON.stringify(listing),
  });
};

export const deleteListing = async (id: string): Promise<void> => {
  return apiRequest(`/listings/${id}`, {
    method: 'DELETE',
  });
};

// ============ CATEGORIES ============
export const getCategories = async (slug?: string): Promise<CategoriesApiResponse[]> => {
  let endpoint = '/categories';
  if (slug) {
    endpoint += `?slug=${slug}`;
  }
  const data = await apiRequest(endpoint, { method: 'GET' });
  return Array.isArray(data) ? data : data.data || [];
};

export const getKendaraanCategory = async (): Promise<CategoriesApiResponse | null> => {
  const categories = await getCategories('kendaraan');
  return categories.length > 0 ? categories[0] : null;
};

export const getCategoryById = async (id: string): Promise<CategoriesApiResponse> => {
  return apiRequest(`/categories/${id}`, { method: 'GET' });
};

export const createCategory = async (category: Partial<CategoriesApiResponse>): Promise<CategoriesApiResponse> => {
  return apiRequest('/categories', {
    method: 'POST',
    body: JSON.stringify(category),
  });
};

export const updateCategory = async (
  id: string,
  category: Partial<CategoriesApiResponse>
): Promise<CategoriesApiResponse> => {
  return apiRequest(`/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(category),
  });
};

export const deleteCategory = async (id: string): Promise<void> => {
  return apiRequest(`/categories/${id}`, {
    method: 'DELETE',
  });
};
