'use client';

import { useState, useEffect, useCallback } from 'react';
import { Category, categoryService } from '@/services/categoryService';
import { useToast } from '@/contexts/ToastContext';

interface UseCategoriesReturn {
  categories: Category[];
  categoryNames: string[];
  loading: boolean;
  error: string | null;
  addCategory: (name: string) => Promise<boolean>;
  deleteCategory: (id: string) => Promise<boolean>;
  refreshCategories: () => Promise<void>;
  categoryExists: (name: string) => Promise<boolean>;
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
  const addCategory = async (name: string): Promise<boolean> => {
    try {
      const trimmedName = name.trim();
      if (!trimmedName) {
        addToast('Category name cannot be empty', 'error');
        return false;
      }

      // Check if category already exists
      const exists = await categoryService.categoryExists(trimmedName);
      if (exists) {
        addToast('Category already exists', 'error');
        return false;
      }

      const newCategory = await categoryService.createCategory(trimmedName);
      if (newCategory) {
        setCategories(prev => [...prev, newCategory]);
        addToast('Category created successfully!', 'success');
        return true;
      }
      
      addToast('Failed to create category', 'error');
      return false;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create category';
      setError(errorMessage);
      addToast(errorMessage, 'error');
      return false;
    }
  };

  // Delete category
  const deleteCategory = async (id: string): Promise<boolean> => {
    try {
      await categoryService.deleteCategory(id);
      setCategories(prev => prev.filter(cat => cat.id !== id));
      addToast('Category deleted successfully!', 'success');
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete category';
      setError(errorMessage);
      addToast(errorMessage, 'error');
      return false;
    }
  };

  // Check if category exists
  const categoryExists = async (name: string): Promise<boolean> => {
    try {
      return await categoryService.categoryExists(name);
    } catch (err) {
      console.error('Error checking category existence:', err);
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
    categoryExists,
  };
};