import { FETCH_A_PRODUCT } from "../types";

export const fetchAProductReducer =(state=null,action) => {
    switch(action.type){
        case FETCH_A_PRODUCT:
            return action.product
        default:
            return state;
    }
}
