import {FETCH_USER} from '../types'
export const fetchUserdata = (userId) =>{
    return (dispatch)=>{
        fetch(`${process.env.REACT_APP_BACKEND}/getUserdata`,{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                authorization: "Bearer "+localStorage.getItem("jwt")

            },
            body:JSON.stringify({
                userId:userId
            })
        })
        .then(res => res.json())
        .then(data =>{
            dispatch({
                type:FETCH_USER,
                userdata:data.userdata
            })
        })
    }
}