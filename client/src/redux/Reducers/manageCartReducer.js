import { INCREMENT_PRODUCT_IN_CART, DELETE_PRODUCT_FROM_CART,FETCH_CART ,ADD_PRODUCT_IN_CART, UPDATE_PRODUCT_IN_CART} from "../types";
export const manageCartReducer = (state = [], action) => {
  if (action.type === ADD_PRODUCT_IN_CART) {
    let myarray
    if(state===null){
      myarray = [
        {
          productId: action.payload.productId,
          quantity: action.payload.quantity,
          price:action.payload.price,
          title:action.payload.title
        },
      ];
    }
    else{
      myarray = [
        ...state,
        {
          productId: action.payload.productId,
          quantity: action.payload.quantity,
          price:action.payload.price,
          title:action.payload.title
        }
      ] 
    }
    // localStorage.setItem("cart",myarray)
    return myarray
  }
  else if(action.type===INCREMENT_PRODUCT_IN_CART){
    console.log(action)
    let newState = state.map((eachproduct,ind)=>{
      if(eachproduct.productId === action.payload.productId){
        return {
          productId:action.payload.productId,
          quantity:action.payload.quantity,
          price:action.payload.price,
          title:action.payload.title
        }
      }
      else return eachproduct
    })
    return newState ;
  }
  else if(action.type === UPDATE_PRODUCT_IN_CART){
    // console.log(action)
    let newState = state
    for(let i=0; i<newState.length; i++){
      if(newState[i].productId==action.payload.productId){
        let oldquantity = newState[i].quantity;
        let newquantity = action.payload.quantity;
        newState[i].quantity = newquantity
        if(oldquantity<newquantity){
          let diff = newquantity-oldquantity
          action.callback(oldprice => oldprice+(diff*newState[i].price))
        }
        else if(oldquantity > newquantity){
          let diff = oldquantity-newquantity;
          action.callback(oldprice => oldprice-(diff*newState[i].price))
        }
        break;
      }
    }
    return newState;
  }
  else if(action.type === DELETE_PRODUCT_FROM_CART){
    return action.payload
  }
  else if(action.type === FETCH_CART){
    return action.payload
  }
  else 
  return state
};
