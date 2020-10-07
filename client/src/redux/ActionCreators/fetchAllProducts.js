import { FETCH_ALL_PRODUCTS } from "../types";

export const fetchAllProducts= () => {
  return (dispatch) => {
    fetch("http://localhost:4000/allproducts", {
      headers: { authorization: "Bearer " + localStorage.getItem("jwt") },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        dispatch({ type: FETCH_ALL_PRODUCTS, dbdata: data });
      });
  };
};
