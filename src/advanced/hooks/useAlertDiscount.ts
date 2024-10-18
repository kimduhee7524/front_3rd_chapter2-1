import { useEffect } from 'react';

export const useAlertDiscount = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      alert('현재 할인 중인 상품이 있습니다!');
    }, 60000);

    return () => clearInterval(interval);
  }, []);
};
