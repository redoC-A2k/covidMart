import { FETCH_ALL_PRODUCTS } from "../types";

export const fetchAllProducts = () => {
  let newArray=[]
  let putfunction =(product) =>{
    newArray.push(product)
    return newArray
  }
  return (dispatch) => {
    fetch("http://localhost:4000/allproducts", {
      headers: { authorization: "Bearer " + localStorage.getItem("jwt") },
    })
      .then((res) => res.json())
      .then((data) => {
        new Promise((resolve, rej) => {
           data.map((product, ind) => {
            new Promise((res, rej) => {
              let sum = 0;
              let isIterated = false;
              if (product.rating.length !== 0) {
                product.rating.map((eachRating, ind) => {
                  sum = sum + eachRating.value;
                  if (ind === product.rating.length - 1) {
                    isIterated = true;
                  }
                });
                if (isIterated === true) {
                  sum = sum / product.rating.length;
                  product.rating = {
                    value: sum,
                    count: product.rating.length,
                  };
                  res();
                }
              } else {
                product.rating = {
                  value: 0,
                  count: 0,
                };
                res();
              }
            }).then(() => {
              if(ind===data.length-1)
              resolve()
              putfunction(product)
            });
          });
        }).then(() => {
          dispatch({ type: FETCH_ALL_PRODUCTS, dbdata: newArray });
        });
      });
  };
};
