import React from "react"
import { useLocation } from "react-router-dom";
import back from '../assets/images/back5croppednew.jpg'
import Navbar from "./Navbar";
import Popup from "./Popup";
import Sidebar from "./Sidebar";
function Header(props){
  const location = useLocation();
  return (
    <section id="header">
      <Navbar 
        toggleBool={(value) => { props.toggleBool(value) }} 
        applyFilterPrice={(price) => { props.applyFilterPrice(price) }} 
        applyFilterCategory={(category) => { props.applyFilterCategory(category) }} 
      />
      <Popup/>
      <Sidebar/>
      {location.pathname==='/'?(<div>
        <div id="banner">
          <h1 className="title"><span>We Care for you</span></h1>
          <h2 className="subtitle"><span>CovidMart</span></h2>
          <img src={back} alt="backimg" />
        </div>
      </div>):(<div></div>)}
    </section>
  );
}

export default Header;
