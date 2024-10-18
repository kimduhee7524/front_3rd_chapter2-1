import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const SoldOutInfo: React.FC = () => {
  const { products } = useContext(CartContext)!;

  return (
    <div id="stock-status">
      {products
        .filter((product) => product.quantity < 5)
        .map((product) => (
          <p key={product.id}>
            {product.name}:{' '}
            {product.quantity > 0
              ? `재고 부족 (${product.quantity}개 남음)`
              : '품절'}
          </p>
        ))}
    </div>
  );
};

export default SoldOutInfo;
