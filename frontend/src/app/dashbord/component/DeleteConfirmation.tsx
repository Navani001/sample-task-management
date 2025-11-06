'use client';

import React from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter
} from '@heroui/react';
import { Product } from '@/types/product';
import { ButtonComponent } from '@/component/button';

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

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            placement="top-center"
            size="md"
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    Confirm Deletion
                </ModalHeader>
                <ModalBody>
                    <p className="text-gray-600">
                        Are you sure you want to delete the product{' '}
                        <span className="font-semibold">"{product?.name}"</span>?
                    </p>
                    <p className="text-sm text-gray-500">
                        This action cannot be undone.
                    </p>
                </ModalBody>
                <ModalFooter>
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
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};