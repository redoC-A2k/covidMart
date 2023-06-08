import React from "react"
// import { Layout, Menu, Slider, Dropdown, Divider, Row, Col, Radio } from "antd";
// import "../App.css"
import { Component } from "react"
import logo from "../assets/images/CovidMart logo no background.png"
//import styles from "./navbar.module.css"
import { Link } from 'react-router-dom';
import { useState } from "react";
//import { MenuOutlined, ArrowLeftOutlined, UserOutlined, ShoppingOutlined } from "@ant-design/icons"

// const { Header, Sider } = Layout;
// const { SubMenu } = Menu;


function Navbar(props){
    // const [collapsed,setCollapsed] = useState(true)
    // const [price,setPrice] = useState(10000)
    // const [showPopup,setShowPopup] = useState(false)
    // const [category,setCategory] = useState("all")

    function toggleUserPopup(){
        let popup = document.getElementById("popup")
        if (popup.style.visibility === "hidden"||popup.style.visibility===""){
            popup.style.visibility = "visible";
        }
        else{
            popup.style.visibility = "hidden"
        }
        // let h4a = document.querySelector("#popup h4 a")
    }

    function slideSidebar(){
        let sidebar = document.getElementById("sidebar")
        sidebar.style.visibility = "visible"
    }


    return (
        <section id="navbar">
            {/* <div><i className="fa fa-bars"></i></div> */}
            <div>
                <i className="fa-solid fa-bars" onClick={slideSidebar}></i>
            </div>
           
            <h1 className="brand"><Link to="/">CovidMart</Link><img src={logo} alt="logo" /> </h1>
            
            <div>
                {/* <input type="text"></input> */}
                <i className="fa fa-user" onClick={toggleUserPopup}></i>
            </div>
        </section>
    )
}

export default Navbar;
