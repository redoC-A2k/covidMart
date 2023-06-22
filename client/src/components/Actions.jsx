import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CtaButton from './CtaButton';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function Actions (props) {
    // console.log(props.product)
    // const [isInCart,setIsInCart] = useState(false);
    const history = useHistory()

    let callback = ()=>{
        history.push('/user/cart')
    }

    let handleBuyNow = function() {
        props.addToCart(props.product._id, props.product.price, props.product.title,callback);
    }

    let handleAddCart = ()=>{
        props.addToCart(props.product._id, props.product.price, props.product.title);
    }


    let List = function (props) {
        return (
            <div className='row'>
                <div className="col-12 col-md-11 offset-md-1">
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
                    <div className="col-12 col-md-11 offset-md-1">
                        {arr}
                        <span className='mytooltip'>Give your rating <br></br>at the end of page</span>
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
                    <div className="col-12 col-md-11 offset-md-1">
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