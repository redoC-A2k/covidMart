import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {showToast} from 'toast';
import CtaButton from './CtaButton';

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
                    <div className="col-11 offset-1">
                        <CtaButton solid id="buynow" onClick={handleBuyNow}><span className="fa-solid fa-bag-shopping icon"></span><span className='text'>Buy Now</span></CtaButton>
                        <CtaButton id="addtocart" onClick={handleAddCart}><span className="fa-solid fa-cart-shopping icon"></span><span className='text'>Add to Cart</span></CtaButton>
                    </div>
                    {/* <div>
                        <span className="fa-solid fa-cart-shopping"></span>
                        <br></br>
                        <span className="test"></span>

                    </div> */}
                </div>
            </div>
        </div>
    )
}