'use client';

import { useState, useEffect, useCallback } from 'react';
import { Product, ProductFormData } from '@/types/product';
import { productService } from '@/services/productService';
import { useToast } from '@/contexts/ToastContext';

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  selectedCategory: string;
  filteredProducts: Product[];
  categories: string[];
  refreshProducts: () => Promise<void>;
  addProduct: (product: ProductFormData) => Promise<boolean>;
  updateProduct: (id: string, product: Partial<ProductFormData>) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
}

export const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const { addToast } = useToast();

  // Get unique categories from products
  const categories = Array.from(new Set(products.map(product => product.category.name)));

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || product.category.name === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Fetch all products
  const refreshProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedProducts = await productService.getAllProducts();
      setProducts(fetchedProducts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, []);

  // Add new product
  const addProduct = async (productData: ProductFormData): Promise<boolean> => {
    try {
      const newProduct = await productService.createProduct(productData);
      if (newProduct) {
        setProducts(prev => [...prev, newProduct]);
        addToast('Product created successfully!', 'success');
        return true;
      }
      addToast('Failed to create product', 'error');
      return false;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create product';
      setError(errorMessage);
      addToast(errorMessage, 'error');
      return false;
    }
  };

  // Update existing product
  const updateProduct = async (id: string, productData: Partial<ProductFormData>): Promise<boolean> => {
    try {
      const updatedProduct = await productService.updateProduct(id, productData);
      if (updatedProduct) {
        setProducts(prev => 
          prev.map(product => 
            product.id === parseInt(id) ? updatedProduct : product
          )
        );
        addToast('Product updated successfully!', 'success');
        return true;
      }
      addToast('Failed to update product', 'error');
      return false;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update product';
      setError(errorMessage);
      addToast(errorMessage, 'error');
      return false;
    }
  };

  // Delete product
  const deleteProduct = async (id: string): Promise<boolean> => {
    try {
      await productService.deleteProduct(id);
      setProducts(prev => prev.filter(product => product.id !== parseInt(id)));
      addToast('Product deleted successfully!', 'success');
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete product';
      setError(errorMessage);
      addToast(errorMessage, 'error');
      return false;
    }
  };

  // Load products on component mount
  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  return {
    products,
    loading,
    error,
    searchTerm,
    selectedCategory,
    filteredProducts,
    categories,
    refreshProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    setSearchTerm,
    setSelectedCategory,
  };
};