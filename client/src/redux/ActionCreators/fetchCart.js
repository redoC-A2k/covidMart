import { FETCH_CART } from "../types";
export const fetchcart = () => {
  let userId = localStorage.getItem("userId");
  return (dispatch) => {
    fetch("http://localhost:4000/getCart", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        userId: userId,
      }),
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
        if (data.error) {
          console.log(data.error)
          alert(data.error)
          window.location="/auth"
        }
        else{
          dispatch({type:FETCH_CART,payload:data.Cart})
        }
    })
  };
};
