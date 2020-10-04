import React, { Component } from 'react';
import Header from '../components/Header';
import { connect } from "react-redux";
import { PageHeader, Row, Button, Rate, Col, Divider, Spin } from 'antd';
import styles from "./Product.module.css";
import { fetchAProduct } from "../redux/ActionCreators/fetchAProduct"

const mapStateToProps = state => {
    return { myproduct: state.myproduct };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAProduct: () => { dispatch(fetchAProduct()) }
    }
}

class Product extends Component {
    // constructor(props) {
    //     super(props);

    //     console.log("sending request")
    //     this.props.fetchAProduct()
    // }
    async componentDidMount() {
        this.props.fetchAProduct()
        await console.log("sending request")
    }

    render() {
        let myproduct = this.props.myproduct
        console.log(this.props.myproduct)

        let slideIndex = 0;
        let myslides = document.getElementsByClassName(styles.myimages)
        let mydivs = document.getElementsByClassName(styles.picdivs)
        console.log(mydivs, myslides)
        setTimeout(() => {
            for (let i = slideIndex + 1; i < myslides.length; i += 1) {
                console.log("in for")
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

        let ProductComponent = () => {
            if (this.props.myproduct) {
                return (
                    <Row>
                        <div style={{ display: "none" }}>
                            <Header></Header>
                        </div>
                        <Row style={{ width: "100%" }}>
                            {myproduct ? (<PageHeader className={styles.pageClass} onBack={() => { this.props.history.goBack() }} title={myproduct.title} />) : (<div>Hello</div>)}
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
                                <Rate defaultValue={3} disabled style={{ marginLeft: "auto", marginRight: "auto" }} />
                            </Col>
                            <Col span={12}>
                                <Button block className={styles.addbtn}>
                                    Add to Cart
                        </Button>
                            </Col>
                        </Row>
                        <Divider />
                        <Row style={{ width: "60vw", marginLeft: "auto", marginRight: "auto" }}>
                            <h3>
                                Description
                    </h3>
                            <ul style={{ listStyleType: "disc" }}>
                                {myproduct.description.map((desc) => {
                                    return <li><h5>{desc}</h5></li>
                                })}
                            </ul>
                        </Row>
                    </Row>
                )
            }
            else{
                return(
                <div>
                    <Spin/>
                </div>
                )
            }
        }
        return <ProductComponent />
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)