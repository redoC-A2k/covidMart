import React, { Component, useState } from 'react'
import { useEffect } from 'react';
import { connect } from "react-redux";
import { deleteProductFromCart } from '../redux/ActionCreators/deleteProductFromCart'
import { fetchcart } from '../redux/ActionCreators/fetchCart';
import { Link } from 'react-router-dom/cjs/react-router-dom';


const mapStateToProps = state => {
    return { mycart: state.cart }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchcart: (setPrice) => { dispatch(fetchcart(setPrice)) },
        deleteProductFromCart: (userId, productId, setPrice) => { dispatch(deleteProductFromCart(userId, productId, setPrice)) }
    }
}
function Cart(props) {
    const [totalprice,setTotalPrice] = useState(0)

    function setPrice(price){
        setTotalPrice(price);
    }
    
    // function setCart(newCart){
    //     setUserCart(newCart);
    // }

   
    useEffect(()=>{
        // console.log("fetching ..")
        props.fetchcart(setPrice)
        //razorpay scrript loading
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    },[])


    let openPayModal = (amount, fetchcart, setPrice) => {
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
                            fetchcart(setPrice)
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
        setTotalPrice(0)
    }
        return (
            <section className='container' id="cart">
                <div className="row">
                    <div className='col-12'>
                        <h2 className='gradient' style={{ textAlign: "center" }}>Cart</h2>
                    </div>
                </div>
                {totalprice?
                (<div className='row'>
                    <table className='table hoverable'>
                        <thead className='dark'>
                            <tr>
                                <th scope='col'></th>
                                <th scope='col'>Product<br/>Title</th>
                                <th scope='col'>Product<br/>Quantity</th>
                                <th scope='col'>Product<br/>Price</th>
                                <th scope='col'>Total<br/>Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.mycart && props.mycart.length!=0?
                                props.mycart.map((eachItem,ind)=>{
                                    return (
                                        <tr key={ind}>
                                            <td>{ind+1}</td>
                                            <td><Link to={`/product/${eachItem.productId}`}>{eachItem.title}</Link></td>
                                            <td>{eachItem.quantity}</td>
                                            <td>{eachItem.price}₹</td>
                                            <td>{eachItem.quantity * eachItem.price}₹</td>
                                            <td><i className="fa-regular fa-trash-can" onClick={() => { props.deleteProductFromCart(localStorage.getItem("userId"), eachItem.productId, setPrice) }}> </i></td>
                                        </tr>
                                    )
                                })
                                :
                            <></>}
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td style={{fontWeight:600}}>Amount Payable : </td>
                                <td style={{fontWeight:600}}>{totalprice}₹</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <hr />
                    <div className='row w-100' style={{ justifyContent: "center" }}>
                            <button className="type1 " onClick={() => {
                                console.log(totalprice)
                                openPayModal(totalprice, fetchcart, setPrice)
                            }}><span className='background'></span><span className='text'>pay</span><span className='fa-solid fa-indian-rupee-sign icon'></span></button>
                    </div>
                </div>):
                ( <div className="row">
                    <div className="col-12">
                        <center>Cart is Empty</center>
                    </div>
                </div> )}
            </section>
        )
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
