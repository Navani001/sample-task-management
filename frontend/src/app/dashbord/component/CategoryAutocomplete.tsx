'use client';

import React from 'react';
import {
    Autocomplete,
    AutocompleteItem,
    Input,
    Spinner,
} from '@heroui/react';
import { Plus } from 'lucide-react';
import { Modals } from '@/component/modal';
import { InputField } from '@/component/input';
import { ButtonComponent } from '@/component/button';

export interface Category {
    id: string;
    name: string;
    createdAt?: string;
}

interface CategoryAutocompleteProps {
    value: string;
    onSelectionChange: (categoryName: string) => void;
    categories?: string[];
    label?: string;
    placeholder?: string;
    isRequired?: boolean;
    variant?: "flat" | "bordered" | "underlined" | "faded";
    onAddCategory?: (categoryName: string) => Promise<boolean>;
}

export const CategoryAutocomplete: React.FC<CategoryAutocompleteProps> = ({
    value,
    onSelectionChange,
    categories = [],
    label = "Category",
    placeholder = "Search or select a category",
    isRequired = false,
    variant = "bordered",
    onAddCategory
}) => {
    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
    const [newCategoryName, setNewCategoryName] = React.useState('');
    const [isAddingCategory, setIsAddingCategory] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');

    // Default categories
    const defaultCategories = [
        'Electronics',
        'Clothing',
        'Books',
        'Home & Garden',
        'Sports',
        'Toys',
        'Food & Beverages',
        'Health & Beauty',
        'Automotive',
        'Office Supplies'
    ];

    // Combine default and custom categories
    const allCategories = Array.from(new Set([...defaultCategories, ...categories]));

    // Filter categories based on search
    const filteredCategories = allCategories.filter(category =>
        category.toLowerCase().includes(searchValue.toLowerCase())
    );

    // Check if current search doesn't match any existing category
    const showAddOption = searchValue.trim() !== '' &&
        !allCategories.some(cat => cat.toLowerCase() === searchValue.toLowerCase());

    const handleAddNewCategory = async () => {
        if (!newCategoryName.trim()) return;

        setIsAddingCategory(true);
        try {
            if (onAddCategory) {
                const success = await onAddCategory(newCategoryName.trim());
                if (success) {
                    onSelectionChange(newCategoryName.trim());
                    setNewCategoryName('');
                    setIsAddModalOpen(false);
                }
            } else {
                // If no onAddCategory handler, just select the new category
                onSelectionChange(newCategoryName.trim());
                setNewCategoryName('');
                setIsAddModalOpen(false);
            }
        } finally {
            setIsAddingCategory(false);
        }
    };

    const handleQuickAdd = () => {
        if (searchValue.trim()) {
            setNewCategoryName(searchValue.trim());
            setIsAddModalOpen(true);
        }
    };

    const ModalContent = (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Add New Category</h3>
            <InputField
                label="Category Name"
                placeholder="Enter category name"
                value={newCategoryName}
                inputOnChange={(e) => setNewCategoryName(e.target.value)}
                isRequired
                variant="bordered"
            />
        </div>
    );

    const ModalFooter = (
        <div className="flex gap-2 justify-end">
            <ButtonComponent
                buttonText="Cancel"
                ButtonVariant="flat"
                handleOnClick={() => {
                    setIsAddModalOpen(false);
                    setNewCategoryName('');
                }}
                isIcon={false}
                baseClassName={isAddingCategory ? 'opacity-50 cursor-not-allowed' : ''}
            />
            <ButtonComponent
                buttonText="Add Category"
                ButtonVariant="solid"
                bgColor={!newCategoryName.trim() || isAddingCategory ? 'bg-gray-300' : 'bg-primary'}
                handleOnClick={handleAddNewCategory}
                isIcon={false}
                baseClassName={!newCategoryName.trim() || isAddingCategory ? 'opacity-50 cursor-not-allowed' : ''}
            />
        </div>
    );

    return (
        <>
            <div className="relative">
                <Autocomplete
                    label={label}
                    placeholder={placeholder}
                    variant={variant}
                    isRequired={isRequired}
                    selectedKey={value}
                    onSelectionChange={(key) => {
                        if (key) {
                            onSelectionChange(key.toString());
                        }
                    }}
                    onInputChange={(inputValue) => {
                        setSearchValue(inputValue);
                        // If user types something that's not in the list, clear selection
                        if (inputValue !== value) {
                            onSelectionChange('');
                        }
                    }}
                    allowsCustomValue
                    inputValue={searchValue || value}
                >
                    {filteredCategories.map((category) => (
                        <AutocompleteItem key={category}>
                            {category}
                        </AutocompleteItem>
                    ))}
                </Autocomplete>

                {/* Quick add button when search doesn't match existing categories */}
                {showAddOption && (
                    <div className="mt-2">
                        <ButtonComponent
                            buttonText={`Add "${searchValue}" as new category`}
                            buttonIcon={<Plus className="w-4 h-4" />}
                            ButtonVariant="flat"
                            bgColor="bg-primary"
                            handleOnClick={handleQuickAdd}
                            baseClassName="text-xs h-8 w-auto"
                        />
                    </div>
                )}
            </div>

            {/* Add Category Modal */}
            <Modals
                isopen={isAddModalOpen}
                onClose={() => {
                    setIsAddModalOpen(false);
                    setNewCategoryName('');
                }}
                ModalContents={ModalContent}
                ModalFooterContent={ModalFooter}
                size="md"
            />
        </>
    );
};