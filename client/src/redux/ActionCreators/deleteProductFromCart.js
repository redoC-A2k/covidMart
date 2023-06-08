import { DELETE_PRODUCT_FROM_CART } from "../types";
export const deleteProductFromCart = (userId,productId) => {
  return (dispatch) => {
    fetch("http://localhost:4000/deleteProductFromCart", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        userId: userId,
        productId: productId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
          console.log("cart after deletion",data)
        dispatch({
          type: DELETE_PRODUCT_FROM_CART,
          payload: data.Cart,
        });
      });
  };
};

