import { FILTER_BY_PRICE ,FILTER_BY_CATEGORY} from "../types";
export const filterByPrice = (price) => {
  return (dispatch) => {
    fetch("http://localhost:4000/filterByPrice", {
      method: "post",
      headers: {
        authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price: price,
      }),
    })
      .then((res) => res.json())
      .then((filteredProducts) => {
        dispatch({
          type: FILTER_BY_PRICE,
          payload: filteredProducts,
        });
      });
  };
};

export const filterByCategory = (category) => {
    return (dispatch)=>{
        fetch("http://localhost:4000/filterByCategory",{
            method:"post",
            headers:{
                authorization:"Bearer "+localStorage.getItem("jwt"),
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
              category:category
            })
        })
        .then(res => res.json())
        .then(filteredProducts =>{
            dispatch({
                type:FILTER_BY_CATEGORY,
                payload:filteredProducts
            })
        } )
    }
};
