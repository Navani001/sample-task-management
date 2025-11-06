'use client';

import React from 'react';
import { Product } from '@/types/product';
import { ButtonComponent } from '@/component/button';
import { Modals } from '@/component/modal';

interface DeleteConfirmationProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    product: Product | null;
}

export const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
    isOpen,
    onClose,
    onConfirm,
    product
}) => {
    const [loading, setLoading] = React.useState(false);

    const handleConfirm = async () => {
        setLoading(true);
        try {
            await onConfirm();
            onClose();
        } finally {
            setLoading(false);
        }
    };

    const ModalContent = (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Confirm Deletion</h3>
            <p className="text-gray-600">
                Are you sure you want to delete the product{' '}
                <span className="font-semibold">"{product?.name}"</span>?
            </p>
            <p className="text-sm text-gray-500">
                This action cannot be undone.
            </p>
        </div>
    );

    const ModalFooter = (
        <div className="flex gap-2 justify-end">
            <ButtonComponent
                buttonText="Cancel"
                ButtonVariant="flat"
                handleOnClick={onClose}
                isIcon={false}
                baseClassName={loading ? 'opacity-50 cursor-not-allowed' : ''}
            />
            <ButtonComponent
                buttonText="Delete Product"
                ButtonVariant="solid"
                bgColor="bg-red-500"
                handleOnClick={handleConfirm}
                isIcon={false}
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
            size="md"
        />
    );
};