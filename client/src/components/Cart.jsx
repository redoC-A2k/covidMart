import React, { Component, useState } from 'react'
import { useEffect } from 'react';
// import { Row, Col, Button, Divider } from 'antd';
import { connect } from "react-redux";
// import { DeleteOutlined } from '@ant-design/icons';
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
function Cart(props) {
    const [totalprice,setTotalPrice] = useState(0)
    useEffect(()=>{
        console.log("fetching ..")
        props.fetchcart()
        //razorpay script loading
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    },[])

    let openPayModal = (amount, fetchcart, setTotalpricezero) => {
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

    let setTotalpricezero = () => {
        setTotalPrice(0
            // window.location.reload()
        )
    }
        let MyCart = () => {
            let sum = 0;
            if (props.mycart && props.mycart[0].productId != "empty") {
                let myproductsarray = props.mycart.map((eachProduct, ind) => {
                    sum = sum + eachProduct.quantity * eachProduct.price
                    if ((props.mycart.length - 1 === ind) && (totalprice === 0)) {
                        setTotalPrice({ totalprice: sum })
                    }
                    return (
                        <div className="row" key={ind} style={{ width: "100%" }}>
                            <div className="col-4">
                                {eachProduct.title}
                            </div>
                            <div className="col-2">
                                {eachProduct.quantity}
                            </div>
                            <div className='col-2'>
                                {eachProduct.price}
                            </div>
                            <div className='col-2'>
                                {eachProduct.quantity * eachProduct.price}
                            </div>
                            <div className='col-2'>
                                <span onClick={() => { props.deleteProductFromCart(localStorage.getItem("userId"), eachProduct.productId) }} > Delete </span>
                            </div>
                        </div>
                    )
                })
                return myproductsarray
            }
            else {
                return (<h4 style={{ textAlign: "center", width: "100%" }}>cart is empty</h4>)
            }
        }
        // if((props.mycart.length-1===ind)&&(state.totalprice===0))
        // totalprice=sum
        // // setState({totalprice:sum})
        return (
            <div className='row'style={{ width: "100%" }}>
                {/*</div><div style={{ display: 'none' }}>
                    <Header />
        </div>*/}
                <div className='col-12'>
                    <h1 style={{ textAlign: "center" }}>Cart</h1>
                </div>
                <div className='ro' style={{ width: "100%" }}>
                    <div className='col-4'>
                        <h3>Product title</h3>
                    </div>
                    <div className='col-2'>
                        <h3>Product qunatity</h3>
                    </div>
                    <div className='col-2'>
                        <h3>Product price</h3>
                    </div>
                    <div className='col-2'>
                        <h3>Total price</h3>
                    </div>
                </div>
                <div className='row' style={{ width: "100%" }}>
                    <MyCart />
                </div>
                <hr />
                <div className='row' style={{ width: "100%", justifyContent: "center" }}>
                    <button onClick={() => {
                        console.log(totalprice)
                        openPayModal(totalprice, fetchcart, setTotalpricezero)
                    }}>Proceed to pay </button>
                </div>
            </div>
        )
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
