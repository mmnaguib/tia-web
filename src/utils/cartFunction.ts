import { IProduct } from "../interfaces";

export const addItemToCart = (
  items: IProduct[],
  product: IProduct,
  quantity: number
) => {
  const isExisted = items.find((item) => item.id === product.id);
  if (isExisted) {
    return items.map((item) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity || 1 + quantity }
        : item
    );
  } else {
    return [...items, { ...product, quantity }];
  }
};
