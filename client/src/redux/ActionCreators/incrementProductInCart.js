import { INCREMENT_PRODUCT_IN_CART } from "../types";
export const incrementProductInCart = (productId, newno) => {
  return {
    type: INCREMENT_PRODUCT_IN_CART,
    payload: {
      productId: productId,
      newno: newno,
    },
  };
};
