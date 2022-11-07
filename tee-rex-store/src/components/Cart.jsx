import useCartStore from '../store/cart.store';
import CartItems from './CartItems';
import shallow from 'zustand/shallow';

const arr = new Array(4).fill(0);

const Cart = () => {
  const { cartItem, removeFromCart } = useCartStore(
    state => ({
      cartItem: state.cartItem,
      removeFromCart: state.removeFromCart,
    }),
    shallow,
  );
  console.log(cartItem);
  return (
    <div>
      {arr.map(data => (
        <CartItems />
      ))}
    </div>
  );
};

export default Cart;
