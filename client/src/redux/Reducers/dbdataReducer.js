import { FETCH_ALL_PRODUCTS, FILTER_BY_PRICE, FILTER_BY_CATEGORY } from "../types";
export const dbdataReducer = (state = null, action) => {
  if (action.type === FETCH_ALL_PRODUCTS) {
    return action.dbdata;
  } 
  
  else if (action.type === FILTER_BY_PRICE) {
    return action.payload
  }

  else if(action.type === FILTER_BY_CATEGORY){
    return action.payload
  }
  
  else return state;
};
