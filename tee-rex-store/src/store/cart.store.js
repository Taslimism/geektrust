import create from 'zustand';
import { combine } from 'zustand/middleware';

const useCartStore = create(
  combine(
    {
      cartItem: {},
    },
    set => ({
      addToCart: product => {
        set(state => {
          if (state.cartItem[product.id] && state.cartItem[product.id].length <= product.quantity)
            state.cartItem[product.id].push(product);
          else {
            state.cartItem[product.id] = [];
            state.cartItem[product.id].push(product);
          }

          return {};
        });
      },
      removeFromCart: id =>
        set(state => {
          const newCartItems = state.cartItem.filter(item => item.id !== id);
          state.cartItem = [...newCartItems];
          return {};
        }),
    }),
  ),
);

export default useCartStore;
