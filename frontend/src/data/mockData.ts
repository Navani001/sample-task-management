import { Product } from '@/types/product';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 14 Pro',
    category: 'Electronics',
    price: 999.99,
    stock: 15,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Nike Air Max 270',
    category: 'Clothing',
    price: 129.99,
    stock: 5,
    createdAt: '2024-01-14T09:15:00Z',
    updatedAt: '2024-01-14T09:15:00Z'
  },
  {
    id: '3',
    name: 'The Great Gatsby',
    category: 'Books',
    price: 12.99,
    stock: 0,
    createdAt: '2024-01-13T14:20:00Z',
    updatedAt: '2024-01-13T14:20:00Z'
  },
  {
    id: '4',
    name: 'Garden Shovel',
    category: 'Home & Garden',
    price: 24.99,
    stock: 3,
    createdAt: '2024-01-12T16:45:00Z',
    updatedAt: '2024-01-12T16:45:00Z'
  },
  {
    id: '5',
    name: 'Basketball',
    category: 'Sports',
    price: 29.99,
    stock: 12,
    createdAt: '2024-01-11T11:00:00Z',
    updatedAt: '2024-01-11T11:00:00Z'
  },
  {
    id: '6',
    name: 'LEGO City Set',
    category: 'Toys',
    price: 79.99,
    stock: 8,
    createdAt: '2024-01-10T13:30:00Z',
    updatedAt: '2024-01-10T13:30:00Z'
  },
  {
    id: '7',
    name: 'MacBook Pro M3',
    category: 'Electronics',
    price: 1999.99,
    stock: 7,
    createdAt: '2024-01-09T08:20:00Z',
    updatedAt: '2024-01-09T08:20:00Z'
  },
  {
    id: '8',
    name: 'Winter Jacket',
    category: 'Clothing',
    price: 89.99,
    stock: 2,
    createdAt: '2024-01-08T15:10:00Z',
    updatedAt: '2024-01-08T15:10:00Z'
  }
];

// Helper function to get mock products with delay to simulate API call
export const getMockProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 1000); // 1 second delay
  });
};

// Helper to find product by ID
export const getMockProductById = (id: string): Promise<Product | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = mockProducts.find(p => p.id === id || p._id === id);
      resolve(product || null);
    }, 500);
  });
};

// Helper to create a new mock product
export const createMockProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newProduct: Product = {
        ...productData,
        id: (mockProducts.length + 1).toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockProducts.push(newProduct);
      resolve(newProduct);
    }, 800);
  });
};

// Helper to update a mock product
export const updateMockProduct = (id: string, updates: Partial<Product>): Promise<Product | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockProducts.findIndex(p => p.id === id || p._id === id);
      if (index !== -1) {
        mockProducts[index] = {
          ...mockProducts[index],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
        resolve(mockProducts[index]);
      } else {
        resolve(null);
      }
    }, 600);
  });
};

// Helper to delete a mock product
export const deleteMockProduct = (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockProducts.findIndex(p => p.id === id || p._id === id);
      if (index !== -1) {
        mockProducts.splice(index, 1);
        resolve(true);
      } else {
        resolve(false);
      }
    }, 500);
  });
};