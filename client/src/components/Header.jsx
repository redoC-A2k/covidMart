import React, { Component } from "react"
import back from '../assets/images/back5croppednew.jpg'
import Navbar from "./Navbar";
class Header extends Component {
  render() {

    return (
      <div className="header">
        <Navbar/>
        <div>
        <div style={{minWidth:"15vh",display:"flex",justifyContent:"center"}}>
        <div style={{display:"block",fontSize:"13vh",position:"absolute",top:"10px",color:"white"}}>We Care for you </div>
        <div style={{display:"block",fontSize:"3vh",position:"absolute",top:"17vh",color:"white"}}>CovidMart </div>
        </div>
        <img style={{ width:"100%",height:"30vh"}} src={back} alt="backimg" />
        </div>
      </div>
    );
  }
}

export default Header;
