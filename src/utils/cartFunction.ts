import { IProduct } from "../interfaces";

export const addItemToCart = (
  items: IProduct[],
  product: IProduct,
  quantity: number
) => {
  const isExisted = items.find((item) => item._id === product._id);
  if (isExisted) {
    return items.map((item) =>
      item._id === product._id
        ? { ...item, quantity: item.quantity || 1 + quantity }
        : item
    );
  } else {
    return [...items, { ...product, quantity }];
  }
};
