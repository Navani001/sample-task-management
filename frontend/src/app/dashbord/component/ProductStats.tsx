'use client';
import React from 'react';
import { Card, CardBody } from '@heroui/react';
import { Package, TrendingUp, AlertTriangle, DollarSign } from 'lucide-react';
import { Product } from '@/types/product';

interface ProductStatsProps {
    products: Product[];
}

export const ProductStats: React.FC<ProductStatsProps> = ({ products }) => {
    const stats = React.useMemo(() => {
        const totalProducts = products.length;
        const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);
        const lowStockProducts = products.filter(product => product.stock > 0 && product.stock < 10).length;
        const outOfStockProducts = products.filter(product => product.stock === 0).length;

        return {
            totalProducts,
            totalValue,
            lowStockProducts,
            outOfStockProducts,
        };
    }, [products]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
                <CardBody className="flex flex-row items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                        <Package className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Total Products</p>
                        <p className="text-2xl font-bold">{stats.totalProducts}</p>
                    </div>
                </CardBody>
            </Card>

            <Card>
                <CardBody className="flex flex-row items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-full">
                        <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Total Value</p>
                        <p className="text-2xl font-bold">{formatCurrency(stats.totalValue)}</p>
                    </div>
                </CardBody>
            </Card>

            <Card>
                <CardBody className="flex flex-row items-center gap-4">
                    <div className="p-3 bg-yellow-100 rounded-full">
                        <TrendingUp className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Low Stock</p>
                        <p className="text-2xl font-bold">{stats.lowStockProducts}</p>
                    </div>
                </CardBody>
            </Card>

            <Card>
                <CardBody className="flex flex-row items-center gap-4">
                    <div className="p-3 bg-red-100 rounded-full">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Out of Stock</p>
                        <p className="text-2xl font-bold">{stats.outOfStockProducts}</p>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};