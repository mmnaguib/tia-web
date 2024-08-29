import { useState, useEffect } from "react";
import { UseAppDispatch, UseAppSelector } from "../../app/hooks";
import "./Cart.scss";
import {
  removeProductFromCart,
  updateProductQuantity,
} from "../../app/slices/CartSlice";
import { sliceDescription } from "../../utils/functions";
import { useTranslation } from "react-i18next";

// Define the type for the quantities state
type QuantitiesType = {
  [key: number | string]: number | undefined;
};

const Cart = () => {
  const { items } = UseAppSelector((state) => state.cart);
  const dispatch = UseAppDispatch();
  const { t } = useTranslation();

  // State to store quantities of each item
  const [quantities, setQuantities] = useState<QuantitiesType>({});

  // Initialize quantities state from Redux store on mount
  useEffect(() => {
    const initialQuantities: QuantitiesType = items.reduce((acc, item) => {
      acc[item._id] = item.quantity;
      return acc;
    }, {} as QuantitiesType);
    setQuantities(initialQuantities);
  }, [items]);

  // Update quantities in the Redux store whenever local state changes
  useEffect(() => {
    // To avoid multiple dispatches, only dispatch updates when quantities change
    Object.keys(quantities).forEach((key) => {
      const itemId = Number(key);
      const newQuantity = quantities[itemId];
      if (newQuantity !== undefined) {
        dispatch(updateProductQuantity({ id: itemId, quantity: newQuantity }));
      }
    });
  }, [quantities, dispatch]);

  // Handle quantity change
  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [itemId]: newQuantity,
      }));
    }
  };

  // Increase quantity
  const increaseQuantity = (itemId: number) => {
    setQuantities((prevQuantities) => {
      const newQuantity = (prevQuantities[itemId] || 1) + 1;
      return {
        ...prevQuantities,
        [itemId]: newQuantity,
      };
    });
  };

  // Decrease quantity
  const decreaseQuantity = (itemId: number) => {
    setQuantities((prevQuantities) => {
      const newQuantity = Math.max((prevQuantities[itemId] || 1) - 1, 1);
      return {
        ...prevQuantities,
        [itemId]: newQuantity,
      };
    });
  };

  // Calculate total price
  const totalPrice = items.reduce((total, item) => {
    const quantity = quantities[item._id] || 1;
    return total + +item.price * quantity;
  }, 0);

  const cartItems = items.map((item) => (
    <div key={item._id} className="cartItem">
      <div className="imgCart">
        <img
          src={"http://localhost:3000/" + item.images[0]}
          width="100px"
          alt={item.title}
        />
      </div>

      <div className="cartDetail" id={`product${item._id}`}>
        <h2>{item.title}</h2>
        <p>{sliceDescription(item.description, 30)}</p>
        <p>
          <span className="price">{item.price}</span>{" "}
          <span className="poundName">{t("EGP")}</span>
        </p>
        <p>{item.inStock >= 1 ? t("inStock") : t("outStock")}</p>
        <div className="quantityAStock">
          <div className="quantityControl">
            <button
              className="decrease quantityBtn"
              onClick={() => decreaseQuantity(+item._id)}
              disabled={quantities[item._id] === 1}
            >
              -
            </button>
            <input
              value={quantities[item._id] || 1}
              onChange={(e) => handleQuantityChange(+item._id, +e.target.value)}
              type="number"
              data-product-id={item._id}
              min="1"
              className="quantityInput"
              disabled={quantities[item._id] === item.inStock}
            />
            <button
              className="increase quantityBtn"
              onClick={() => increaseQuantity(+item._id)}
            >
              +
            </button>

            <button
              className="removeBtn"
              onClick={() => dispatch(removeProductFromCart(item._id))}
            >
              {t("delete")}
            </button>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="cartItemsContain">
      <div style={{ display: "flex", flexWrap: "wrap" }}>{cartItems}</div>
      <div>Total Price: {totalPrice.toFixed(2)}$</div>
    </div>
  );
};

export default Cart;
