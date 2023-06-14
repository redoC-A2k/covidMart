import React, { useEffect } from "react"
import logo from "../assets/images/CovidMart logo no background.png"
import { Link } from 'react-router-dom';
import { useState } from "react";

function Navbar(props){
    const [searchTxt , setSearchTxt] = useState("");

   function handleSearch(event) {
        if(event.charCode==13 && searchTxt.length!=0){
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
                    resultTitles.push( { 
                        title:data[i].title,
                        image:data[i].images[0],
                        url:"/product/"+data[i]._id
                    })
                }
                props.setSearchResult(resultTitles)
           }) 
        }    
    } 

    function handleChange(event){
        if(event.currentTarget.value==="")
        handleClear();
        else setSearchTxt(event.currentTarget.value)
    }

    function handleClear(){
        setSearchTxt("");
        props.setSearchResult([]);
    }


    //TODO: Show navbar only on home page
    return (
        <section id="navbar">
            {/* <div><i className="fa fa-bars"></i></div> */}
            <div className="sidebar-icon">
                <i className="fa-solid fa-bars" onClick={()=>props.setLeft("0")}></i>
            </div>
           
            <h1 className="brand"><Link to="/">CovidMart</Link><img src={logo} alt="logo" /> </h1>
            
            <div className="wrap-search-user">
                <span className="search">{searchTxt.length?<i onClick={handleClear} className="fa-solid fa-xmark"></i>:<i className="invisible fa-solid fa-xmark"></i>}</span>
                <input onChange={(e)=>{handleChange(e)}} onKeyPress={(e)=>handleSearch(e)}  value={searchTxt} type="text" placeholder=" Type to Search"></input>
                <i  className="fa fa-user" onClick={()=>props.setRight("0")}></i>
            </div>
        </section>
    )
}

export default Navbar;
