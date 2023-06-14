import { DELETE_PRODUCT_FROM_CART } from "../types";
export const deleteProductFromCart = (userId,productId,setPrice) => {
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
          let sum=0;
          for(let i=0; i<data.Cart.length; i++)
          sum+=(data.Cart[i].quantity*data.Cart[i].price)
          setPrice(sum)
        dispatch({
          type: DELETE_PRODUCT_FROM_CART,
          payload: data.Cart,
        });
      });
  };
};

