import { useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';

export const useProductRecommendation = () => {
  const cartContext = useContext(CartContext);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const intervalId = setInterval(() => {
        if (cartContext?.selectedProductId) {
          const { products, setProducts } = cartContext;
          const suggest = products.find(
            (item) =>
              item.id !== cartContext.selectedProductId && item.quantity > 0
          );

          if (suggest) {
            alert(
              suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!'
            );
            setProducts((prevProducts) =>
              prevProducts.map((p) =>
                p.id === suggest.id
                  ? { ...p, val: Math.round(p.val * 0.95) }
                  : p
              )
            );
          }
        }
      }, 60000);

      return () => clearInterval(intervalId);
    }, Math.random() * 20000);

    return () => clearTimeout(timeoutId);
  }, [cartContext]);
};
