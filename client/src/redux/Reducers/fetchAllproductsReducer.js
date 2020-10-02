import {FETCH_ALL_PRODUCTS} from "../types"
export const fetchAllproductsReducer = (state ,action)=>{
    switch (action.type) {
        case FETCH_ALL_PRODUCTS:
            return {dbdata : action.dbdata}
            break;
        default:
            return state
            break;
    }
}