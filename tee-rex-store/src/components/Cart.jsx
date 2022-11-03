import CartItems from './CartItems';

const arr = new Array(4).fill(0);

const Cart = () => (
  <div>
    {arr.map(data => (
      <CartItems />
    ))}
  </div>
);

export default Cart;
