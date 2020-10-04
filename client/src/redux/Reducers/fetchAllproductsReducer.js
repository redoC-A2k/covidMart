import {FETCH_ALL_PRODUCTS} from "../types"
export const fetchAllproductsReducer = (state ="trial" ,action)=>{
    switch (action.type) {
        case FETCH_ALL_PRODUCTS:
            return action.dbdata
        default:
            return state
    }
}