import React, {useEffect } from 'react';
import { connect } from "react-redux";
import { fetchAProduct, giveRating } from "../redux/ActionCreators/fetchAProduct"
import { incrementProductInCart } from "../redux/ActionCreators/incrementProductInCart";
import { addProductInCart } from "../redux/ActionCreators/addproductincart";
import { fetchcart } from '../redux/ActionCreators/fetchCart';
import { deleteProductFromCart } from '../redux/ActionCreators/deleteProductFromCart';
import { fetchUserdata } from '../redux/ActionCreators/fetchUserdata';
import { useState } from 'react';
import Gallery from '../components/Gallery';
import Actions from '../components/Actions';
import Description from '../components/Descriptions';
import Review from '../components/Review';
import {showLoader,hideLoader} from "utility"

const mapStateToProps = state => {
  return {
    myproduct: state.myproduct,
    userdata: state.user
  };
}
const mapDispatchToProps = dispatch => {
  return {
    fetchAProduct: (productId) => { dispatch(fetchAProduct(productId)) },
    addProductInCart: (productId, price, myproductTitle) => { dispatch(addProductInCart(productId, price, myproductTitle)) },
    // updateProductInCart: (productId, quantityno, price, myproductTitle) => { dispatch(incrementProductInCart(productId, quantityno, price, myproductTitle)) },
    // deleteProductFromCart: (userId, productId) => { dispatch(deleteProductFromCart(userId, productId)) },
    // fetchCart: () => { dispatch(fetchcart()) },
    giveRating: (productId, userId, value) => { dispatch(giveRating(productId, userId, value)) },
    fetchUserdata: (userId) => { dispatch(fetchUserdata(userId)) }
  }
}

function Product(props){
  let productId=props.location.pathname.split("/")[2];

  useEffect(()=>{
    // props.fetchCart();
    props.fetchAProduct(productId)
    props.fetchUserdata(localStorage.getItem("userId"))
    // console.log(props.location.pathname)
    showLoader()
  },[props.location.pathname])
  
  if(props.myproduct!==null && props.userdata!==null){
    hideLoader();
    return(
      <section id="product">
        <div className='row'>
          <div className="col-lg-7">
            <Gallery product={props.myproduct}/>
          </div>
          <div className="col-lg-5">
            <Actions user={props.userdata} product={props.myproduct} addToCart={props.addProductInCart} />
          </div>
          <div className="col-12">
            <Description product={props.myproduct}/>
          </div>
          <div className="col-12">
            <Review productId={props.myproduct._id} userId={props.userdata._id} giveRating={props.giveRating}/>
          </div>
        </div>
      </section>
    )
  }
  else {
    return<></>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
