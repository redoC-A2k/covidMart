import React, {  useState } from 'react'
import { useEffect } from 'react';
import { connect } from "react-redux";
import { deleteProductFromCart, updateProductInCart } from '../redux/ActionCreators/cart'
import { fetchcart } from '../redux/ActionCreators/cart';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import CtaButton from './CtaButton';
import {showLoader,hideLoader} from "utility"


const mapStateToProps = state => {
    return { mycart: state.cart }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchcart: (setPrice) => { dispatch(fetchcart(setPrice)) },
        deleteProductFromCart: (userId, productId, setPrice) => { dispatch(deleteProductFromCart(userId, productId, setPrice)) },
        updateProductInCart: (userId, productId, quantity, setPrice) =>{ dispatch(updateProductInCart(userId, productId, quantity, setPrice))}
    }
}
function Cart(props) {
    const [totalprice,setTotalPrice] = useState(0)

    function setPrice(price){
        setTotalPrice(price);
    }
   
    useEffect(()=>{
        showLoader()
        props.fetchcart(setPrice)
        //razorpay script loading
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
                fetch(`${process.env.REACT_APP_BACKEND}/payment`, {
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
        fetch(`${process.env.REACT_APP_BACKEND}/order`, {
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

    return (
        <section className='container' id="cart">
            <div className="row">
                <div className='col-12'>
                    <h2 className='gradient' style={{ textAlign: "center" }}>Cart</h2>
                </div>
            </div>
            {totalprice?
            (<div className='row'>
                <div className="col-12 table-responsive">
                    <table className='table hoverable'>
                        <thead className='dark'>
                            <tr>
                                <th scope='col'></th>
                                <th scope='col'>Title</th>
                                <th scope='col'>Quantity</th>
                                <th scope='col'>Price</th>
                                <th scope='col'>Total</th>
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
                                            <td>
                                                <select value={eachItem.quantity} onChange={(event)=>props.updateProductInCart(localStorage.getItem("userId"),eachItem.productId,event.target.value,setPrice)}>
                                                    <option value={1}>1</option>
                                                    <option value={2}>2</option>
                                                    <option value={3}>3</option>
                                                    <option value={4}>4</option>
                                                    <option value={5}>5</option>
                                                    <option value={6}>6</option>
                                                    <option value={7}>7</option>
                                                    <option value={8}>8</option>
                                                    <option value={9}>9</option>
                                                    <option value={10}>10</option>
                                                </select>
                                            </td>
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
                                <td style={{fontWeight:600}}>Amount <span>Payable :</span> </td>
                                <td style={{fontWeight:600}}>{totalprice}₹</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr />
                <div className='row w-100' style={{ justifyContent: "center" }}>
                        <CtaButton solid onClick={() => {
                            console.log(totalprice)
                            openPayModal(totalprice, fetchcart, setPrice)
                        }}><span className='fa-solid fa-indian-rupee-sign icon'></span><span className='text'>pay</span></CtaButton>
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
