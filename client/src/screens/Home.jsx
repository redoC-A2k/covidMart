import React, { Component } from 'react';
import Header from '../components/Header';
import { fetchAllProducts } from "../redux/ActionCreators/fetchAllProducts";
import { connect } from "react-redux";
import { Card, Row, Divider, Col, Button, Spin } from 'antd';
import { Link, } from "react-router-dom"
import styles from './home.module.css'



const mapStateToProps = state => {
  return { allproducts: state.dbdata.products }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchdata: () => { dispatch(fetchAllProducts()) }
  }
}

class Home extends Component {
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

  Cardgroup = () => {
    const productArray = this.props.allproducts.map((product, ind) =>
      <Col xs={20} sm={16} md={10} lg={8} xl={5}>
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
              <Col span={15}>
                <Button onClick={() => { console.log("to the cart") }} className={styles.btn}>Add to cart </Button>
              </Col>
              <Col span={9}>
                <div style={{ color: "#391085", marginLeft: "7px" }}>{product.price}/- Rs</div>
              </Col>
            </Row>
          </Card>
        </Link>
      </Col >
    )
    return productArray;
  }

  async componentDidMount() {
    if (localStorage.getItem("jwt")==null) {
      console.log("not logged in")
      window.location = ("http://localhost:3000/auth")
      alert("you are not logged in")
    }
    await this.props.fetchdata()
    console.log("fetching content")
  }
  render() {
    // console.log(this.props.allproducts)
    return (
      <div className="main">
        <Header />
        <Divider />
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, { xs: 8, sm: 16, md: 24, lg: 32 }]} justify="center">
          {this.props.allproducts ? <this.Cardgroup /> : (<Spin size="large" tip="Loading..."></Spin>)}
        </Row>
        <Row>
          <Button onClick={() => {
            this.props.fetchdata()
          }} style={{ marginRight: "auto", marginLeft: "auto", marginBottom: "10px" }}>More</Button>
        </Row>
      </div >
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);