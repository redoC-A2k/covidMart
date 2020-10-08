import React from "react"
import { Layout, Menu, Slider, Dropdown, Divider } from "antd";
import "../App.css"
import { Component } from "react"
import styles from "./navbar.module.css"
import { Link } from 'react-router-dom';
import { MenuOutlined, ArrowLeftOutlined, UserOutlined, ShoppingOutlined } from "@ant-design/icons"
import Cart from '../components/Cart';

const { Header, Sider } = Layout;
const { SubMenu } = Menu;

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
        }
    }

    componentDidMount() {
        window.onscroll = () => {
            let elem = document.getElementById("hider")
            if (window.pageYOffset > 150) {
                elem.style.top = "0";
            }
            if (window.pageYOffset < 150) {
                elem.style.top = "-55px";
            }
        }
    }

    toggle = () => {
        this.setState({ collapsed: !this.state.collapsed, })
    }
    render() {
        const menu = (
            <Menu style={{ border: "0.2px solid #434343", width: "100%", marginRight: "30px" }}>
                <Menu.Item>
                    <Link to="/auth" onClick={()=>{
                        localStorage.clear();
                    }}><span className={styles.ddlink}>Logout</span></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/cart" ><span className={styles.ddlink}>Cart</span></Link>
                </Menu.Item>
            </Menu>
        )
        return (
            <Layout style={{ backgroundColor: "white" }}>
                <Sider collapsedWidth={0} style={{ zIndex: "2", position: "fixed" }} collapsed={this.state.collapsed} trigger={null} collapsible>
                    <div className="brand" style={{ textAlign: "center", fontSize: "2em", height: "30px", backgroundColor: "white" }}>Filter</div>
                    <Divider />
                    <Menu theme="light" mode="inline">
                        <SubMenu title="Filter By Price">
                            <Menu.Item key="1"><Slider min={100} max={10000} /></Menu.Item>
                        </SubMenu>
                        <SubMenu title="Filter By Category">
                            <Menu.Item key="2">Masks</Menu.Item>
                            <Menu.Item key="3">PPE kit</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <div id="hider" className={styles.nav} >
                        <Header className="navHeader" style={{ borderBottom: "4px solid #1890ff" }}>
                            {this.state.collapsed ? <MenuOutlined className="menuicon" onClick={this.toggle} /> : <ArrowLeftOutlined className="arrowicon" onClick={this.toggle} />}
                            <div style={{ position: "relative", display: "inline-block", fontSize: "3em", paddingBottom: "4px", color: "#1890ff" }}><b>CovidMart<ShoppingOutlined /> </b></div>
                            <Dropdown arrow placement="bottomCenter" overlay={menu}><UserOutlined className="usericon" /></Dropdown>
                        </Header>
                    </div>
                </Layout>
            </Layout>

        )
    }
}

export default Navbar;