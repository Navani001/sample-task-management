import { getRequest, postRequest, putRequest, deleteRequest } from '@/utils/axios';
import { Product, ProductFormData, ApiResponse, ProductsResponse } from '@/types/product';
import { 
  getMockProducts, 
  getMockProductById, 
  createMockProduct, 
  updateMockProduct, 
  deleteMockProduct 
} from '@/data/mockData';

const ENDPOINTS = {
  PRODUCTS: 'products',
  PRODUCT_BY_ID: (id: string) => `products/${id}`,
};

// Flag to use mock data when backend is not available
const USE_MOCK_DATA = true;

export const productService = {
  // Get all products
  getAllProducts: async (): Promise<Product[]> => {
    if (USE_MOCK_DATA) {
      try {
        return await getMockProducts();
      } catch (error) {
        console.error('Error fetching mock products:', error);
        return [];
      }
    }

    try {
      const response = await getRequest<Product[]>(ENDPOINTS.PRODUCTS);
      return Array.isArray(response) ? response : [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  // Get product by ID
  getProductById: async (id: string): Promise<Product | null> => {
    if (USE_MOCK_DATA) {
      try {
        return await getMockProductById(id);
      } catch (error) {
        console.error('Error fetching mock product:', error);
        return null;
      }
    }

    try {
      const response = await getRequest<Product>(ENDPOINTS.PRODUCT_BY_ID(id));
      return response as unknown as Product;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  },

  // Create new product
  createProduct: async (productData: ProductFormData): Promise<Product | null> => {
    if (USE_MOCK_DATA) {
      try {
        return await createMockProduct(productData);
      } catch (error) {
        console.error('Error creating mock product:', error);
        throw error;
      }
    }

    try {
      const response = await postRequest<Product>(ENDPOINTS.PRODUCTS, productData);
      return response as unknown as Product;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Update product
  updateProduct: async (id: string, productData: Partial<ProductFormData>): Promise<Product | null> => {
    if (USE_MOCK_DATA) {
      try {
        return await updateMockProduct(id, productData);
      } catch (error) {
        console.error('Error updating mock product:', error);
        throw error;
      }
    }

    try {
      const response = await putRequest<Product>(ENDPOINTS.PRODUCT_BY_ID(id), productData);
      return response as unknown as Product;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Delete product
  deleteProduct: async (id: string): Promise<void> => {
    if (USE_MOCK_DATA) {
      try {
        const success = await deleteMockProduct(id);
        if (!success) {
          throw new Error('Product not found');
        }
        return;
      } catch (error) {
        console.error('Error deleting mock product:', error);
        throw error;
      }
    }

    try {
      await deleteRequest<ApiResponse<void>>(ENDPOINTS.PRODUCT_BY_ID(id), {});
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  // Search products
  searchProducts: async (query: string): Promise<Product[]> => {
    if (USE_MOCK_DATA) {
      try {
        const products = await getMockProducts();
        return products.filter(product => 
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
        );
      } catch (error) {
        console.error('Error searching mock products:', error);
        return [];
      }
    }

    try {
      const response = await getRequest<Product[]>(`${ENDPOINTS.PRODUCTS}/search?q=${encodeURIComponent(query)}`);
      return Array.isArray(response) ? response : [];
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  },

  // Filter products by category
  filterByCategory: async (category: string): Promise<Product[]> => {
    if (USE_MOCK_DATA) {
      try {
        const products = await getMockProducts();
        return products.filter(product => product.category === category);
      } catch (error) {
        console.error('Error filtering mock products:', error);
        return [];
      }
    }

    try {
      const response = await getRequest<Product[]>(`${ENDPOINTS.PRODUCTS}/category/${encodeURIComponent(category)}`);
      return Array.isArray(response) ? response : [];
    } catch (error) {
      console.error('Error filtering products:', error);
      return [];
    }
  },
};