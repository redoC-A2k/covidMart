import React, { useEffect } from "react"
// import logo from "../../public/assets/images/CovidMart logo no background.png"
import { Link } from 'react-router-dom';
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Navbar(props){
    const [showCross , setShowCross] = useState(false);
    const [searchTxt, setSearchTxt] = useState("");
    const history = useHistory()

    useEffect(()=>{
        let inputelement = document.querySelector('#header #navbar > div.wrap-search-user input')
        inputelement.addEventListener('focus',()=>{
            setShowCross(true)
        })
    },[])

   function handleSearch(event) {
        if(event.charCode==13 && searchTxt.length!=0){
           fetch(`${process.env.REACT_APP_BACKEND}/products/search`,{
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
        handleCross();
        else setSearchTxt(event.currentTarget.value)
    }

    function handleCross(){
        setSearchTxt("");
        props.setSearchResult([]);
        let h1element = document.querySelector('#header #navbar > h1')
        // if(h1element.classList.contains("invisible"))
        h1element.classList.remove("invisible")
        let inputelement = document.querySelector('#header #navbar > div.wrap-search-user input')
        inputelement.classList.remove("visible")
        let searchicon = document.querySelector('#header #navbar > div.wrap-search-user i#searchicon')
        searchicon.classList.remove("invisible")
        let wrapsearchuserdiv = document.querySelector('#header #navbar > div.wrap-search-user');
        wrapsearchuserdiv.classList.remove("expand")
        setShowCross(false)
    }

    function handleSearchIconClick(){
        let h1element = document.querySelector('#header #navbar > h1')
        h1element.classList.add("invisible")
        let inputelement = document.querySelector('#header #navbar > div.wrap-search-user input')
        inputelement.classList.add("visible")
        inputelement.focus();
        let searchicon = document.querySelector('#header #navbar > div.wrap-search-user i#searchicon')
        searchicon.classList.add("invisible")
        let wrapsearchuserdiv = document.querySelector('#header #navbar > div.wrap-search-user');
        wrapsearchuserdiv.classList.add("expand")
    }
    
    function handleBarsIcon(){
        if(history.location.pathname==='/')
        props.setLeft("0")
    }

    return (
        <section id="navbar">
            <div className="sidebar-icon">
                <i className="fa-solid fa-bars" onClick={handleBarsIcon}></i>
            </div>
           
            <h1 className="brand"><Link to="/">CovidMart</Link><img src={process.env.PUBLIC_URL+"/assets/images/CovidMart logo no background.png"} alt="logo" /> </h1>
            
            <div className="wrap-search-user">
                <span className="search"><i onClick={handleCross} className={`fa-solid fa-xmark ${showCross?"":"invisible"}`}></i></span>
                <input onChange={(e)=>{handleChange(e)}} onKeyPress={(e)=>handleSearch(e)}  value={searchTxt} type="text" placeholder=" Type to Search"/>
                <i id="searchicon" className="fa-solid fa-magnifying-glass" onClick={handleSearchIconClick}></i>
                <i  className="fa fa-user" onClick={()=>props.setRight("0")}></i>
            </div>
        </section>
    )
}

export default Navbar;
