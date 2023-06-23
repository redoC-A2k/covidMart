import React, { useEffect, useState } from "react";
import CtaButton from "../components/CtaButton";
import {fetchUserdata} from '../redux/ActionCreators/fetchUserdata'
import { connect } from "react-redux";
import {showLoader,hideLoader} from "utility"
import {showInfoToast,showErrorToast} from "toast"

const mapStateToProps = state => {
  return { userdata: state.user }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchUserdata: (userId) => { dispatch(fetchUserdata(userId)) }
  }
}

function Profile(props){
    const [name, setName] = useState("")
    const [address, setAddress] = useState("") 
    useEffect(()=>{
        if(props.userdata===null){
            props.fetchUserdata(localStorage.getItem("userId"))
            showLoader()
        }

    },[])
    function handleSubmit(event){
        event.preventDefault();
        showLoader()
        let namefield = document.querySelector("#profile form.myform #profilename") 
        let addressfield = document.querySelector("#profile form.myform #address") 
        if(name==="")
        setName(props.userdata.name)
        if(address==="")
        setAddress(props.userdata.address)
        console.log("name=",name,"address=",address)

        fetch(`${process.env.REACT_APP_BACKEND}/user/updateProfile`,{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                authorization: "Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                userId:localStorage.getItem("userId"),
                name:name,
                address:address
            })
        }).then(res => res.json())
        .then(response =>{
            hideLoader()
            if(response.error)
            showErrorToast(response.error)
            else showInfoToast(response.message)
        })
    }
    if(props.userdata!==null){
        hideLoader()
        return (<section id='profile'>
            <form onSubmit={handleSubmit} className="myform" >
                <fieldset>
                    <input
                        type="text"
                        autoComplete="off"
                        placeholder="Name"
                        id="profilename"
                        name="profilename"
                        onChange={(e) => { setName(e.target.value) }}
                        defaultValue={props.userdata.name}
                        required
                    />
                    <label htmlFor="profilename">Name</label>
                </fieldset>
                <fieldset>
                    <input
                        type="text"
                        autoComplete="off"
                        placeholder="Address"
                        id="address"
                        name="address"
                        defaultValue={props.userdata.address}
                        onChange={(e) => { setAddress(e.target.value) }}
                        required
                    />
                    <label htmlFor="address">Address</label>
                </fieldset>
                <CtaButton
                    solid
                    type="submit"
                >
                    <span className={`fa-solid fa-pen icon`}></span>
                    <span className={`text`}>Update</span>
                </CtaButton>
            </form>
        </section>)
    }

    else return <></>
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);