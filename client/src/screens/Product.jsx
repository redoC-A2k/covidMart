import React, { Component } from 'react';
import { connect } from "react-redux";
import { PageHeader, Row, Button, Rate, Col, Divider, Spin, Badge, } from 'antd';
import styles from "./Product.module.css";
import { fetchAProduct, giveRating } from "../redux/ActionCreators/fetchAProduct"
import { incrementProductInCart } from "../redux/ActionCreators/incrementProductInCart";
import { addProductInCart } from "../redux/ActionCreators/addproductincart";
import { PlusOutlined, MinusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Header from "../components/Header"
import { fetchcart } from '../redux/ActionCreators/fetchCart';
import { deleteProductFromCart } from '../redux/ActionCreators/deleteProductFromCart';
import { Link } from 'react-router-dom';
import { fetchUserdata } from '../redux/ActionCreators/fetchUserdata';
const mapStateToProps = state => {
  return {
    myproduct: state.myproduct,
    mycart: state.cart,
    userdata:state.user
  };
}
let myproductId;
let myproductTitle;
const mapDispatchToProps = dispatch => {
  return {
    fetchAProduct: () => { dispatch(fetchAProduct()) },
    addProductInCart: (productId, price, myproductTitle) => { dispatch(addProductInCart(productId, price, myproductTitle)) },
    updateProductInCart: (productId, quantityno, price, myproductTitle) => { dispatch(incrementProductInCart(productId, quantityno, price, myproductTitle)) },
    deleteProductFromCart: (userId, productId) => { dispatch(deleteProductFromCart(userId, productId)) },
    fetchCart: () => { dispatch(fetchcart()) },
    giveRating: (productId, userId, value) => { dispatch(giveRating(productId, userId, value)) },
    fetchUserdata : (userId) => {dispatch(fetchUserdata(userId))}
  }
}

//clearing localStorage on back


class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showcartdiv: true,
      inputquantity: 0,
      showbadge: false,
      bool: false
    }
  }

  componentDidMount() {
    this.props.fetchCart()
    this.props.fetchAProduct()
    this.props.fetchUserdata(localStorage.getItem("userId"))
    console.log("sending request")
  }

