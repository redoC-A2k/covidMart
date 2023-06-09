import React, { useEffect } from "react"
import { Component } from "react"
import logo from "../assets/images/CovidMart logo no background.png"
import { Link } from 'react-router-dom';
import { useState } from "react";

function Navbar(props){
    const [searchTxt , setSearchTxt] = useState("");

    function toggleUserPopup(){
        let popup = document.getElementById("popup")
        if (popup.style.visibility === "hidden"||popup.style.visibility===""){
            popup.style.visibility = "visible";
        }
        else{
            popup.style.visibility = "hidden"
        }
    }

    function slideSidebar(){
        let sidebar = document.getElementById("sidebar")
        sidebar.style.visibility = "visible"
    }


   function handleSearch(event) {
        if(event.charCode==13){
           fetch("http://localhost:4000/products/search",{
                method:"put",
                headers:{
                    authorization:"Bearer "+localStorage.getItem("jwt"),
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    searchTxt,
                })
           }).then(res=>res.json())
           .then(data=>{
                let resultTitles = []
                for(let i=0; i<data.length; i++){
                    resultTitles.push(data[i].title)
                }
                props.setSearchResult(resultTitles)
           }) 
        }
        else console.log(event.charCode)
   } 


    //TODO: Show navbar only on home page
    return (
        <section id="navbar">
            {/* <div><i className="fa fa-bars"></i></div> */}
            <div className="sidebar-icon">
                <i className="fa-solid fa-bars" onClick={slideSidebar}></i>
            </div>
           
            <h1 className="brand"><Link to="/">CovidMart</Link><img src={logo} alt="logo" /> </h1>
            
                <div className="wrap-search-user">
                    <input id="searchbox" onBlur={()=>props.setSearchResult([])} onChange={(e)=>{setSearchTxt(e.currentTarget.value)}} onKeyPress={(e)=>handleSearch(e)} value={searchTxt} type="text" placeholder=" Type to Search"></input>
                    <i  className="fa fa-user" onClick={toggleUserPopup}></i>
                </div>
        </section>
    )
}

export default Navbar;
