import React, { useState } from 'react';
//import { fetchAllProducts } from "../redux/ActionCreators/fetchAllProducts";
import { applyFilter } from '../redux/ActionCreators/filter'
import { connect } from "react-redux";
// import { Card, Row, Divider, Col, Button, Spin, Rate } from 'antd';
import Card from "../components/Card";
import { useEffect } from 'react';



const mapStateToProps = state => {
  return { allproducts: state.dbdata }
}
const mapDispatchToProps = dispatch => {
  return {
    applyFilter: (price, category) => { dispatch(applyFilter(price, category)) }
  }
}

function Home(props) {
    const [isLoading,setIsLoading] = useState(true);
    const [price,setPrice] = useState(4000);
    const [category,setCategory] = useState("all");

  useEffect(()=>{
    if (localStorage.getItem("jwt") === null) {
      window.location = ("http://localhost:3000/auth")
      alert("you are not logged in")
    }
    // console.log(props);
    // await this.props.fetchdata(this.state.noOfProducts)
    if(props.allproducts==null)
    props.applyFilter(price,category)
  },[])

  if (props.allproducts===null) {
    return ( 
    <div className='row'>Loading</div>
    )
  } 
  else{
    return ( <section id="home">
      <div className='row'>
      {props.allproducts.map((eachProduct , ind)=>{
        return (<Card product={eachProduct} key={ind}/>)
      })}</div>
    </section>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
