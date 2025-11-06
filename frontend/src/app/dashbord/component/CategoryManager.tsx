'use client';

import React from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Input,
    Chip,
    Tooltip,
    Spinner,
    Divider
} from '@heroui/react';
import { Plus, Trash2, Tag } from 'lucide-react';
import { useCategories } from '@/hooks/useCategories';
import { Modals } from '@/component/modal';
import { InputField } from '@/component/input';
import { ButtonComponent } from '@/component/button';

export const CategoryManager: React.FC = () => {
    const {
        categories,
        loading,
        error,
        addCategory,
        deleteCategory,
    } = useCategories();

    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
    const [newCategoryName, setNewCategoryName] = React.useState('');
    const [isAdding, setIsAdding] = React.useState(false);
    const [deletingId, setDeletingId] = React.useState<string | null>(null);

    const handleAddCategory = async () => {
        if (!newCategoryName.trim()) return;

        setIsAdding(true);
        try {
            const success = await addCategory(newCategoryName.trim());
            if (success) {
                setNewCategoryName('');
                setIsAddModalOpen(false);
            }
        } finally {
            setIsAdding(false);
        }
    };

    const handleDeleteCategory = async (id: number) => {
        setDeletingId(id.toString());
        try {
            await deleteCategory(id.toString());
        } finally {
            setDeletingId(null);
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
                baseClassName={isAdding ? 'opacity-50 cursor-not-allowed' : ''}
            />
            <ButtonComponent
                buttonText="Add Category"
                ButtonVariant="solid"
                bgColor={!newCategoryName.trim() || isAdding ? 'bg-gray-300' : 'bg-primary'}
                handleOnClick={handleAddCategory}
                isIcon={false}
                baseClassName={!newCategoryName.trim() || isAdding ? 'opacity-50 cursor-not-allowed' : ''}
            />
        </div>
    );

    if (loading) {
        return (
            <Card>
                <CardBody className="flex justify-center items-center py-8">
                    <Spinner size="lg" />
                </CardBody>
            </Card>
        );
    }

    if (error) {
        return (
            <Card>
                <CardBody>
                    <p className="text-danger text-center">{error}</p>
                </CardBody>
            </Card>
        );
    }

    return (
        <>
            <Card>
                <CardHeader className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Tag className="w-5 h-5" />
                        <h3 className="text-lg font-semibold">Category Management</h3>
                    </div>
                    <ButtonComponent
                        buttonText="Add Category"
                        buttonIcon={<Plus className="w-4 h-4" />}
                        handleOnClick={() => setIsAddModalOpen(true)}
                        ButtonVariant="solid"
                        bgColor="bg-primary"
                        baseClassName="h-8 w-auto px-3"
                    />
                </CardHeader>
                <Divider />
                <CardBody>
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                            Manage product categories. Categories are used to organize products and make them easier to find.
                        </p>

                        {categories.length === 0 ? (
                            <div className="text-center py-8">
                                <Tag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <h4 className="text-lg font-medium text-gray-600 mb-2">No categories found</h4>
                                <p className="text-gray-500 mb-4">Create your first category to get started</p>
                                <ButtonComponent
                                    buttonText="Add Category"
                                    buttonIcon={<Plus className="w-4 h-4" />}
                                    handleOnClick={() => setIsAddModalOpen(true)}
                                    ButtonVariant="solid"
                                    bgColor="bg-primary"
                                />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {categories.map((category) => (
                                    <div
                                        key={category.id}
                                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-2 flex-1">
                                            <Chip size="sm" variant="flat" color="primary">
                                                {category.name}
                                            </Chip>
                                        </div>
                                        <Tooltip content="Delete category">
                                            <ButtonComponent
                                                buttonIcon={<Trash2 className="w-4 h-4" />}
                                                ButtonVariant="light"
                                                handleOnClick={() => handleDeleteCategory(category.id)}
                                                baseClassName={`h-8 w-8 min-w-8 ${deletingId === category.id.toString() ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                buttonText=""
                                                isIcon={true}
                                            />
                                        </Tooltip>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-medium text-blue-900 mb-2">Category Statistics</h4>
                            <p className="text-sm text-blue-700">
                                Total categories: <span className="font-medium">{categories.length}</span>
                            </p>
                        </div>
                    </div>
                </CardBody>
            </Card>

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