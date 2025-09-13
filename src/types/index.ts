export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  short_description?: string;
  price: number;
  category_id?: string;
  category?: Category;
  images: string[];
  team?: string;
  sport?: string;
  size?: string;
  material?: string;
  is_featured: boolean;
  is_active: boolean;
  stock_quantity: number;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export type FilterOptions = {
  category?: string;
  sport?: string;
  team?: string;
  priceRange?: [number, number];
  search?: string;
}

export type SortOption = 'name' | 'price-asc' | 'price-desc' | 'newest';