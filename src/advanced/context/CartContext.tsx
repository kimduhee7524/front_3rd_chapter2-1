import React, { createContext, useState, ReactNode } from 'react';
import { productList as initialProductList } from '../data/product';
import { Product } from '../types';

interface CartContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cartItems: Product[];
  totalAmount: number;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  addToCart: (productId: string) => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProductList);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  const addToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product && product.quantity > 0) {
      const newCartItem = { ...product, quantity: 1 };
      setCartItems([...cartItems, newCartItem]);
      setTotalAmount((prev) => prev + product.val);

      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
        )
      );
    } else {
      alert('재고가 부족합니다.');
    }
  };

  return (
    <CartContext.Provider
      value={{
        products,
        setProducts,
        cartItems,
        totalAmount,
        selectedProductId,
        setSelectedProductId,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
