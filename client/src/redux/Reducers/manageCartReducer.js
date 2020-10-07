import { INCREMENT_PRODUCT_IN_CART } from "../types";
import {ADD_PRODUCT_IN_CART} from '../types'
export const manageCartReducer = (state = [], action) => {
  if (action.type === ADD_PRODUCT_IN_CART) {
    let myarray = [
      ...state,
      {
        productId: action.payload.productId,
        quantity: action.payload.quantity,
      },
    ];
    // localStorage.setItem("cart",myarray)
    return myarray
  }
  else if(action.type===INCREMENT_PRODUCT_IN_CART){
    console.log(state)
    console.log(action)
    let newState = state.map((eachproduct,ind)=>{
      if(eachproduct.productId === action.payload.productId){
        return {
          productId:action.payload.productId,
          quantity:action.payload.newno
        }
      }
      else return eachproduct
    })
    return newState ;
  }
  else 
  return state
};
