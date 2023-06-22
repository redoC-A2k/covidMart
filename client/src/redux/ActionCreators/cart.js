import { ADD_PRODUCT_IN_CART,DELETE_PRODUCT_FROM_CART,FETCH_CART, UPDATE_PRODUCT_IN_CART } from "../types";
import {showLoader,hideLoader} from "utility"
import {showInfoToast,showErrorToast} from 'toast';

export const addProductInCart = (productId, price, title, callback) => {
  return (dispatch) => {
    let userId = localStorage.getItem("userId");
    showLoader()
    fetch(`${process.env.REACT_APP_BACKEND}/addToCart`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        userId: userId,
        productId: productId,
        title: title,
        price: price,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        hideLoader()
        showInfoToast("Product Added to Cart");
        if(callback!==undefined)
        callback()
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
        hideLoader()
        if (data.error) {
          showErrorToast(data.error)
        }
        else{
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

export const updateProductInCart = (userId,productId,quantity,setPrice)=>{
  return (dispatch)=>{
    showLoader()
    fetch(`${process.env.REACT_APP_BACKEND}/updateCart`,{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        authorization:"Bearer "+localStorage.getItem("jwt")
      },
      body: JSON.stringify({userId,productId,quantity}) 
    }).then((res)=>res.json())
    .then(result => {
      hideLoader()
      if(result.message){
        dispatch({
          type: UPDATE_PRODUCT_IN_CART,
          payload: {productId,quantity},
          callback: setPrice
        })
      } else showErrorToast(result.error) 
    })
  }
}

export const deleteProductFromCart = (userId,productId,setPrice) => {
  showLoader()
  return (dispatch) => {
    fetch(`${process.env.REACT_APP_BACKEND}/deleteProductFromCart`, {
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
          hideLoader()
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
