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

const mapStateToProps = state => {
  return {
    myproduct: state.myproduct,
    mycart: state.cart,
    userdata: state.user
  };
}
const mapDispatchToProps = dispatch => {
  return {
    fetchAProduct: (productId) => { dispatch(fetchAProduct(productId)) },
    addProductInCart: (productId, price, myproductTitle) => { dispatch(addProductInCart(productId, price, myproductTitle)) },
    updateProductInCart: (productId, quantityno, price, myproductTitle) => { dispatch(incrementProductInCart(productId, quantityno, price, myproductTitle)) },
    deleteProductFromCart: (userId, productId) => { dispatch(deleteProductFromCart(userId, productId)) },
    fetchCart: () => { dispatch(fetchcart()) },
    giveRating: (productId, userId, value) => { dispatch(giveRating(productId, userId, value)) },
    fetchUserdata: (userId) => { dispatch(fetchUserdata(userId)) }
  }
}

function Product(props){
  let productId=props.location.pathname.split("/")[2];
  const [showcartdiv, setShowCartDiv] = useState(true);
  const [inputquantity, setShowInputQuantity] = useState(0)
  const [showbadge,setShowBadge ] = useState(false)
  const [bool, setBool] = useState(false)

  useEffect(()=>{
    props.fetchCart();
    props.fetchAProduct(productId)
    props.fetchUserdata(localStorage.getItem("userId"))
  },[])

  return(
    <section id="product" className='container'>
      {
        (props.myproduct!=null&&props.mycart!=null&&props.userdata!=null)
        ?
        (<div className='row'>
          <div className="col-sm-7">
            <Gallery product={props.myproduct}/>
          </div>
          <div className="col-sm-5">
            <Actions user={props.userdata} product={props.myproduct} addToCart={props.addProductInCart} deleteFromCart={props.deleteProductFromCart}/>
          </div>
          <div className="col-12">
            <Description product={props.myproduct}/>
          </div>
          <div className="col-12">
            <Review productId={props.myproduct._id} userId={props.userdata._id} giveRating={props.giveRating}/>
          </div>
        </div>)
        :
        (<div>Loading...</div>)
      }
    </section>
  )

  /*render() {
    let myproduct = this.props.myproduct;
    let cartLength;

    //code for updating myRating
    if (this.props.userdata) {
      this.props.userdata.myRatings.map((eachRating, ind) => {
        if (eachRating.productId === this.productId) {
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
          if (this.productId=== cartelem.productId) {
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
          <section id="product">
            //<div style={{ display: "none" }}><Header /></div> 
            <div className='row' style={{ width: "100%" }}>
            // {myproduct ? 
            (<PageHeader className={styles.pageClass} onBack={() => { this.props.history.goBack() }} title={myproduct.title} extra={[<Link to="/cart"><span count={(this.state.showbadge) ? this.props.mycart.length : 0} ><ShoppingCartOutlined style={{ fontSize: "2em" }} /></span></Link>]} />) : (<div>failed to load product</div>)} 
            </div>
            <div style={{ width: "100%" }}>
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
            </div>
            <div className='row' style={{ display: "block-flex", flexWrap: "wrap", width: "60vw", marginRight: "auto", marginLeft: "auto", justifyContent: "space-between" }}>
              {myproduct.features.map((feature, ind) => {
                return (<div className={styles.feature} key={ind}>{feature}</div>)
              })}
            </div>
            <hr/>
            <div className='row' style={{ width: "60vw", marginTop: "10px", marginLeft: "auto", marginRight: "auto" }}>
              <div className='col-6'>
                Rating element here
                // <Rate defaultValue={myproduct.rating.value} allowHalf disabled style={{ fontSize:"3vw" ,marginLeft: "auto", marginRight: "auto" }} /> 
                <h3>({myproduct.rating.count})</h3>
              </div>
              <div className='col-6'>
                <div id="cartdiv">
                  {this.state.showcartdiv ?
                    (<button block onClick={() => {
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
                    </button>) :
                    (<div style={{ display: "flex", justifyContent: "space-between", width: "50%", marginLeft: "auto", marginRight: "auto", height: "7vh" }}>
                      <span onClick={() => {
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
                        style={{ color: "#1890ff", border: "2px solid #1890ff", fontSize: "3.5em" }}>Plus outlined</span>
                      <input style={{ fontSize: "2em", width: "20%", marginBottom: "0px", border: "none" }} readOnly value={this.state.inputquantity} min={1} max={this.props.myproduct.quantity} type="text" />
                      <span onClick={() => {
                        if ((this.state.inputquantity - 1) === 0) {
                          if (this.props.mycart[0].productId !== "empty")
                            this.setState({ showbadge: false })
                          this.setState({ showcartdiv: true })
                          this.props.deleteProductFromCart(localStorage.getItem("userId"), this.productId)
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
                      }} style={{ border: "2px solid #1890ff", color: "#1890ff", fontSize: "3.5em" }}>Minus outlined </span>
                    </div >)
                  }
                </div>
              </div>
            </div>
            <hr/>
            <div className='row' style={{ width: "60vw", marginLeft: "auto", marginRight: "auto" }}>
              <div className='col'>
                <h1>
                  Description
                </h1>
              </div>
              <ul style={{ listStyleType: "disc" }}>
                {myproduct.description.map((desc, ind) => {
                  return <li key={ind}><h2>{desc}</h2></li>
                })}
              </ul>
            </div>
            <div className='row'>
              <div className='col-5' span={16}>
                <h1>Give your Rating</h1>
              </div>
              <div className='col-7'>
                //<span style={{ fontSize: "2.5em" }} onChange={(value) => {
                //  console.log("clicked", localStorage.getItem("_id"), localStorage.getItem("userId"), value)
                //  this.props.giveRating(localStorage.getItem("_id"), localStorage.getItem("userId"), value)
                // }} defaultValue={this.myRate} />
                Rating here
              </div>
            </div>
          </section>
        )
      }
      else {
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ display: "none" }}><Header /></div>
            <span style={{ position: "relative", marginTop: "40vh" }}>Loading ... span</span>
          </div>
        )
      }
    }
    return <ProductComponent />
  }*/
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
