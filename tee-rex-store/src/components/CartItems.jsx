const CartItems = () => (
  <div>
    <div>
      <img src="http://placehold.it/500x300" alt="placeholder" />
    </div>
    <div>
      <p>Name</p>
      <p>Price $120</p>
    </div>
    <div>
      <select label="Quantity">
        <option value={1}>1</option>
        <option value={2}>2</option>
      </select>
    </div>
    <div>
      <button type="button">Delete</button>
    </div>
  </div>
);

export default CartItems;
