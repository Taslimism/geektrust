import create from 'zustand';
import { combine } from 'zustand/middleware';

const useCartStore = create(
  combine(
    {
      cartItem: {},
      stockOver: false,
      totalItems: 0,
    },

    set => ({
      addToCart: ({ id, quantity }) => {
        set(state => {
          if (state.cartItem[id]) {
            if (state.cartItem[id] < quantity) {
              state.cartItem[id] += 1;
              state.totalItems += 1;
            } else state.stockOver = true;
          } else {
            state.cartItem[id] = 1;
            state.totalItems += 1;
          }

          return { ...state };
        });
      },
      decreaseQuantity: id => {
        set(state => {
          if (state.cartItem[id] > 0) {
            state.cartItem[id] -= 1;
            state.totalItems -= 1;
          }
          if (state.cartItem[id] === 0) {
            state.removeFromCart(id);
          }
          console.log(state);
          return { ...state };
        });
      },
      removeFromCart: id =>
        set(state => {
          console.log('from decreaseQuantity');
          delete state.cartItem[id];
          state.totalItems = 0;
          return { ...state };
        }),
      removeErrorPopup: () =>
        set(state => {
          state.stockOver = false;
          return { ...state };
        }),
    }),
  ),
);

export default useCartStore;
