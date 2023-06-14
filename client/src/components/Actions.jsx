import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {showToast} from '../assets/js/showToast';

// TODO: Make this component responsive on phone
export default function Actions (props) {
    // console.log(props.product)
    // const [isInCart,setIsInCart] = useState(false);

    let handleBuyNow = function() {

    }

    let handleAddCart = ()=>{
        props.addToCart(props.product._id, props.product.price, props.product.title);
        // setIsInCart(true)
        showToast("Product Added to Cart");
    }

    // let handleRemoveCart = ()=>{
    //     props.deleteFromCart(props.user._id,props.product._id)
    //     setIsInCart(false);
    //     showToast("product removed from cart");
    // }

    let List = function (props) {
        return (
            <div className='row'>
                <div className="col-11 offset-1">
                    {
                        props.product.features.map((eachFeature,ind)=>{
                            return (
                                <div className="list" key={ind}>
                                    <span className="fa-solid fa-angle-right icon"></span>
                                    <p>{eachFeature}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    let Ratings = function(props) {
        let arr = []
        // TODO: Add rating hover tooltip with content "you can give your rating below"
        for (let index = 0; index < 5; index++) {
            if(props.product.rating.value > 0){
                if(index < props.product.rating.value){
                    arr.push((<span key={index} className="star-icon solid">★</span>))
                }
                else{
                    arr.push((<span key={index} className="star-icon">★</span>))
                }
            }
            else{
                arr.push((<span key={index} className="star-icon">★</span>))
            }
        }
            arr.push((<p key={5}>({props.product.rating.count})</p>))
        return(
                <div className="row rating">
                    <div className="col-11 offset-1">
                        {arr}
                    </div>
                </div>
        )
    }

    return (
        <div className='row' id="actions">
            <div className='col-12'>
                <h3 className='gradient'>{props.product.title}</h3>
                <List product={props.product} />
                <hr/>
                <Ratings product={props.product} />
                <hr/>
                <div className='btndiv row'>
                    {/* TODO: Only Allow adding here and increment product when more than once add to cart button has been added */}
                    <div className="col-sm-7 offset-1">
                        <button id="buynow" onClick={handleBuyNow} className='type1 w-100'><span className="background"></span><span className='text'>Buy Now</span><span className="fa-solid fa-bag-shopping icon"></span></button>
                        <button id="addtocart" onClick={handleAddCart} className='type2 w-100'><span className="background"></span><span className='text'>Add to Cart</span><span className="fa-solid fa-cart-shopping icon"></span></button>
                    </div>
                </div>
            </div>
        </div>
    )
}