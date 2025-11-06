'use client';

import React from 'react';
import {
    Card,
    CardBody,
    CardFooter,
    Chip,
    Tooltip,
    Image
} from '@heroui/react';
import { Edit, Trash2, Package } from 'lucide-react';
import { Product } from '@/types/product';
import { ButtonComponent } from '@/component/button';

interface ProductGridProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onEdit, onDelete }) => {
    const getStockColor = (stock: number) => {
        if (stock === 0) return 'danger';
        if (stock < 10) return 'warning';
        return 'success';
    };

    const getStockText = (stock: number) => {
        if (stock === 0) return 'Out of Stock';
        if (stock < 10) return 'Low Stock';
        return 'In Stock';
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product) => (
                <Card key={product._id || product.id} className="w-full">
                    <CardBody className="p-4">
                        {/* Product Image Placeholder */}
                        <div className="flex justify-center mb-3">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                <Package className="w-8 h-8 text-gray-400" />
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="text-center space-y-2">
                            <h4 className="font-semibold text-sm line-clamp-2">{product.name}</h4>

                            <Chip size="sm" variant="flat" color="default">
                                {product.category}
                            </Chip>

                            <div className="space-y-1">
                                <p className="text-lg font-bold text-primary">{formatPrice(product.price)}</p>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-500">Stock: {product.stock}</span>
                                    <Chip
                                        size="sm"
                                        color={getStockColor(product.stock)}
                                        variant="dot"
                                    >
                                        {getStockText(product.stock)}
                                    </Chip>
                                </div>
                            </div>
                        </div>
                    </CardBody>

                    <CardFooter className="pt-0 px-4 pb-4">
                        <div className="flex w-full gap-2">
                            <Tooltip content="Edit product">
                                <ButtonComponent
                                    buttonIcon={<Edit className="w-4 h-4" />}
                                    ButtonVariant="flat"
                                    bgColor="bg-primary-100"
                                    handleOnClick={() => onEdit(product)}
                                    baseClassName="flex-1 h-8 w-auto min-w-8"
                                    buttonText=""
                                    isIcon={true}
                                />
                            </Tooltip>
                            <Tooltip content="Delete product">
                                <ButtonComponent
                                    buttonIcon={<Trash2 className="w-4 h-4" />}
                                    ButtonVariant="flat"
                                    bgColor="bg-red-100"
                                    handleOnClick={() => onDelete(product)}
                                    baseClassName="flex-1 h-8 w-auto min-w-8"
                                    buttonText=""
                                    isIcon={true}
                                />
                            </Tooltip>
                        </div>
                    </CardFooter>
                </Card>
            ))}

            {products.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-12">
                    <Package className="w-16 h-16 text-gray-300 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No products found</h3>
                    <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
            )}
        </div>
    );
};