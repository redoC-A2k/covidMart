import { ADD_PRODUCT_IN_CART } from "../types";
export const addProductInCart = (productId) => {
  return {
    type: ADD_PRODUCT_IN_CART,
    payload :{
      productId: productId,
      quantity: 1,
    }
  };
};