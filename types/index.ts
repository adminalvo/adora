export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image?: string | null;
  image_url?: string | null;
  category?: string;
  category_id?: string | null;
  stock: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: Date;
  status: 'pending' | 'completed' | 'cancelled';
}
