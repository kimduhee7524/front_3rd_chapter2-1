import Title from '../components/Title';
import CartItems from '../components/CartItems';
import CartTotalPrice from '../components/CartTotalPrice';
import ProductSelect from '../components/ProductSelect';
import SoldOutInfo from '../components/SoldOutInfo';
import { useAlertDiscount } from '../hooks/useAlertDiscount';

const Cart = () => {
  useAlertDiscount();

  return (
    <main className="bg-gray-100 p-8">
      <section className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <Title />
        <CartItems />
        <CartTotalPrice />
        <ProductSelect />
        <SoldOutInfo />
      </section>
    </main>
  );
};

export default Cart;
