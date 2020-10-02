import React from "react"
import { Layout, Menu, Slider, Dropdown } from "antd";
import "../App.css"
import { Component } from "react"
import styles from"./navbar.module.css"
import {Link} from 'react-router-dom';
import { MenuOutlined, ArrowLeftOutlined, UserOutlined, ShoppingOutlined } from "@ant-design/icons"
 
const { Header, Sider } = Layout;
const { SubMenu } = Menu;

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
        }
    }
    toggle = () => {
        this.setState({ collapsed: !this.state.collapsed, })
    }
    render() {
        window.onscroll = () => {
            // console.log(window.pageYOffset)
            // console.log("page scrolled")
            if(window.pageYOffset>100){
                document.getElementById("hider").style.display="block";
            }
            if(window.pageYOffset<100){
                document.getElementById("hider").style.display="none";
            }
        }
        const menu = (
            <Menu style={{border:"0.2px solid #434343",width:"100%",marginRight:"30px"}}>
                <Menu.Item>
                    <Link className = {styles.ddlink} >Logout</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link styles={{backgroundColor:"red",color:"red"}} className="ddlink"><span className={styles.ddlnk} style={{color:"red"}}>Cart</span></Link>
                </Menu.Item>
            </Menu>
        )
        return (
            <Layout style={{ backgroundColor: "white" }}>
                <Sider collapsedWidth={0} style={{ zIndex: "2", position: "fixed" }} collapsed={this.state.collapsed} trigger={null} collapsible>
                    <div className="brand" style={{ backgroundColor: "white" }}>Filter</div>
                    <Menu theme="light" mode="inline">
                        <SubMenu title="filter by price">
                            <Menu.Item key="1"><Slider min={100} max={10000} /></Menu.Item>
                        </SubMenu>
                        <SubMenu title="filter by category">
                            <Menu.Item key="2">Masks</Menu.Item>
                            <Menu.Item key="3">PPE kit</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <div id="hider" style={{zIndex:"1", display: "none", position: "fixed", width: "100%" }} >
                        <Header className="navHeader"style={{borderBottom:"4px solid #1890ff"}} >
                            {this.state.collapsed ? <MenuOutlined className="menuicon" onClick={this.toggle} /> : <ArrowLeftOutlined className="arrowicon" onClick={this.toggle} />}
                            <div style={{position:"relative" ,display:"inline-block",fontSize:"3em",paddingBottom:"4px",color:"#1890ff" }}><b>CovidMart<ShoppingOutlined/> </b></div>
                            <Dropdown  arrow placement="bottomCenter" overlay={menu}><UserOutlined className="usericon"  /></Dropdown>
                        </Header>
                    </div>
                </Layout>
            </Layout>

        )
    }
}

export default Navbar;