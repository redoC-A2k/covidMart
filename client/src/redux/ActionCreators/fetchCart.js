import { FETCH_CART } from "../types";
export const fetchcart = () => {
  let userId = localStorage.getItem("userId");
  return (dispatch) => {
    fetch("http://localhost:4000/getCart", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
        dispatch({type:FETCH_CART,payload:data.Cart})
    })
  };
};
