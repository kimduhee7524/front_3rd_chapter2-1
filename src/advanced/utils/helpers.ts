import { CartItem, Product } from '../types/index';
import { PRODUCT_DISCOUNTS } from '../constants';

export const calculateTotal = (cartItems: CartItem[]): number => {
  return cartItems.reduce((total, item) => {
    const discount = getProductDiscount(item.id, item.quantity);
    const discountedPrice = item.val * (1 - discount);
    return total + discountedPrice * item.quantity;
  }, 0);
};

export const findProductById = (
  products: Product[],
  productId: string
): Product | undefined => {
  return products.find((product) => product.id === productId);
};

export const getProductDiscount = (
  productId: string,
  quantity: number
): number => {
  if (quantity < 10) return 0;
  return PRODUCT_DISCOUNTS[productId] || 0;
};
