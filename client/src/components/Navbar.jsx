import React from "react"
import { Layout, Menu, Slider, Dropdown, Divider, Row, Col, Radio } from "antd";
import "../App.css"
import { Component } from "react"
import styles from "./navbar.module.css"
import { Link } from 'react-router-dom';
import { MenuOutlined, ArrowLeftOutlined, UserOutlined, ShoppingOutlined } from "@ant-design/icons"
import { filterByPrice, filterByCategory } from "../redux/ActionCreators/filter";
import { connect } from "react-redux";

const { Header, Sider } = Layout;
const { SubMenu } = Menu;

const mapDispatchToProps = (dispatch) => {
    return {
        filterByPrice: (price) => { dispatch(filterByPrice(price)) },
        filterByCategory:(category) => {dispatch(filterByCategory(category))}
    }
}

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            priceInput: 10000,
            bool:true
        }
    }

    componentDidMount() {
        window.onscroll = () => {
            let elem = document.getElementById("hider")
            if (window.pageYOffset > 150) {
                if(elem!==undefined)
                elem.style.top = "0";
            }
            if ((window.pageYOffset < 150)&&(this.state.bool)) {
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
                    <Link to="/auth" onClick={() => {
                        localStorage.clear();
                    }}><span className={styles.ddlink}>Logout</span></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/cart" ><span className={styles.ddlink}>Cart</span></Link>
                </Menu.Item>
            </Menu>
        )
        return (
            <Layout style={{ backgroundColor: "white", width: "40vw" }}>
                <Sider collapsedWidth={0} style={{ zIndex: "2", position: "fixed" }} collapsed={this.state.collapsed} trigger={null} collapsible>
                    <div className="brand" style={{ textAlign: "center", fontSize: "2em", height: "30px", backgroundColor: "white" }}>Filter</div>
                    <Divider />
                    <Menu theme="light" mode="inline">
                        <SubMenu title="Filter By Price">
                            <Menu.Item key="1">
                                <Row style={{ width: "100%" }}>
                                    <Col span={16}>
                                        <Slider value={this.state.priceInput} tipFormatter={null} onChange={(value) => {
                                            this.setState({ priceInput: value })
                                            this.props.filterByPrice(this.state.priceInput)
                                        }} min={100} max={10000} />
                                    </Col>
                                    <Col span={8}>
                                        <input value={this.state.priceInput} onChange={(value) => { this.setState({ priceInput: value.target.value }) }} />
                                    </Col>
                                </Row>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu title="Filter By Category">
                            {/* <Menu.Item key="2">Masks</Menu.Item>
                            <Menu.Item key="3">PPE kit</Menu.Item> */}
                            <Radio.Group onChange={(e) => {
                                let category = e.target.value;
                                this.props.filterByCategory(category)
                            }}>
                                <br />
                                <Radio value={"all"}>
                                    All
                                </Radio>
                                <br />
                                <Radio value={"masks"}>
                                    Masks
                                </Radio>
                                <br />
                                <Radio value={"ppekit"}>
                                    PPE-Kit
                                </Radio>
                                <br />
                                <Radio value={"gloves"}>
                                    Gloves
                                </Radio>
                                <br />
                                <Radio value={"disinfectant"}>
                                    disinfectant
                                </Radio>
                                <br />
                                <Radio value={"sanitizer"}>
                                    sanitizer
                                </Radio>
                                <br />
                                <Radio value={"thermometer"}>
                                    thermometer
                                </Radio>
                                <br />
                                <Radio value={"other"}>
                                    other
                                </Radio>
                                <br />

                            </Radio.Group>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <div id="hider" className={styles.nav} >
                        <Header className="navHeader" style={{ borderBottom: "4px solid #1890ff" }}>
                            {this.state.collapsed ? <MenuOutlined className="menuicon" onClick={()=>{this.toggle();this.setState({bool:false})}} /> : <ArrowLeftOutlined className="arrowicon" onClick={()=>{this.toggle();this.setState({bool:true})}} />}
                            <div style={{ position: "relative", display: "inline-block", fontSize: "3em", paddingBottom: "4px", color: "#1890ff" }}><b>CovidMart<ShoppingOutlined /> </b></div>
                            <Dropdown arrow placement="bottomCenter" overlay={menu}><UserOutlined className="usericon" /></Dropdown>
                        </Header>
                    </div>
                </Layout>
            </Layout>

        )
    }
}

export default connect(null, mapDispatchToProps)(Navbar);