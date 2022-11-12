import useCartStore from '../store/cart.store';
import CartItems from './CartItems';
import shallow from 'zustand/shallow';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal';
import ErrorMessage from './ErrorMessage';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsUpdated, setCartItemsUpdated] = useState(false);
  const { cartItem, addToCart, removeFromCart, decreaseQuantity, stockOver } = useCartStore(
    state => ({
      cartItem: state.cartItem,
      addToCart: state.addToCart,
      removeFromCart: state.removeFromCart,
      decreaseQuantity: state.decreaseQuantity,
      stockOver: state.stockOver,
    }),
    shallow,
  );

  useEffect(() => {
    console.log('rerendering cart');
    (async () => {
      try {
        const { data } = await axios.get(API_URL);
        const result = Object.keys(cartItem).map(key => {
          for (let i = 0; i < data.length; i++) {
            if (data[i].id.toString() === key) {
              data[i].purchasedQuantity = cartItem[key];
              return data[i];
            }
          }
        });

        setCartItems(result);
      } catch (e) {
        console.log('Unexpected error occured', e);
      }
    })();
  }, [cartItemsUpdated]);

  return (
    <div className="flex flex-col pl-10 pt-4 mt-20 gap-4 border w-[80%] mx-auto h-screen bg-white">
      {stockOver && (
        <div className="absolute z-50">
          <Modal>
            <ErrorMessage />
          </Modal>
        </div>
      )}
      {cartItems &&
        cartItems.map(data => (
          <CartItems
            {...data}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            decreaseQuantity={decreaseQuantity}
            setCartItemsUpdated={setCartItemsUpdated}
          />
        ))}
    </div>
  );
};

export default Cart;
