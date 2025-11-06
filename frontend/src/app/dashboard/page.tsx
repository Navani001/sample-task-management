'use client';

import React from 'react';
import DynamicTabs from '@/component/tab';
import type { TabItem } from '@/component/tab';
import { useDynamicTabs } from '@/hooks/useDynamicTabs';
import { ToastProvider } from '@/contexts/ToastContext';
import { Package, Tag, Plus, BarChart3, Settings } from 'lucide-react';
import { CategoryManager, ProductsTable } from './component';

export default function DashboardPage() {
    const initialTabs: TabItem[] = [
        {
            id: "products",
            label: "Products",
            icon: <Package className="w-4 h-4" />,
            content: <ProductsTable />
        },
        {
            id: "categories",
            label: "Categories",
            icon: <Tag className="w-4 h-4" />,
            content: (
                <div className="mt-6">
                    <CategoryManager />
                </div>
            )
        }
    ];
    const {
        tabs,
        selectedKey,
        setSelectedKey
    } = useDynamicTabs(initialTabs, "products");

    return (
        <ToastProvider>
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="mb-6 flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
                            <p className="text-gray-600">Manage your products and categories</p>
                        </div>
                    </div>

                    <DynamicTabs
                        tabs={tabs}
                        ariaLabel="Dashboard sections"
                        variant="underlined"
                        size="lg"
                        selectedKey={selectedKey}
                        onSelectionChange={(key) => setSelectedKey(key.toString())}
                    />
                </div>
            </div>
        </ToastProvider>
    );
}