myRate = 0

  render() {
    let myproduct = this.props.myproduct;
    let cartLength;

    //code for updating myRating
    if(this.props.userdata){
      this.props.userdata.myRatings.map((eachRating,ind) =>{
        if(eachRating.productId === localStorage.getItem("_id")){
          this.myRate = eachRating.value
        }
      })
    }
    //code for carousel
    let slideIndex = 0;
    let myslides = document.getElementsByClassName(styles.myimages)
    let mydivs = document.getElementsByClassName(styles.picdivs)
    setTimeout(() => {
      for (let i = slideIndex + 1; i < myslides.length; i += 1) {
        myslides[i].style.display = "none";
        mydivs[i].style.display = "none"
      }
    }, 100)

    function incrementSlides() {
      myslides[slideIndex].style.display = "none"
      mydivs[slideIndex].style.display = "none"
      slideIndex += 1;
      if (slideIndex === myslides.length) {
        slideIndex = 0;
      }
      myslides[slideIndex].style.display = "block"
      mydivs[slideIndex].style.display = "block"
    }
    function decrementSlides() {
      myslides[slideIndex].style.display = "none";
      mydivs[slideIndex].style.display = "none";
      slideIndex -= 1;
      if (slideIndex === (-1)) {
        slideIndex = myslides.length - 1;
      }
      myslides[slideIndex].style.display = "block";
      mydivs[slideIndex].style.display = "block";
    }
    //deciding when to show main productComponent
    // new Promise((res, req) => {
    //   console.log("promise running")
    if (this.props.userdata && this.props.mycart && this.props.myproduct && !this.state.bool) {
      cartLength = this.props.mycart.length
      new Promise((resolve, rej) => {
        resolve()
      }).then(() => {
        if (this.props.mycart[0].productId !== "empty")
          this.setState({ showbadge: true })
        this.props.mycart.map((cartelem, ind) => {
          if (localStorage.getItem("_id") === cartelem.productId) {
            console.log("matched product")
            console.log("quantity: " + cartelem.quantity)
            new Promise((res, req) => {
              this.setState((state) => {
                res()
                return {
                  inputquantity: cartelem.quantity,
                  showcartdiv: false,
                  showbadge: true,
                  bool: true
                }
              })
            })
              .then(() => {
                console.log("this is executing")
                this.setState((state) => {
                  return { bool: true }
                })
              })
          }
          else if (ind === (cartLength - 1)) {
            console.log("not matched")
            this.setState({ bool: true })
          }
        })
      })
    }
    // })
    //   .then(() => {
    //     console.log(this.state.bool)
    //     this.setState({ bool: true })
    //   })
    // main productComponent
    let ProductComponent = () => {
      if (this.state.bool) {
        let price = myproduct.price;
        myproductId = myproduct._id
        myproductTitle = myproduct.title
        console.log(myproductId + "and price" + price)
        return (
          <Row>
            <div style={{ display: "none" }}><Header /></div>
            <Row style={{ width: "100%" }}>
              {myproduct ? (<PageHeader className={styles.pageClass} onBack={() => { this.props.history.goBack() }} title={myproduct.title}
                extra={[<Link to="/cart"><Badge count={(this.state.showbadge) ? this.props.mycart.length : 0} ><ShoppingCartOutlined style={{ fontSize: "2em" }} /></Badge></Link>]} />) : (<div>failed to load product</div>)}
            </Row>
            <Row style={{ width: "100%" }}>
              {
                myproduct.images.map((image, ind) => {
                  return (
                    <div key={ind} className={styles.picdivs} >
                      <img className={styles.myimages} src={image} />
                      <a className={styles.next} onClick={() => { incrementSlides() }}>{String.fromCharCode(10095)}</a>
                      <a className={styles.prev} onClick={() => { decrementSlides() }}>{String.fromCharCode(10094)}</a>
                      <div >
                        <h3 style={{ fontSize: "3vw" }}>{myproduct.title}</h3>
                        <h3 style={{ direction: "rtl", fontSize: "2.8vw" }}>-/ {myproduct.price} Rs</h3>
                      </div>
                    </div>
                  )
                })
              }
            </Row>
            <Row style={{ display: "block-flex", flexWrap: "wrap", width: "60vw", marginRight: "auto", marginLeft: "auto", justifyContent: "space-between" }}>
              {myproduct.features.map((feature, ind) => {
                return (<div className={styles.feature} key={ind}>{feature}</div>)
              })}
            </Row>
            <Divider />
            <Row style={{ width: "60vw", marginTop: "10px", marginLeft: "auto", marginRight: "auto" }}>
              <Col span={12}>
                <Rate defaultValue={myproduct.rating.value} allowHalf disabled style={{ marginLeft: "auto", marginRight: "auto" }} />
                <h5>({myproduct.rating.count})</h5>
              </Col>
              <Col span={12}>
                <div id="cartdiv">
                  {this.state.showcartdiv ?
                    (<Button block onClick={() => {
                      this.setState({ showcartdiv: false });
                      this.setState({ showbadge: true });
                      new Promise(
                        (res, rej) => {
                          this.setState((State) => {
                            res()
                            return { inputquantity: this.state.inputquantity + 1 }
                          })
                        }
                      )
                        .then(() => {
                          console.log(this.state.inputquantity)
                          console.log("productId" + myproductId)
                          this.props.addProductInCart(myproductId, price, myproductTitle)
                        })
                    }} className={styles.addbtn}>
                      Add to Cart
                    </Button>) :
                    (<div style={{ display: "flex", justifyContent: "space-between", width: "50%", marginLeft: "auto", marginRight: "auto", height: "7vh" }}>
                      <PlusOutlined onClick={() => {
                        new Promise(
                          (res, rej) => {
                            this.setState((State) => {
                              res()
                              return { inputquantity: this.state.inputquantity + 1 }
                            })
                          }
                        )
                          .then(() => {
                            console.log(this.state.inputquantity)
                            this.props.updateProductInCart(myproductId, this.state.inputquantity, price, myproductTitle)
                          })
                      }}
                        style={{ color: "#1890ff", border: "2px solid #1890ff", fontSize: "3.5em" }} />
                      <input style={{ fontSize: "2em", width: "20%", marginBottom: "0px" }} readOnly value={this.state.inputquantity} min={1} max={this.props.myproduct.quantity} type="text" />
                      <MinusOutlined onClick={() => {
                        if ((this.state.inputquantity - 1) === 0) {
                          if (this.props.mycart[0].productId !== "empty")
                            this.setState({ showbadge: false })
                          this.setState({ showcartdiv: true })
                          this.props.deleteProductFromCart(localStorage.getItem("userId"), localStorage.getItem("_id"))
                        }
                        else {
                          new Promise(
                            (res, rej) => {
                              this.setState((State) => {
                                res()
                                return { inputquantity: this.state.inputquantity - 1 }
                              })
                            }
                          )
                            .then(() => {
                              console.log(this.state.inputquantity)
                              this.props.updateProductInCart(myproductId, this.state.inputquantity, price, myproductTitle)
                            })
                        }
                      }} style={{ border: "2px solid #1890ff", color: "#1890ff", fontSize: "3.5em" }} />
                    </div >)
                  }
                </div>
              </Col>
            </Row>
            <Divider />
            <Row style={{ width: "60vw", marginLeft: "auto", marginRight: "auto" }}>
              <h3>
                Description
                    </h3>
              <ul style={{ listStyleType: "disc" }}>
                {myproduct.description.map((desc, ind) => {
                  return <li key={ind}><h5>{desc}</h5></li>
                })}
              </ul>
            </Row>
            <Row style={{ width: "60vw", marginLeft: "auto", marginRight: "auto" }}>
              <Col span={16}>
                <h4>Give your Rating</h4>
              </Col>
              <Col span={8}>
                <Rate style={{ fontSize: "2.5em" }} onChange={(value) => {
                  console.log("clicked", localStorage.getItem("_id"), localStorage.getItem("userId"), value)
                  this.props.giveRating(localStorage.getItem("_id"), localStorage.getItem("userId"), value)
                }} defaultValue={this.myRate} />
              </Col>
            </Row>
          </Row>
        )
      }
      else {
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ display: "none" }}><Header /></div>
            <Spin style={{ position: "relative", marginTop: "40vh" }} size="large" tip="Loading..." />
          </div>
        )
      }
    }
    return <ProductComponent />
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)