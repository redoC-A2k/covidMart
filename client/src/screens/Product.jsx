import React, { Component } from 'react';
import { connect } from "react-redux";
import { PageHeader, Row, Button, Rate, Col, Divider, Spin, Badge, } from 'antd';
import styles from "./Product.module.css";
import { fetchAProduct } from "../redux/ActionCreators/fetchAProduct"
import { incrementProductInCart } from "../redux/ActionCreators/incrementProductInCart";
import { addProductInCart } from "../redux/ActionCreators/addproductincart";
import { PlusOutlined, MinusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
const mapStateToProps = state => {
    return { myproduct: state.myproduct };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAProduct: () => { dispatch(fetchAProduct()) },
        addProductInCart: (productId) => { dispatch(addProductInCart(productId)) },
        updateProductInCart: (productId, quantityno) => { dispatch(incrementProductInCart(productId, quantityno)) }
    }
}

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showcartdiv: false,
            inputquantity: 0,
            showbadge: false
        }
    }
    async componentDidMount() {
        console.log(this.state.showcartdiv)
        this.props.fetchAProduct()
        await console.log("sending request")
    }

    render() {
        let myproduct = this.props.myproduct
        let myproductId = localStorage.getItem("_id")
        console.log(myproductId)
        let slideIndex = 0;
        let myslides = document.getElementsByClassName(styles.myimages)
        let mydivs = document.getElementsByClassName(styles.picdivs)
        setTimeout(() => {
            for (let i = slideIndex + 1; i < myslides.length; i += 1) {
                myslides[i].style.display = "none";
                mydivs[i].style.display = "none"
            }
        }, 100)

        function incrementSlides() {
            myslides[slideIndex].style.display = "none"
            mydivs[slideIndex].style.display = "none"
            slideIndex += 1;
            if (slideIndex === myslides.length) {
                slideIndex = 0;
            }
            myslides[slideIndex].style.display = "block"
            mydivs[slideIndex].style.display = "block"
        }
        function decrementSlides() {
            myslides[slideIndex].style.display = "none";
            mydivs[slideIndex].style.display = "none";
            slideIndex -= 1;
            if (slideIndex === (-1)) {
                slideIndex = myslides.length - 1;
            }
            myslides[slideIndex].style.display = "block";
            mydivs[slideIndex].style.display = "block";
        }

        let ProductComponent = () => {

            if (this.props.myproduct) {
                return (
                    <Row>
                        <Row style={{ width: "100%" }}>
                            {myproduct ? (<PageHeader className={styles.pageClass} onBack={() => { this.props.history.goBack() }} title={myproduct.title}
                                extra={[<Badge count={(this.state.showbadge) ? 1 : 0} ><ShoppingCartOutlined style={{ fontSize: "2em" }} /></Badge>]} />) : (<div>Hello</div>)}
                        </Row>
                        <Row style={{ width: "100%" }}>
                            {
                                myproduct.images.map((image, ind) => {
                                    return (
                                        <div key={ind} className={styles.picdivs} >
                                            <img className={styles.myimages} src={image} />
                                            <a className={styles.next} onClick={() => { incrementSlides() }}>{String.fromCharCode(10095)}</a>
                                            <a className={styles.prev} onClick={() => { decrementSlides() }}>{String.fromCharCode(10094)}</a>
                                            <div >
                                                <h3 style={{ fontSize: "3vw" }}>{myproduct.title}</h3>
                                                <h3 style={{ direction: "rtl", fontSize: "2.8vw" }}>-/ {myproduct.price} Rs</h3>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Row>
                        <Row style={{ display: "block-flex", flexWrap: "wrap", width: "60vw", marginRight: "auto", marginLeft: "auto", justifyContent: "space-between" }}>
                            {myproduct.features.map((feature, ind) => {
                                return (<div className={styles.feature} key={ind}>{feature}</div>)
                            })}
                        </Row>
                        <Divider />
                        <Row style={{ width: "60vw", marginTop: "10px", marginLeft: "auto", marginRight: "auto" }}>
                            <Col span={12}>
                                <Rate defaultValue={3} disabled style={{ marginLeft: "auto", marginRight: "auto" }} />
                            </Col>
                            <Col span={12}>
                                <div id="cartdiv">
                                    {this.state.showcartdiv ?
                                        (<div style={{ display: "flex", justifyContent: "space-between", width: "50%", marginLeft: "auto", marginRight: "auto", height: "7vh" }}>
                                            <PlusOutlined onClick={() => {
                                                new Promise(
                                                    (res, rej) => {
                                                        this.setState((State) => {
                                                            res()
                                                            return { inputquantity: this.state.inputquantity + 1 }
                                                        })
                                                    }
                                                )
                                                    .then(() => {
                                                        console.log(this.state.inputquantity)
                                                        this.props.updateProductInCart(myproductId, this.state.inputquantity)
                                                    })
                                            }}
                                                style={{ color: "#1890ff", border: "2px solid #1890ff", fontSize: "3.5em" }} />
                                            <input style={{ fontSize: "2em", width: "20%", marginBottom: "0px" }} readOnly value={this.state.inputquantity} min={1} max={this.props.myproduct.quantity} type="text" />
                                            <MinusOutlined onClick={() => {
                                                if ((this.state.inputquantity - 1) === 0) {
                                                    this.setState({ showbadge: false })
                                                    this.setState({ showcartdiv: false })
                                                }
                                                new Promise(
                                                    (res, rej) => {
                                                        this.setState((State) => {
                                                            res()
                                                            return { inputquantity: this.state.inputquantity - 1 }
                                                        })
                                                    }
                                                )
                                                    .then(() => {
                                                        console.log(this.state.inputquantity)
                                                        this.props.updateProductInCart(myproductId, this.state.inputquantity)
                                                    })
                                            }} style={{ border: "2px solid #1890ff", color: "#1890ff", fontSize: "3.5em" }} />
                                        </div >) : (<Button block onClick={() => {
                                            this.setState({ showcartdiv: true });
                                            this.setState({ showbadge: true });
                                            new Promise(
                                                (res, rej) => {
                                                    this.setState((State) => {
                                                        res()
                                                        return { inputquantity: this.state.inputquantity + 1 }
                                                    })
                                                }
                                            )
                                                .then(() => {
                                                    console.log(this.state.inputquantity)
                                                    this.props.addProductInCart(myproductId)
                                                })
                                        }} className={styles.addbtn}>
                                            Add to Cart
                                        </Button>)
                                    }
                                </div>
                            </Col>
                        </Row>
                        <Divider />
                        <Row style={{ width: "60vw", marginLeft: "auto", marginRight: "auto" }}>
                            <h3>
                                Description
                    </h3>
                            <ul style={{ listStyleType: "disc" }}>
                                {myproduct.description.map((desc, ind) => {
                                    return <li key={ind}><h5>{desc}</h5></li>
                                })}
                            </ul>
                        </Row>
                    </Row>
                )
            }
            else {
                return (
                    <div>
                        <Spin />
                    </div>
                )
            }
        }
        return <ProductComponent />
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)