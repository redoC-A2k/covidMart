import { FETCH_CART } from "../types";
export const fetchcart = (setPrice) => {
  let userId = localStorage.getItem("userId");
  return (dispatch) => {
    fetch(`${process.env.REACT_APP_BACKEND}/getCart`, {
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
        if (data.error) {
          console.log(data.error)
          alert(data.error)
          window.location="/auth"
        }
        else{
          // setPrice(10);
          let sum = 0;
          // console.log(data.Cart[0].quantity*data.Cart[0].price)
          for(let i=0; i<data.Cart.length; i++){
            sum=sum+(data.Cart[i].quantity*data.Cart[i].price)
          }
          setPrice(sum)
          dispatch({type:FETCH_CART,payload:data.Cart})
        }
    })
  };
};
