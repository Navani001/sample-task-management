import { getRequest, postRequest, deleteRequest } from '@/utils/axios';
import { ApiResponse } from '@/types/product';

export interface Category {
  id: number;
  name: string;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const ENDPOINTS = {
  CATEGORIES: 'category/categories',
  CREATE_CATEGORY: 'category/category',
  DELETE_CATEGORY: (id: string) => `category/category/${id}`,
};

export const categoryService = {
  // Get all categories
  getAllCategories: async (): Promise<Category[]> => {
    try {
      const response = await getRequest<ApiResponse<Category[]>>(ENDPOINTS.CATEGORIES);
      if ((response as any).success && Array.isArray((response as any).data)) {
        return (response as any).data;
      }
      return [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  // Get category names only
  getCategoryNames: async (): Promise<string[]> => {
    const categories = await categoryService.getAllCategories();
    return categories.map((cat: Category) => cat.name);
  },

  // Create new category
  createCategory: async (categoryData: string | { id: number; name: string }): Promise<Category | null> => {
    try {
      // Handle both old string format and new object format
      const requestData = typeof categoryData === 'string' 
        ? { name: categoryData }
        : categoryData;
        
      const response = await postRequest<ApiResponse<Category>>(ENDPOINTS.CREATE_CATEGORY, requestData);
      if ((response as any).success && (response as any).data) {
        return (response as any).data;
      }
      return null;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },

  // Delete category
  deleteCategory: async (id: string): Promise<void> => {
    try {
      await deleteRequest(ENDPOINTS.DELETE_CATEGORY(id), {});
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  },

  // Check if category exists
  categoryExists: async (categoryName: string): Promise<boolean> => {
    const categories = await categoryService.getAllCategories();
    return categories.some((cat: Category) => cat.name.toLowerCase() === categoryName.toLowerCase());
  },
};