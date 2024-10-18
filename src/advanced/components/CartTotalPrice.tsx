import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartTotalPrice: React.FC = () => {
  const { totalAmount } = useContext(CartContext)!;

  return <div id="cart-total">총액: {totalAmount}원</div>;
};

export default CartTotalPrice;
