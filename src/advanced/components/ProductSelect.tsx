import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductSelect: React.FC = () => {
  const { products, addToCart } = useContext(CartContext)!;
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProductId = event.target.value;
    addToCart(selectedProductId);
  };

  return (
    <select id="product-select" onChange={handleSelect}>
      {products.map((product) => (
        <option
          key={product.id}
          value={product.id}
          disabled={product.quantity === 0}
        >
          {product.name} - {product.val}원
        </option>
      ))}
    </select>
  );
};

export default ProductSelect;
