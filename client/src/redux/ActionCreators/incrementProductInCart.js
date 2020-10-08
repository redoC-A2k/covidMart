import { INCREMENT_PRODUCT_IN_CART } from "../types";
export const incrementProductInCart = (productId, newno, price, title) => {
  return(dispatch) =>{
    const userId = localStorage.getItem("userId");
    fetch("http://localhost:4000/updateCart", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        productId: productId,
        quantity: newno,
        title: title,
        price: price,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: INCREMENT_PRODUCT_IN_CART,
          payload: {
            productId: data.productId,
            quantity: data.quantity,
            price: data.price,
            title: data.title,
          },
        });
      });
  }
};
