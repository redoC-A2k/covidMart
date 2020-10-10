import React, { Component } from 'react'
import styles from "./cart.module.css"
import { Row, Col, Button, Divider } from 'antd';
import { connect } from "react-redux";
import { DeleteOutlined } from '@ant-design/icons';
import { deleteProductFromCart } from '../redux/ActionCreators/deleteProductFromCart'
import { fetchcart } from '../redux/ActionCreators/fetchCart';
import Header from './Header';


const mapStateToProps = state => {
    return { mycart: state.cart }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchcart: () => { dispatch(fetchcart()) },
        deleteProductFromCart: (userId, productId) => { dispatch(deleteProductFromCart(userId, productId)) }
    }
}
class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalprice: 0
        }
    }
    componentDidMount() {
        console.log("fetching ..")
        this.props.fetchcart()
        //razorpay script loading
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);

    }

    openPayModal = (amount, fetchcart, setTotalpricezero) => {
        amount = amount * 100;
        amount = Math.ceil(amount)
        let options = {
            "key": "rzp_test_hGL6N8M5oGjVNF",
            "amount": "",
            "currency": "INR",
            "name": "CovidMart",
            "order_id": "",
            "handler": function (response) {
                fetch("http://localhost:4000/payment", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        razorpay_signature: response.razorpay_signature,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        userId: localStorage.getItem("userId")
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.message === "ok") {
                            console.log("if runs")
                            fetchcart()
                            setTotalpricezero()
                            alert("Payment successful")
                        }
                    })
            }
        }
        fetch("http://localhost:4000/order", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount: amount
            })
        })
            .then(res => res.json())
            .then(data => {
                options.amount = data.amount;
                options.order_id = data.id;
                // console.log(options)
                let rzp1 = new window.Razorpay(options)
                rzp1.open()
            })
    }

    setTotalpricezero = () => {
        console.log("state saved")
        this.setState({ totalprice: 0 })
    }
    render() {
        let sum = 0;
        let MyCart = () => {
            if (this.props.mycart && this.props.mycart[0].productId != "empty") {
                let myproductsarray = this.props.mycart.map((eachProduct, ind) => {
                    sum = sum + eachProduct.quantity * eachProduct.price
                    if ((this.props.mycart.length - 1 === ind) && (this.state.totalprice === 0)) {
                        this.setState({ totalprice: sum })
                    }
                    return (
                        <Row key={ind} style={{ width: "100%" }}>
                            <Col span={11}>
                                {eachProduct.title}
                            </Col>
                            <Col span={4}>
                                {eachProduct.quantity}
                            </Col>
                            <Col span={4}>
                                {eachProduct.price}
                            </Col>
                            <Col span={4}>
                                {eachProduct.quantity * eachProduct.price}
                            </Col>
                            <Col span={1}>
                                <DeleteOutlined onClick={() => { this.props.deleteProductFromCart(localStorage.getItem("userId"), eachProduct.productId) }} />
                            </Col>
                        </Row>
                    )
                })
                return myproductsarray
            }
            else {
                return (<h4 style={{ textAlign: "center", width: "100%" }}>cart is empty</h4>)
            }
        }
        // if((this.props.mycart.length-1===ind)&&(this.state.totalprice===0))
        // totalprice=sum
        // // this.setState({totalprice:sum})
        return (
            <Row style={{ width: "100%" }}>
                <div style={{ display: 'none' }}>
                    <Header />
                </div>
                <Row style={{ width: "100%" }}>
                    <Col span={24}>
                        <h1 style={{ textAlign: "center" }}>Cart</h1>
                    </Col>
                </Row>
                <Row style={{ width: "100%" }}>
                    <Col span={11}>
                        <h3>Product title</h3>
                    </Col>
                    <Col span={4}>
                        <h3>Product qunatity</h3>
                    </Col>
                    <Col span={4}>
                        <h3>Product price</h3>
                    </Col>
                    <Col span={4}>
                        <h3>Total price</h3>
                    </Col>
                </Row>
                <Row style={{ width: "100%" }}>
                    <MyCart />
                </Row>
                <Divider />
                <Row style={{ width: "100%", justifyContent: "center" }}>
                    <Button onClick={() => {
                        this.openPayModal(this.state.totalprice, this.props.fetchcart, this.setTotalpricezero)
                    }} type="primary">Proceed to pay {this.state.totalprice}</Button>
                </Row>
            </Row>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);