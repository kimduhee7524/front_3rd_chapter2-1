import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartItems: React.FC = () => {
  const { cartItems } = useContext(CartContext)!;

  return (
    <div id="cart-items">
      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          {item.name} - {item.quantity}개
        </div>
      ))}
    </div>
  );
};

export default CartItems;
