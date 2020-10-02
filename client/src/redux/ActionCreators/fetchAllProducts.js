import { FETCH_ALL_PRODUCTS } from "../types";
export const obj = {
	fetchAllProducts: ()=>{
		return (dispatch) => {
			fetch("/products",{
				headers:{authorization:"Bearer "+localStorage.getItem("jwt")}
			}).then((res)=>res.json()).then((data)=>{dispatch({type:FETCH_ALL_PRODUCTS,dbdata:data})})
		}
	} 
}

