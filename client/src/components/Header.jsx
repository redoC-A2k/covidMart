import React, { useEffect, useState } from "react"
import SearchResults from "./SearchResults";
import { useLocation } from "react-router-dom";
// import back from '../../public/assets/images/back5croppednew.jpg'
import Navbar from "./Navbar";
import FilterSlideBar from "./FilterSlideBar";
import UserSlidebar from "./UserSlidebar";
function Header(props){
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([])
  const [leftWidth,setLeftWidth] = useState("39rem")
  const [rightWidth,setRightWidth] = useState("34rem")
  const [left,setLeft] = useState("-"+leftWidth)
  const [right,setRight] = useState("-"+rightWidth)

  function wrapSetLeft(arg){
    if(arg=="0"||arg=="0rem"){
      setRight("-"+rightWidth)
    }
    setLeft(arg);
  }

  function wrapSetRight(arg){
    if(arg=="0"||arg=="0rem"){
      setLeft("-"+leftWidth)
    }
    setRight(arg);
  }
  

  return (
    <section style={{visibility:props.visibility}} id="header">
      <Navbar 
        toggleBool={(value) => { props.toggleBool(value) }} 
        applyFilterPrice={(price) => { props.applyFilterPrice(price) }} 
        applyFilterCategory={(category) => { props.applyFilterCategory(category) }} 
        setSearchResult = {(result)=>setSearchResults(result)}
        setLeft={wrapSetLeft}
        setRight={wrapSetRight}
      />
      {/* <Popup/> */}
      <SearchResults 
        setSearchResult = {(result)=>setSearchResults(result)}
        searchResults={searchResults} />
      <FilterSlideBar 
        setLeft={wrapSetLeft}
        left={left}
        leftWidth={leftWidth}/>
      <UserSlidebar
       setRight={wrapSetRight}
       right={right}
       rightWidth={rightWidth}/>
      {location.pathname==='/'?(<div id="banner-wrapper">
        <div id="banner">
          <h1 className="title"><span>We Care for you</span></h1>
          <h2 className="subtitle"><span>CovidMart</span></h2>
          <img src="/assets/images/back5croppednew.jpg" alt="backimg" />
        </div>
      </div>):(<div></div>)}
    </section>
  );
}

export default Header;
