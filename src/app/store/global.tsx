import type { BaseProduct, StockedProduct } from '@prisma/client';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface StoreProduct extends StockedProduct {
    quantity: number;
    product: BaseProduct;
}

interface SalesCartStoreState {
    products: StoreProduct[];
    showSalesCart: boolean;
}

interface SalesCartStoreActions {
    addProduct: (product: StoreProduct) => void;
    emptyProducts: () => void;
    removeProductById: (id: number) => void;
    addQuantityToProduct: (id: number, stock: number) => void;
    removeQuantityFromProduct: (id: number) => void;
    setShowSalesCart: (show: boolean) => void;
}

export const useSalesCartStore = create<SalesCartStoreState & SalesCartStoreActions>(
    persist(
        (set) => ({
            products: [],
            addProduct: (product) => set((state) => {
                const existingProduct = state.products.find(p => p.id === product.id);
                if (existingProduct) {
                    // If the product already exists, check if there's enough stock to add
                    if (existingProduct.quantity < existingProduct.stock) {
                        // If there's enough stock, increase its quantity by 1
                        const updatedProducts = state.products.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
                        return { products: updatedProducts };
                    } else {
                        // If there's not enough stock, do not add the product
                        return { products: state.products };
                    }
                } else {
                    // Otherwise, add the product with quantity 1
                    return { products: [...state.products, { ...product, quantity: 1 }] };
                }
            }),
            emptyProducts: () => set(() => ({ products: [] })),
            removeProductById: (id) => set((state) => ({
                products: state.products.filter(product => product.id !== id)
            })),
            addQuantityToProduct: (id, stock) => set((state) => {
                const productToUpdate = state.products.find(product => product.id === id);
                if (productToUpdate && productToUpdate.quantity < stock) {
                    const updatedProducts = state.products.map(product => {
                        if (product.id === id) {
                            return { ...product, quantity: product.quantity + 1 };
                        }
                        return product;
                    });
                    return { products: updatedProducts };
                }
                return state; // Return current state if there's no stock available
            }),
            removeQuantityFromProduct: (id) => set((state) => {
                const updatedProducts = state.products.map(product => {
                    if (product.id === id && product.quantity > 0) {
                        return { ...product, quantity: product.quantity - 1 };
                    }
                    return product;
                });
                // Filter out products with quantity 0
                const filteredProducts = updatedProducts.filter(product => product.quantity > 0);
                return { products: filteredProducts };
            }),
            showSalesCart: false,
            setShowSalesCart: (show) => set({ showSalesCart: show }),
        }),
        {
            name: 'cart-sales-storage',
            storage: createJSONStorage(() => sessionStorage),
          },
    )
);
