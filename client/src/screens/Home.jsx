import React, { Component } from 'react';
import Header from '../components/Header';
// import { fetchAllProducts } from "../redux/ActionCreators/fetchAllProducts";
import { applyFilter } from '../redux/ActionCreators/filter'
import { connect } from "react-redux";
import { Card, Row, Divider, Col, Button, Spin, Rate } from 'antd';
import { Link, } from "react-router-dom"
import styles from './home.module.css'



const mapStateToProps = state => {
  return { allproducts: state.dbdata }
}
const mapDispatchToProps = dispatch => {
  return {
    applyFilter: (price, category, noOfProducts) => { dispatch(applyFilter(price, category, noOfProducts)) }
  }
}

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      noOfProducts: 5,
      bool: false,
      filterApplied: false,
      price: 10000,
      category: "all"
    }
  }

  Myfeature = ({ features }) => (
    features.map((feature, ind) => {
      return <div key={ind} style={{ display: "block", backgroundColor: "rgba(255,255,255,0.9)", marginLeft: "auto", marginRight: "auto", marginTop: "4px", width: "70%", textAlign: "center", color: "#003a8c" }}>{feature}</div>
    })
  )

  MyRow = ({ product }) => (<Row id={"ro"} className="myrow" direction="column" style={{ flexGrow: "0", position: "absolute", bottom: "0", top: "0", left: "0", right: "0" }}>
    <Row style={{ position: "relative", display: "block", width: "100%" }}>
      <Row style={{ opacity: "0%", position: "absolute", bottom: "0vh", width: "100%" }}>
        <this.Myfeature features={product.features} />
      </Row>
    </Row>
  </Row>)

  applyFilterPrice = (price) => {
    this.setState({ filterApplied: true, price: price })
    // this.props.applyFilter(price,category,noOfProducts)
  }

  applyFilterCategory = (category) => {
    this.setState({ filterApplied: true, category: category })
  }

  componentDidMount() {
    if (localStorage.getItem("jwt") == null) {
      console.log("not logged in")
      window.location = ("http://localhost:3000/auth")
      alert("you are not logged in")
    }
    // await this.props.fetchdata(this.state.noOfProducts)
    this.props.applyFilter(this.state.price, this.state.category, this.state.noOfProducts)
    console.log("fetching content")
    this.setState({ bool: true })
  }

  componentWillReceiveProps() {
    this.setState({ bool: true })
  }
  toggleBool = (value) => {
    this.setState({ bool: value })
  }

  render() {
    let timeup
    // if(this.state.noOfProducts < this.p)
    // console.log({"price":this.state.price,"noOfProducts":this.state.noOfProducts,"category":this.state.category})
    if (this.state.filterApplied) {
      if (!this.props.allproducts && !this.state.bool)
        timeup = setTimeout(() => {
          alert("either your internet connection is not proper or the filter you applied does not match to any product")
        }, 3000)
      this.props.applyFilter(this.state.price, this.state.category, this.state.noOfProducts)
      this.setState({ filterApplied: false })
    }

    if (this.props.allproducts || this.state.bool)
      clearTimeout(timeup)

    let Cardgroup
    if (this.props.allproducts) {
      // console.log(this.props.allproducts)
      Cardgroup = () => {
        const productArray = this.props.allproducts.map((product, ind) =>
          <Col key={ind} xs={20} sm={16} md={10} lg={8} xl={5}>
            <Link onClick={() => { localStorage.setItem("_id", product._id) }} to={`/${product._id}`}>
              <Card hoverable
                onMouseOut={() => {
                  let elem = document.getElementsByClassName("myrow")[ind].children[0].children[0]
                  elem.style.opacity = "0%"
                  elem.style.transitionProperty = "opacity,bottom";
                  elem.style.transitionDuration = "2s";
                  elem.style.bottom = "0vh"
                }}
                onMouseOver={() => {
                  let elem = document.getElementsByClassName("myrow")[ind].children[0].children[0];
                  elem.style.display = "block"
                  elem.style.opacity = "100%"
                  elem.style.transitionProperty = "opacity,bottom";
                  elem.style.transitionDuration = "2s"
                  elem.style.bottom = "40%"
                }}
                cover={<img src={product.images[0]} style={{ height: "30vh" }} />}
                key={ind}
                className={styles.card}
                title={<span style={{ color: "#434343", fontSize: "1.2em" }} ><b>{product.title}</b></span>}>
                <this.MyRow product={product} />
                <Row>
                  <Col span={12}>
                    <Rate disabled defaultValue={product.rating.value} style={{ width: "100%", fontSize: "0.8em" }} />
                  </Col>
                  <Col span={12}>
                    <div style={{ margin: "0", padding: "0", color: "#391085", marginLeft: "7px" }}>{product.price}/- Rs</div>
                  </Col>
                </Row>
              </Card>
            </Link>
          </Col >
        )
        return productArray;
      }
    }
    // console.log(this.props.allproducts)
    return (
      <div className="main">
        <Header toggleBool={(value) => { this.toggleBool(value) }} applyFilterPrice={(price) => { this.applyFilterPrice(price) }} applyFilterCategory={(category) => { this.applyFilterCategory(category) }} />
        <Divider />
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, { xs: 8, sm: 16, md: 24, lg: 32 }]} justify="center">
          {this.props.allproducts && this.state.bool ? <Cardgroup /> : (<Spin size="large" tip="Loading..."></Spin>)}
        </Row>
        <Row>
          <Button onClick={() => {
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
          }} style={{ marginRight: "auto", marginLeft: "auto", marginBottom: "10px" }}>More</Button>
        </Row>
      </div >
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);