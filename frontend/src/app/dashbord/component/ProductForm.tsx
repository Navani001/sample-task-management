'use client';

import React from 'react';
import {
    Input,
    Select,
    SelectItem
} from '@heroui/react';
import { Product, ProductFormData } from '@/types/product';
import { CategoryAutocomplete } from '@/component/autocomplete';
import { ButtonComponent } from '@/component/button';
import { Modals } from '@/component/modal'; interface ProductFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (product: ProductFormData) => Promise<boolean>;
    initialData?: Product | null;
    title?: string;
}

export const ProductForm: React.FC<ProductFormProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData = null,
    title = "Add New Product"
}) => {
    const [formData, setFormData] = React.useState<ProductFormData>({
        name: '',
        categoryId: 0,
        price: 0,
        stock: 0
    });
    const [loading, setLoading] = React.useState(false);    // Reset form when modal opens/closes or initial data changes
    React.useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData({
                    name: initialData.name,
                    categoryId: initialData.categoryId,
                    price: typeof initialData.price === 'string' ? parseFloat(initialData.price) : initialData.price,
                    stock: initialData.stock
                });
            } else {
                setFormData({
                    name: '',
                    categoryId: 0,
                    price: 0,
                    stock: 0
                });
            }
        }
    }, [isOpen, initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.categoryId || formData.categoryId === 0) {
            return;
        }

        setLoading(true);
        try {
            const success = await onSubmit(formData);
            if (success) {
                onClose();
            }
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: keyof ProductFormData, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const ModalContent = (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    autoFocus
                    label="Product Name"
                    placeholder="Enter product name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    variant="bordered"
                    isRequired
                />

                <CategoryAutocomplete
                    label="Category"
                    placeholder="Search or select a category"
                    value={formData.categoryId}
                    onSelectionChange={(categoryId) => handleInputChange('categoryId', categoryId)}
                    variant="bordered"
                    isRequired
                />

                <Input
                    label="Price"
                    placeholder="0.00"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price.toString()}
                    onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                    variant="bordered"
                    startContent={
                        <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">$</span>
                        </div>
                    }
                    isRequired
                />

                <Input
                    label="Stock Quantity"
                    placeholder="0"
                    type="number"
                    min="0"
                    value={formData.stock.toString()}
                    onChange={(e) => handleInputChange('stock', parseInt(e.target.value) || 0)}
                    variant="bordered"
                    isRequired
                />
            </form>
        </div>
    );

    const handleFormSubmit = () => {
        const event = new Event('submit', { bubbles: true, cancelable: true });
        handleSubmit(event as unknown as React.FormEvent);
    };

    const ModalFooter = (
        <div className="flex gap-2 justify-end">
            <ButtonComponent
                buttonText="Cancel"
                ButtonVariant="flat"
                bgColor="bg-red-100"
                handleOnClick={onClose}
                isIcon={false}
                type="button"
                baseClassName={loading ? 'opacity-50 cursor-not-allowed' : ''}
            />
            <ButtonComponent
                buttonText={initialData ? 'Update Product' : 'Add Product'}
                ButtonVariant="solid"
                bgColor="bg-primary"
                isIcon={false}
                handleOnClick={handleFormSubmit}
                baseClassName={loading ? 'opacity-50 cursor-not-allowed' : ''}
            />
        </div>
    );

    return (
        <Modals
            isopen={isOpen}
            onClose={onClose}
            ModalContents={ModalContent}
            ModalFooterContent={ModalFooter}
            size="lg"
        />
    );
};