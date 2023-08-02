import { useState } from 'react';
import Cart from './components/Cart/Cart';
import Header from './components/Layouts/Header';
import Meals from './components/Layouts/Meals/Meals';
import CartProvider from './store/CartProvider';

function App() {
  const [showCart,setShowCart] = useState(false);
  const handleShowCart = (show) => {
    setShowCart(show);
  } 
  return (
    <CartProvider>
    {showCart && <Cart handleShowCart={handleShowCart} />}
      <Header handleShowCart={handleShowCart}/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
