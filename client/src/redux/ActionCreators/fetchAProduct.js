import {FETCH_A_PRODUCT} from "../types";
export const fetchAProduct = ()=>{
    return (dispatch)=>{
        fetch("http://localhost:4000/product",{
            method:"post",
            headers:{
                authorization:"Bearer "+localStorage.getItem("jwt"),
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                _id:localStorage.getItem("_id")
            })
        }).then(res => res.json())
        .then(data => {
            dispatch({
                type:FETCH_A_PRODUCT,
                product:data
            })
        })
    }
}

export const giveRating = (productId,userId,value) =>{
    return(dispatch)=>{
        fetch("http://localhost:4000/rating",{
            method:"post",
            headers:{
                authorization:"Bearer "+localStorage.getItem("jwt"),
                "Content-Type":"application/json"
            },body:JSON.stringify({
                userId:userId,
                productId:productId,
                value:value
            })
        })
        .then(res => res.json())
        .then(product => {
            dispatch({
                type:FETCH_A_PRODUCT,
                product:product
            })
        })
    }
}