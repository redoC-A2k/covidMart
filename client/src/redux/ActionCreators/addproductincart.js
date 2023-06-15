import { ADD_PRODUCT_IN_CART } from "../types";
export const addProductInCart = (productId, price, title) => {
  return (dispatch) => {
    let userId = localStorage.getItem("userId");
    fetch(`${process.env.REACT_APP_BACKEND}/addToCart`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        userId: userId,
        productId: productId,
        quantity: 1,
        title: title,
        price: price,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: ADD_PRODUCT_IN_CART,
          payload: {
            productId: data.productId,
            quantity: data.quantity,
            price: data.price,
            title: data.title,
          },
        });
      });
  };
};
