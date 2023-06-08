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
    const [filterApplied,setFilterApplied] = useState(false);
    const [price,setPrice] = useState(4000);
    const [category,setCategory] = useState("all");

  useEffect(()=>{
    if (localStorage.getItem("jwt") === null) {
      window.location = ("http://localhost:3000/auth")
      alert("you are not logged in")
    }
    console.log(props);
    // await this.props.fetchdata(this.state.noOfProducts)
    if(props.allproducts==null)
    props.applyFilter(price,category)
  },[])

  if (props.allproducts===null) {
    return ( <section id="main" className='container'>
    <div className='row'>Loading</div>
    </section>)
  } 
  else{
    return ( <section id="main" className='container'>
      <div className='row'>
      {props.allproducts.map((eachProduct , ind)=>{
        return (<Card product={eachProduct} key={ind}/>)
      })}</div>
    </section>)
  }
}
  /*render() {
    let timeup;
    // if(this.state.noOfProducts < this.p)
    // console.log({"price":this.state.price,"noOfProducts":this.state.noOfProducts,"category":this.state.category})
    if (this.state.filterApplied) {
      this.props.applyFilter(this.state.price, this.state.category, this.state.noOfProducts)
      this.setState({ filterApplied: false })
    }

    if (this.props.allproducts || this.state.bool)
      clearTimeout(timeup)

    let Cardgroup;
    if (this.props.allproducts) {
      // console.log(this.props.allproducts)
      Cardgroup = () => {
        const productArray = this.props.allproducts.map((product, ind) =>
          <div className="card" key={ind}>
            <Link onClick={() => { localStorage.setItem("_id", product._id) }} to={`/${product._id}`}>
              <div key={ind} title={<span style={{ color: "#434343", fontSize: "1.2em" }} ><b>{product.title}</b></span>}>
                <div>
                  <div>
                    <span className='rate' disabled defaultValue={product.rating.value} style={{ width: "100%", fontSize: "0.8em" }} />
                  </div>
                  <div>
                    <div> {product.price}/- Rs</div>
                  </div>
                </div>
              </div>
            </Link>
          </div >
        )
        return productArray;
      }
    }
    console.log(this.props.allproducts)
    return (
      <section id="Home">
        {//<Header toggleBool={(value) => { this.toggleBool(value) }} applyFilterPrice={(price) => { this.applyFilterPrice(price) }} applyFilterCategory={(category) => { this.applyFilterCategory(category) }}/> }
        <hr className='divider' />
        <div>
          {this.props.allproducts && this.state.bool ? <Cardgroup /> : (<span className='spinner' size="large" tip="Loading..."></span>)}
        </div>
        <div>
          <button onClick={() => {
            new Promise((res, rej) => {
              this.setState(() => {
                res()
                return {
                  bool: false,
                  noOfProducts: this.state.noOfProducts + 5
                }
              })
            })
              .then(() => {
                new Promise((res, rej) => {
                  this.setState((state) => {
                    res()
                    return { price: this.state.price + 5 }
                  })
                }).then(() => {
                  this.props.applyFilter(this.state.price, this.state.category, this.state.noOfProducts)
                })
              })
          }} style={{ marginRight: "auto", marginLeft: "auto", marginBottom: "10px" }}>More</button>
        </div>
      </section >
    )
  }*/


export default connect(mapStateToProps, mapDispatchToProps)(Home);
