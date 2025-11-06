'use client';

import React from 'react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    Tooltip,
    Input,
    Select,
    SelectItem,
    Card,
    CardBody,
    Spinner
} from '@heroui/react';
import { Plus, Edit, Trash2, Search, Grid3X3, List } from 'lucide-react';
import { Product } from '@/types/product';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import { ProductForm } from './ProductForm';
import { DeleteConfirmation } from './DeleteConfirmation';
import { ProductStats } from './ProductStats';
import { ProductGrid } from './ProductGrid';
import { ButtonComponent } from '@/component/button';

const ProductsTable: React.FC = () => {
    const {
        products,
        filteredProducts,
        loading,
        error,
        searchTerm,
        selectedCategory,
        categories,
        addProduct,
        updateProduct,
        deleteProduct,
        setSearchTerm,
        setSelectedCategory,
    } = useProducts();

    const { categoryNames } = useCategories();

    const [editingProduct, setEditingProduct] = React.useState<Product | null>(null);
    const [deletingProduct, setDeletingProduct] = React.useState<Product | null>(null);
    const [isFormOpen, setIsFormOpen] = React.useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
    const [viewMode, setViewMode] = React.useState<'table' | 'grid'>('table'); const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsFormOpen(true);
    };

    const handleDelete = (product: Product) => {
        setDeletingProduct(product);
        setIsDeleteModalOpen(true);
    };

    const handleAddNew = () => {
        setEditingProduct(null);
        setIsFormOpen(true);
    };

    const handleFormSubmit = async (productData: any) => {
        if (editingProduct) {
            const productId = editingProduct._id || editingProduct.id;
            if (productId) {
                return await updateProduct(productId, productData);
            }
            return false;
        } else {
            return await addProduct(productData);
        }
    };

    const handleDeleteConfirm = async () => {
        if (deletingProduct) {
            const productId = deletingProduct._id || deletingProduct.id;
            if (productId) {
                await deleteProduct(productId);
            }
        }
    };

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

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Spinner size="lg" />
            </div>
        );
    }

    if (error) {
        return (
            <Card className="max-w-md mx-auto">
                <CardBody>
                    <p className="text-danger text-center">{error}</p>
                </CardBody>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            {/* Header and Controls */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Products Dashboard</h1>
                    <p className="text-gray-600">Manage your product inventory</p>
                </div>
                <ButtonComponent
                    buttonText="Add Product"
                    buttonIcon={<Plus className="w-4 h-4" />}
                    ButtonVariant="solid"
                    bgColor="bg-primary"
                    handleOnClick={handleAddNew}
                />
            </div>

            {/* Statistics */}
            <ProductStats products={products} />

            {/* Filters and View Toggle */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4">
                    <Input
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        startContent={<Search className="w-4 h-4 text-gray-400" />}
                        className="max-w-xs"
                        variant="bordered"
                    />
                    <Select
                        placeholder="Filter by category"
                        selectedKeys={selectedCategory ? [selectedCategory] : []}
                        onSelectionChange={(keys) => {
                            const selected = Array.from(keys)[0] as string;
                            setSelectedCategory(selected || '');
                        }}
                        className="max-w-xs"
                        variant="bordered"
                    >
                        <SelectItem key="">All Categories</SelectItem>
                        <SelectItem key="Electronics">Electronics</SelectItem>
                        <SelectItem key="Clothing">Clothing</SelectItem>
                        <SelectItem key="Books">Books</SelectItem>
                        <SelectItem key="Home & Garden">Home & Garden</SelectItem>
                        <SelectItem key="Sports">Sports</SelectItem>
                        <SelectItem key="Toys">Toys</SelectItem>
                        <SelectItem key="Food & Beverages">Food & Beverages</SelectItem>
                        <SelectItem key="Health & Beauty">Health & Beauty</SelectItem>
                        <SelectItem key="Automotive">Automotive</SelectItem>
                        <SelectItem key="Office Supplies">Office Supplies</SelectItem>
                    </Select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
                    <ButtonComponent
                        buttonIcon={<List className="w-4 h-4" />}
                        ButtonVariant={viewMode === 'table' ? 'solid' : 'light'}
                        bgColor={viewMode === 'table' ? 'bg-primary' : 'bg-gray-200'}
                        handleOnClick={() => setViewMode('table')}
                        baseClassName="h-8 w-8 min-w-8"
                        buttonText=""
                        isIcon={true}
                    />
                    <ButtonComponent
                        buttonIcon={<Grid3X3 className="w-4 h-4" />}
                        ButtonVariant={viewMode === 'grid' ? 'solid' : 'light'}
                        bgColor={viewMode === 'grid' ? 'bg-primary' : 'bg-gray-200'}
                        handleOnClick={() => setViewMode('grid')}
                        baseClassName="h-8 w-8 min-w-8"
                        buttonText=""
                        isIcon={true}
                    />
                </div>
            </div>

            {/* Products Display */}
            {viewMode === 'table' ? (
                <Card>
                    <CardBody className="p-0">
                        <Table aria-label="Products table">
                            <TableHeader>
                                <TableColumn>NAME</TableColumn>
                                <TableColumn>CATEGORY</TableColumn>
                                <TableColumn>PRICE</TableColumn>
                                <TableColumn>STOCK</TableColumn>
                                <TableColumn>STATUS</TableColumn>
                                <TableColumn>ACTIONS</TableColumn>
                            </TableHeader>
                            <TableBody emptyContent="No products found">
                                {filteredProducts.map((product) => (
                                    <TableRow key={product._id || product.id}>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <p className="font-medium">{product.name}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Chip size="sm" variant="flat" color="default">
                                                {product.category}
                                            </Chip>
                                        </TableCell>
                                        <TableCell>
                                            <span className="font-medium">{formatPrice(product.price)}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="font-medium">{product.stock}</span>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                size="sm"
                                                color={getStockColor(product.stock)}
                                                variant="flat"
                                            >
                                                {getStockText(product.stock)}
                                            </Chip>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Tooltip content="Edit product">
                                                    <ButtonComponent
                                                        buttonIcon={<Edit className="w-4 h-4" />}
                                                        ButtonVariant="flat"
                                                        bgColor="bg-primary-100"
                                                        handleOnClick={() => handleEdit(product)}
                                                        baseClassName="h-8 w-8 min-w-8"
                                                        buttonText=""
                                                        isIcon={true}
                                                    />
                                                </Tooltip>
                                                <Tooltip content="Delete product">
                                                    <ButtonComponent
                                                        buttonIcon={<Trash2 className="w-4 h-4" />}
                                                        ButtonVariant="flat"
                                                        bgColor="bg-red-100"
                                                        handleOnClick={() => handleDelete(product)}
                                                        baseClassName="h-8 w-8 min-w-8"
                                                        buttonText=""
                                                        isIcon={true}
                                                    />
                                                </Tooltip>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardBody>
                </Card>
            ) : (
                <ProductGrid
                    products={filteredProducts}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            {/* Modals */}
            <ProductForm
                isOpen={isFormOpen}
                onClose={() => {
                    setIsFormOpen(false);
                    setEditingProduct(null);
                }}
                onSubmit={handleFormSubmit}
                initialData={editingProduct}
                title={editingProduct ? 'Edit Product' : 'Add New Product'}
                categories={categoryNames}
            />

            <DeleteConfirmation
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setDeletingProduct(null);
                }}
                onConfirm={handleDeleteConfirm}
                product={deletingProduct}
            />
        </div>
    );
};

export default ProductsTable;