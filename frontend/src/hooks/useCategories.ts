'use client';

import { useState, useEffect, useCallback } from 'react';
import { Category, categoryService } from '@/services/categoryService';
import { useToast } from '@/contexts/ToastContext';

interface UseCategoriesReturn {
  categories: Category[];
  categoryNames: string[];
  loading: boolean;
  error: string | null;
  addCategory: (categoryData: { id: number; name: string } | string) => Promise<Category | null>;
  deleteCategory: (id: string) => Promise<boolean>;
  refreshCategories: () => Promise<void>;
}

export const useCategories = (): UseCategoriesReturn => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useToast();

  // Get category names from categories array
  const categoryNames = categories.map(cat => cat.name);

  // Fetch all categories
  const refreshCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedCategories = await categoryService.getAllCategories();
      setCategories(fetchedCategories);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch categories';
      setError(errorMessage);
      addToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  // Add new category
  const addCategory = async (categoryData: { id: number; name: string } | string): Promise<Category | null> => {
    try {
      // Handle both old string format and new object format for backward compatibility
      let categoryToCreate;
      if (typeof categoryData === 'string') {
        const trimmedName = categoryData.trim();
        if (!trimmedName) {
          addToast('Category name cannot be empty', 'error');
          return null;
        }
        categoryToCreate = trimmedName;
      } else {
        if (!categoryData.name.trim() || !categoryData.id) {
          addToast('Category ID and name cannot be empty', 'error');
          return null;
        }
        categoryToCreate = categoryData;
      }

      const newCategory = await categoryService.createCategory(categoryToCreate);
      if (newCategory) {
        setCategories(prev => [...prev, newCategory]);
        addToast('Category created successfully!', 'success');
        return newCategory;
      }
      
      addToast('Failed to create category', 'error');
      return null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create category';
      setError(errorMessage);
      addToast(errorMessage, 'error');
      return null;
    }
  };

  // Delete category
  const deleteCategory = async (id: string): Promise<boolean> => {
    try {
      await categoryService.deleteCategory(id);
      setCategories(prev => prev.filter(cat => cat.id !== parseInt(id)));
      addToast('Category deleted successfully!', 'success');
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete category';
      setError(errorMessage);
      addToast(errorMessage, 'error');
      return false;
    }
  };



  // Load categories on component mount
  useEffect(() => {
    refreshCategories();
  }, [refreshCategories]);

  return {
    categories,
    categoryNames,
    loading,
    error,
    addCategory,
    deleteCategory,
    refreshCategories,
  };
};