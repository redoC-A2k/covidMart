import React from 'react';
import { Link } from 'react-router-dom';

export default function Card (props) {
    let imageUrl = "url("+props.product.images[0]+")"
    let product_url = "/product/"+props.product._id;
    return (
        <div className='mycard col-sm-6 col-lg-4 '>
            <Link to={product_url}>
                <div className="content"  style={{backgroundImage:imageUrl}}>
                    <div className="background"><span className="fa fa-eye" aria-hidden="true"></span></div>
                    <div className='price'>
                        <h4>{props.product.category}</h4>
                        <h4>Rs {props.product.price}</h4>
                    </div>
                    <div className='title'>
                        <h4>{props.product.title}</h4>
                        <div className='rating'>
                            <span className='text'>{props.product.rating.value}</span><span className='fa-solid fa-star'></span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}