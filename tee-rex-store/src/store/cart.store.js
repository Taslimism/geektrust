import create from 'zustand';
import { combine } from 'zustand/middleware';

const useCartStore = create(
  combine(
    {
      cartItem: {},
      stockOver: false,
      totalItems: 0,
      totalPrice: 0,
    },

    set => ({
      addToCart: ({ id, quantity, price }) => {
        set(state => {
          if (state.cartItem[id]) {
            if (state.cartItem[id] < quantity) {
              state.cartItem[id] += 1;
              state.totalItems += 1;
              state.totalPrice += price;
            } else state.stockOver = true;
          } else {
            state.cartItem[id] = 1;
            state.totalItems += 1;
            state.totalPrice += price;
          }

          return { ...state };
        });
      },
      decreaseQuantity: (id, price) => {
        set(state => {
          if (state.cartItem[id] > 0) {
            state.cartItem[id] -= 1;
            state.totalItems -= 1;
            state.totalPrice -= price;
          }
          if (state.cartItem[id] === 0) {
            state.removeFromCart(id, price, 1);
          }

          return { ...state };
        });
      },
      removeFromCart: (id, price, quantity) =>
        set(state => {
          const { cartItem } = state;
          delete cartItem[id];
          state.cartItem = cartItem;
          if (Object.keys(state.cartItem).length === 0) {
            state.totalPrice = 0;
            state.totalItems = 0;
          } else {
            state.totalPrice -= price * quantity;
            state.totalItems -= quantity;
          }

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
