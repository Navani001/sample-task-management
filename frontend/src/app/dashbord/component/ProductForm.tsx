'use client';

import React from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Select,
    SelectItem
} from '@heroui/react';
import { Product, ProductFormData } from '@/types/product';
import { CategoryAutocomplete } from './CategoryAutocomplete';
import { useCategories } from '@/hooks/useCategories';
import { ButtonComponent } from '@/component/button'; interface ProductFormProps {
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
    const [loading, setLoading] = React.useState(false);
    const { categories, addCategory } = useCategories();    // Reset form when modal opens/closes or initial data changes
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

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            placement="top-center"
            size="lg"
        >
            <ModalContent>
                <form onSubmit={handleSubmit}>
                    <ModalHeader className="flex flex-col gap-1">
                        {title}
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-4">
                            <Input
                                autoFocus
                                label="Product Name"
                                placeholder="Enter product name"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                variant="bordered"
                                isRequired
                            />

                            <Select
                                label="Category"
                                placeholder="Select a category"
                                selectedKeys={formData.categoryId ? [formData.categoryId.toString()] : []}
                                onSelectionChange={(keys) => {
                                    const selected = Array.from(keys)[0] as string;
                                    handleInputChange('categoryId', selected ? parseInt(selected) : 0);
                                }}
                                variant="bordered"
                                isRequired
                            >
                                {categories.map((category) => (
                                    <SelectItem key={category.id.toString()}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </Select>

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
                        </div>
                    </ModalBody>
                    <ModalFooter>
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
                            type="submit"
                            baseClassName={loading ? 'opacity-50 cursor-not-allowed' : ''}
                        />
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};