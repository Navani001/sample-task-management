import { getRequest, postRequest, deleteRequest } from '@/utils/axios';

export interface Category {
  id: string;
  name: string;
  createdAt?: string;
}

// Mock categories for local storage
const CATEGORIES_STORAGE_KEY = 'product_categories';

// Default categories
const defaultCategories: Category[] = [
  { id: '1', name: 'Electronics', createdAt: new Date().toISOString() },
  { id: '2', name: 'Clothing', createdAt: new Date().toISOString() },
  { id: '3', name: 'Books', createdAt: new Date().toISOString() },
  { id: '4', name: 'Home & Garden', createdAt: new Date().toISOString() },
  { id: '5', name: 'Sports', createdAt: new Date().toISOString() },
  { id: '6', name: 'Toys', createdAt: new Date().toISOString() },
  { id: '7', name: 'Food & Beverages', createdAt: new Date().toISOString() },
  { id: '8', name: 'Health & Beauty', createdAt: new Date().toISOString() },
  { id: '9', name: 'Automotive', createdAt: new Date().toISOString() },
  { id: '10', name: 'Office Supplies', createdAt: new Date().toISOString() },
];

// Initialize categories in localStorage if not exists
const initializeCategories = (): Category[] => {
  if (typeof window === 'undefined') return defaultCategories;
  
  const stored = localStorage.getItem(CATEGORIES_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(defaultCategories));
    return defaultCategories;
  }
  
  try {
    return JSON.parse(stored);
  } catch {
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(defaultCategories));
    return defaultCategories;
  }
};

// Save categories to localStorage
const saveCategories = (categories: Category[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
  }
};

const ENDPOINTS = {
  CATEGORIES: 'categories',
  CATEGORY_BY_ID: (id: string) => `categories/${id}`,
};

// Flag to use mock data when backend is not available
const USE_MOCK_DATA = true;

export const categoryService = {
  // Get all categories
  getAllCategories: async (): Promise<Category[]> => {
    if (USE_MOCK_DATA) {
      try {
        await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
        return initializeCategories();
      } catch (error) {
        console.error('Error fetching mock categories:', error);
        return defaultCategories;
      }
    }

    try {
      const response = await getRequest<Category[]>(ENDPOINTS.CATEGORIES);
      return Array.isArray(response) ? response : [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  // Get category names only
  getCategoryNames: async (): Promise<string[]> => {
    const categories = await categoryService.getAllCategories();
    return categories.map(cat => cat.name);
  },

  // Create new category
  createCategory: async (categoryName: string): Promise<Category | null> => {
    if (USE_MOCK_DATA) {
      try {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
        
        const existingCategories = initializeCategories();
        
        // Check if category already exists
        if (existingCategories.some(cat => cat.name.toLowerCase() === categoryName.toLowerCase())) {
          throw new Error('Category already exists');
        }
        
        const newCategory: Category = {
          id: (existingCategories.length + 1).toString(),
          name: categoryName,
          createdAt: new Date().toISOString(),
        };
        
        const updatedCategories = [...existingCategories, newCategory];
        saveCategories(updatedCategories);
        
        return newCategory;
      } catch (error) {
        console.error('Error creating mock category:', error);
        throw error;
      }
    }

    try {
      const response = await postRequest<Category>(ENDPOINTS.CATEGORIES, { name: categoryName });
      return response as unknown as Category;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },

  // Delete category
  deleteCategory: async (id: string): Promise<void> => {
    if (USE_MOCK_DATA) {
      try {
        await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
        
        const existingCategories = initializeCategories();
        const updatedCategories = existingCategories.filter(cat => cat.id !== id);
        saveCategories(updatedCategories);
        
        return;
      } catch (error) {
        console.error('Error deleting mock category:', error);
        throw error;
      }
    }

    try {
      await deleteRequest(ENDPOINTS.CATEGORY_BY_ID(id), {});
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  },

  // Check if category exists
  categoryExists: async (categoryName: string): Promise<boolean> => {
    const categories = await categoryService.getAllCategories();
    return categories.some(cat => cat.name.toLowerCase() === categoryName.toLowerCase());
  },
};