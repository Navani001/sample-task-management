export interface Product {
  id: number;
  name: string;
  categoryId: number;
  category: {
    id: number;
    name: string;
  };
  price: string | number;
  stock: number;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductFormData {
  name: string;
  categoryId: number;
  price: number;
  stock: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

// Helper interface for displaying product with category name
export interface ProductDisplay extends Omit<Product, 'category'> {
  category: string; // Just the category name for display
}