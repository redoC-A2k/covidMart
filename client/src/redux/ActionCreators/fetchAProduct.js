import { FETCH_A_PRODUCT } from "../types";
import { FETCH_USER } from "../types";
export const fetchAProduct = (productId) => {
  return (dispatch) => {
    fetch(`${process.env.REACT_APP_BACKEND}/product`, {
      method: "post",
      headers: {
        authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: productId, 
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        new Promise((res, rej) => {
          let sum = 0;
          let isIterated = false;
          if (data.product.rating.length !== 0) {
            data.product.rating.map((eachRating, ind) => {
              sum = sum + eachRating.value;
              if (ind === data.product.rating.length - 1) {
                isIterated = true;
              }
            });
            if (isIterated === true) {
              sum = sum / data.product.rating.length;
              data.product.rating = {
                value: sum,
                count: data.product.rating.length,
              };
              console.log(sum);
              res();
            }
          }
          else{
            data.product.rating={
              value:0,
              count:0
            }
            res()
          }
        }).then(() => {
          dispatch({
            type: FETCH_A_PRODUCT,
            product: data.product,
          });
        });
      });
  };
};

export const giveRating = (productId, userId, value) => {
  return (dispatch) => {
    fetch(`${process.env.REACT_APP_BACKEND}/giveRatingAndGetUserdata`, {
      method: "post",
      headers: {
        authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        productId: productId,
        value: value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("product in action",data.product)
        // console.log("userData in action",data.userdata)
        new Promise((res, rej) => {
          let sum = 0;
          let isIterated = false;
          if (data.product.rating.length !== 0) {
            data.product.rating.map((eachRating, ind) => {
              sum = sum + eachRating.value;
              if (ind === data.product.rating.length - 1) {
                isIterated = true;
              }
            });
            if (isIterated === true) {
              sum = sum / data.product.rating.length;
              data.product.rating = {
                value: sum,
                count: data.product.rating.length,
              };
              // console.log(sum);
              res();
            }
          }
        }).then(() => {
          // console.log(data.userdata.myRatings)
          dispatch({
            type: FETCH_A_PRODUCT,
            product: data.product,
          });
          dispatch({
            type: FETCH_USER,
            userdata: data.userdata,
          });
        });
      });
  };
};
