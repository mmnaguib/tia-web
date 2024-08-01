import { useState, useEffect } from "react";
import { UseAppDispatch, UseAppSelector } from "../../app/hooks";
import "./Cart.scss";
import { removeProductFromCart } from "../../app/slices/CartSlice";
import { sliceDescription } from "../../utils/functions";

const Cart = () => {
  const { items } = UseAppSelector((state) => state.cart);
  const [quantities, setQuantities] = useState<number[]>([]);
  const dispatch = UseAppDispatch();

  // Initialize quantities state when items change
  useEffect(() => {
    const initialQuantities = items.map(() => 1); // default quantity is 1 for each item
    setQuantities(initialQuantities);
  }, [items]);

  const handleQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newQuantity = Number(e.target.value);
    if (newQuantity > 0) {
      setQuantities((prevQuantities) => {
        const newQuantities = [...prevQuantities];
        newQuantities[index] = newQuantity;
        return newQuantities;
      });
    }
  };

  const incrementQuantity = (index: number) => {
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] += 1;
      return newQuantities;
    });
  };

  const decrementQuantity = (index: number) => {
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      if (newQuantities[index] > 1) {
        newQuantities[index] -= 1;
      }
      return newQuantities;
    });
  };

  const cartItems = items.map((item, index) => (
    <div key={item.id} className="cartItem">
      <div className="imgCart">
        <img src={item.images[0]} width="100px" alt={item.title} />

        <button
          className="removeBtn"
          onClick={() => dispatch(removeProductFromCart(item.id))}
        >
          <i className="fa fa-x"></i>
        </button>
      </div>

      <div className="cartDetail" id={`product${item.id}`}>
        <h2>{item.title}</h2>
        <p>{sliceDescription(item.description, 30)}</p>
        <p>Price: {item.price}</p>
        <div className="quantityAStock">
          {item.inStock >= 1 ? "In Stock" : "Out of Stock"}
          <div className="quantityControl">
            <button
              onClick={() => decrementQuantity(index)}
              disabled={quantities[index] <= 1}
            >
              -
            </button>
            <input
              value={quantities[index] || 1}
              onChange={(e) => handleQuantityChange(e, index)}
              type="string"
              data-product-id={item.id}
            />
            <button
              onClick={() => incrementQuantity(index)}
              disabled={quantities[index] >= item.inStock}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  ));

  const totalPrice = items.reduce((total, item, index) => {
    return total + +item.price * (quantities[index] || 1);
  }, 0);

  return (
    <div className="cartItemsContain">
      <div>{cartItems}</div>
      <div>Total Price: {totalPrice}</div>
    </div>
  );
};

export default Cart;
