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
import { Category } from '@/services/categoryService';
import { useCategories } from '@/hooks/useCategories';

interface CategoryAutocompleteProps {
    value: number;
    onSelectionChange: (categoryId: number) => void;
    label?: string;
    placeholder?: string;
    isRequired?: boolean;
    variant?: "flat" | "bordered" | "underlined" | "faded";
}

export const CategoryAutocomplete: React.FC<CategoryAutocompleteProps> = ({
    value,
    onSelectionChange,
    label = "Category",
    placeholder = "Search or select a category",
    isRequired = false,
    variant = "bordered"
}) => {
    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
    const [newCategoryName, setNewCategoryName] = React.useState('');
    const [newCategoryId, setNewCategoryId] = React.useState('');
    const [isAddingCategory, setIsAddingCategory] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');

    // Get categories from API
    const { categories, addCategory } = useCategories();

    // Filter categories based on search
    const filteredCategories = categories.filter((category: Category) =>
        category.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    // Check if current search doesn't match any existing category
    const showAddOption = searchValue.trim() !== '' &&
        !categories.some((cat: Category) => cat.name.toLowerCase() === searchValue.toLowerCase());

    // Get selected category name for display
    const selectedCategory = categories.find((cat: Category) => cat.id === value);
    const displayValue = selectedCategory ? selectedCategory.name : '';

    const handleAddNewCategory = async () => {
        if (!newCategoryName.trim() || !newCategoryId.trim()) return;

        setIsAddingCategory(true);
        try {
            const categoryData = {
                id: parseInt(newCategoryId.trim()),
                name: newCategoryName.trim()
            };
            const newCategory = await addCategory(categoryData);
            if (newCategory) {
                onSelectionChange(newCategory.id);
                setNewCategoryName('');
                setNewCategoryId('');
                setIsAddModalOpen(false);
            }
        } finally {
            setIsAddingCategory(false);
        }
    };

    const handleQuickAdd = () => {
        if (searchValue.trim()) {
            setNewCategoryName(searchValue.trim());
            setNewCategoryId(''); // Clear ID field when quick adding
            setIsAddModalOpen(true);
        }
    };

    const ModalContent = (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Add New Category</h3>
            <InputField
                label="Category ID"
                placeholder="Enter category ID"
                value={newCategoryId}
                inputOnChange={(e) => setNewCategoryId(e.target.value)}
                isRequired
                variant="bordered"
                type="number"
            />
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
                    setNewCategoryId('');
                }}
                isIcon={false}
                baseClassName={isAddingCategory ? 'opacity-50 cursor-not-allowed' : ''}
            />
            <ButtonComponent
                buttonText="Add Category"
                ButtonVariant="solid"
                bgColor={!newCategoryName.trim() || !newCategoryId.trim() || isAddingCategory ? 'bg-gray-300' : 'bg-primary'}
                handleOnClick={handleAddNewCategory}
                isIcon={false}
                baseClassName={!newCategoryName.trim() || !newCategoryId.trim() || isAddingCategory ? 'opacity-50 cursor-not-allowed' : ''}
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
                    selectedKey={value ? value.toString() : undefined}
                    onSelectionChange={(key) => {
                        if (key) {
                            onSelectionChange(parseInt(key.toString()));
                        }
                    }}
                    onInputChange={(inputValue) => {
                        setSearchValue(inputValue);
                        // If user types something that doesn't match selected category, clear selection
                        if (inputValue !== displayValue) {
                            onSelectionChange(0);
                        }
                    }}
                    allowsCustomValue
                    inputValue={searchValue || displayValue}
                >
                    {filteredCategories.map((category: Category) => (
                        <AutocompleteItem key={category.id.toString()}>
                            {category.name}
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