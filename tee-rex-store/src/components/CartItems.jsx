const CartItems = ({
  imageURL,
  name,
  price,
  purchasedQuantity,
  id,
  quantity,
  addToCart,
  removeFromCart,
  decreaseQuantity,
  setCartItemsUpdated,
}) => {
  return (
    <div key={id} className="flex gap-8 items-center">
      <div className="h-20 w-20 sm:h-48 sm:w-48 rounded-md p-1 sm:p-2">
        <img src={imageURL} alt="placeholder" />
      </div>
      <div className="font-semibold text-sm sm:text-base">
        <p>{name}</p>
        <p>Price ${price}</p>
        <p>Total ${price * purchasedQuantity}</p>
      </div>
      <div className="flex sm:flex-row flex-col gap-2">
        <button
          onClick={() => {
            decreaseQuantity(id, price);
            setCartItemsUpdated(currentState => !currentState);
          }}
          type="button"
          className="bg-blue-500 text-white px-2 rounded-md"
        >
          -
        </button>
        <span className="border rounded-md px-2">{purchasedQuantity}</span>
        <button
          onClick={() => {
            addToCart({ id, quantity, price });
            setCartItemsUpdated(currentState => !currentState);
          }}
          type="button"
          className="bg-blue-500 text-white px-2 rounded-md"
        >
          +
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            removeFromCart(id, purchasedQuantity, price);
            setCartItemsUpdated(currentState => !currentState);
          }}
          type="button"
          className="bg-red-600 text-white px-2 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CartItems;
