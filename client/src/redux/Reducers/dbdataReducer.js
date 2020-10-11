import {  FILTERED_PRODUCTS } from "../types";
export const dbdataReducer = (state = null, action) => {
  if (action.type === FILTERED_PRODUCTS) {
    return action.products;
  } 
  
  else return state;
};
