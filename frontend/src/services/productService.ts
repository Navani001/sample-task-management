import { getRequest, postRequest, putRequest, deleteRequest } from '@/utils/axios';
import { Product, ProductFormData, ApiResponse, ProductsResponse } from '@/types/product';

const ENDPOINTS = {
  PRODUCTS: 'product/products',
  PRODUCT_BY_ID: (id: string) => `product/product/${id}`,
  CREATE_PRODUCT: 'product/product',
  UPDATE_PRODUCT: (id: string) => `product/product/${id}`,
  DELETE_PRODUCT: (id: string) => `product/product/${id}`,
};

export const productService = {
  // Get all products
  getAllProducts: async (): Promise<Product[]> => {
    try {
      const response = await getRequest<ApiResponse<Product[]>>(ENDPOINTS.PRODUCTS);
      // The axios interceptor returns response.data directly, so response is already the ApiResponse
      if ((response as any).success && Array.isArray((response as any).data)) {
        return (response as any).data;
      }
      return [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  // Get product by ID
  getProductById: async (id: string): Promise<Product | null> => {
    try {
      const response = await getRequest<ApiResponse<Product>>(ENDPOINTS.PRODUCT_BY_ID(id));
      if ((response as any).success && (response as any).data) {
        return (response as any).data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  },

  // Create new product
  createProduct: async (productData: ProductFormData): Promise<Product | null> => {
    try {
      const response = await postRequest<ApiResponse<Product>>(ENDPOINTS.CREATE_PRODUCT, productData);
      if ((response as any).success && (response as any).data) {
        return (response as any).data;
      }
      return null;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Update product
  updateProduct: async (id: string, productData: Partial<ProductFormData>): Promise<Product | null> => {
    try {
      const response = await putRequest<ApiResponse<Product>>(ENDPOINTS.UPDATE_PRODUCT(id), productData);
      if ((response as any).success && (response as any).data) {
        return (response as any).data;
      }
      return null;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Delete product
  deleteProduct: async (id: string): Promise<void> => {
    try {
      await deleteRequest<ApiResponse<void>>(ENDPOINTS.DELETE_PRODUCT(id), {});
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  // Search products (client-side filtering from getAllProducts for now)
  searchProducts: async (query: string): Promise<Product[]> => {
    try {
      const products = await productService.getAllProducts();
      return products.filter((product: Product) => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.name.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  },

  // Filter products by category (client-side filtering from getAllProducts for now)
  filterByCategory: async (category: string): Promise<Product[]> => {
    try {
      const products = await productService.getAllProducts();
      return products.filter((product: Product) => product.category.name === category);
    } catch (error) {
      console.error('Error filtering products:', error);
      return [];
    }
  },
};