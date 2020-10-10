import {FETCH_USER} from '../types'
export const fetchUserdata = (userId) =>{
    return (dispatch)=>{
        fetch("http://localhost:4000/getUserdata",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
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