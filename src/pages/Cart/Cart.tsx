import { UseAppDispatch, UseAppSelector } from "../../app/hooks";
import "./Cart.scss";
import {
  removeProductFromCart,
  updateProductQuantity,
} from "../../app/slices/CartSlice";
import { sliceDescription } from "../../utils/functions";
import { useTranslation } from "react-i18next";

const Cart = () => {
  const { items } = UseAppSelector((state) => state.cart);
  const dispatch = UseAppDispatch();
  const { t } = useTranslation();

  const handleQuantityChange = (itemId: string | number, quantity: number) => {
    if (quantity >= 1) {
      dispatch(updateProductQuantity({ id: itemId, quantity }));
    }
  };
  const calculateTotalPrice = () => {
    return items.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
  };
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
              className="btn btn-sm btn-primary"
              onClick={() =>
                handleQuantityChange(item._id, (item.quantity || 1) - 1)
              }
              disabled={(item.quantity || 1) <= 1}
            >
              -
            </button>
            <input
              type="number"
              className="quantityInput"
              value={item.quantity}
              onChange={(e) =>
                handleQuantityChange(item._id, Number(e.target.value))
              }
            />
            <button
              className="btn btn-sm btn-success"
              onClick={() =>
                handleQuantityChange(item._id, (item.quantity || 1) + 1)
              }
            >
              +
            </button>
          </div>
          <button
            className="removeBtn"
            onClick={() => dispatch(removeProductFromCart(item._id))}
          >
            {t("delete")}
          </button>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="cartItemsContain">
      <div style={{ display: "flex", flexWrap: "wrap" }}>{cartItems}</div>
      <div className="cartTotal">
        <h3>
          {t("totalPrice")}: {calculateTotalPrice().toFixed(2)} {t("EGP")}
        </h3>
      </div>
    </div>
  );
};

export default Cart;
