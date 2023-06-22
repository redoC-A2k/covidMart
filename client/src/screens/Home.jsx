import React, { useState } from 'react';
//import { fetchAllProducts } from "../redux/ActionCreators/fetchAllProducts";
import { applyFilter } from '../redux/ActionCreators/filter'
import { connect } from "react-redux";
// import { Card, Row, Divider, Col, Button, Spin, Rate } from 'antd';
import Card from "../components/Card";
import { showInfoToast,showErrorToast } from 'toast';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';



const mapStateToProps = state => {
  return { allproducts: state.dbdata }
}
const mapDispatchToProps = dispatch => {
  return {
    applyFilter: (price, category) => { dispatch(applyFilter(price, category)) }
  }
}

function Home(props) {
    const [price,setPrice] = useState(4000);
    const [category,setCategory] = useState("all");
    const history = useHistory();

  useEffect(()=>{
    if (localStorage.getItem("jwt") === null) {
      history.push(process.env.PUBLIC_URL+"/auth")
      showErrorToast("you are not logged in")
    }
    if(props.allproducts==null){
      props.applyFilter(price,category)
    }
  },[])

  if (props.allproducts===null) {
    return <></>
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
