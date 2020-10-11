import { FILTERED_PRODUCTS } from "../types";
// export const filterByPrice = (price,noOfProducts) => {
//   return (dispatch) => {
//     console.log(noOfProducts)
//     let newArray = []
//     fetch("http://localhost:4000/filterByPrice", {
//       method: "post",
//       headers: {
//         authorization: "Bearer " + localStorage.getItem("jwt"),
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         price: price,
//       }),
//     })
//       .then((res) => res.json())
//       .then((filteredProducts) => {
//         for(let i = 0 ; i < noOfProducts && i < filteredProducts.length; i++){
//           // filteredProducts[i] =
//           newArray.push(filteredProducts[i])
//         }
//         dispatch({
//           type: FILTER_BY_PRICE,
//           payload: newArray,
//         });
//       });
//   };
// };

// export const filterByCategory = (category,noOfProducts) => {
//     return (dispatch)=>{
//         fetch("http://localhost:4000/filterByCategory",{
//             method:"post",
//             headers:{
//                 authorization:"Bearer "+localStorage.getItem("jwt"),
//                 "Content-Type":"application/json"
//             },
//             body:JSON.stringify({
//               category:category
//             })
//         })
//         .then(res => res.json())
//         .then(filteredProducts =>{
//             dispatch({
//                 type:FILTER_BY_CATEGORY,
//                 payload:filteredProducts
//             })
//         } )
//     }
// };

export const applyFilter = (price, category, noOfProducts) => {
  return (dispatch) => {
    fetch("http://localhost:4000/filter", {
      method: "post",
      headers: {
        authorization:"Bearer "+localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price: price,
        category: category,
        noOfProducts: noOfProducts,
      }),
    })
      .then((res) => res.json())
      .then((products) => {
        if(products.error==="jwtNotMatched"){
        window.alert("Problem with current account create new account")
        window.location.href = "http://localhost:3000/auth"
        }
        if(products.length===0){
          window.alert("Applied filter does not match to our products range")
        }
        console.log(products)
        // console.log(products);
        let newArrayOfProducts = [];
        let putInArray = (product) => {
          newArrayOfProducts.push(product);
        };
        new Promise((resolve, rej) => {
          products.map((product, ind) => {
            if (product.rating.length !== 0) {
              let sum = 0;
              new Promise((res, rej) => {
                let len = product.rating.length
                product.rating.map((eachRating, index) => {
                  sum = sum + eachRating.value;
                  if(index === len-1){
                    res()
                    console.log("resolved")
                  }
                });
                sum = sum / len;
                product.rating = {
                  value: sum,
                };
              }).then(() => {
                if(ind === products.length-1)
                resolve()
                putInArray(product)
              });
            } else if (ind === products.length - 1) {
              product.rating = {
                value: 0,
              };
              putInArray(product);
              resolve();
            } else {
              product.rating = {
                value: 0,
              };
              putInArray(product);
            }
          });
        }).then(() => {
          dispatch({ type: FILTERED_PRODUCTS, products: newArrayOfProducts });
        });
      });
  };
};
