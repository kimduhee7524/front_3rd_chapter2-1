import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';

const App: React.FC = () => {
  return (
    <CartProvider>
      <Cart />
    </CartProvider>
  );
};

export default App;
