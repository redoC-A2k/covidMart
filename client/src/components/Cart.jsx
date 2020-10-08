import React, { Component } from 'react'
import styles from "./cart.module.css"
import { Row, Col } from 'antd';
import { connect } from "react-redux";
import { DeleteOutlined} from '@ant-design/icons';
import { deleteProductFromCart } from '../redux/ActionCreators/deleteProductFromCart'
import { fetchcart } from '../redux/ActionCreators/fetchCart';
import Header from './Header';


const mapStateToProps = state => {
    return { mycart: state.cart }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchcart: () => { dispatch(fetchcart()) },
        deleteProductFromCart: (userId, productId) => { dispatch(deleteProductFromCart(userId, productId)) }
    }
}
// let MyCart = () => {return (<h4>afshan</h4>)}
class Cart extends Component {
    componentDidMount() {
        console.log("fetching ..")
        this.props.fetchcart()
    }
    render() {
        let MyCart = () => {
            if (this.props.mycart && this.props.mycart[0].productId != "empty") {
                let myproductsarray = this.props.mycart.map((eachProduct, ind) => {
                    return (
                        <Row key={ind} style={{ width: "100%" }}>
                            <Col span={11}>
                                {eachProduct.title}
                            </Col>
                            <Col span={4}>
                                {eachProduct.quantity}
                            </Col>
                            <Col span={4}>
                                {eachProduct.price}
                            </Col>
                            <Col span={4}>
                                {eachProduct.quantity * eachProduct.price}
                            </Col>
                            <Col span={1}>
                                <DeleteOutlined onClick={()=>{this.props.deleteProductFromCart(localStorage.getItem("userId"),eachProduct.productId)}}/>
                            </Col>
                        </Row>
                    )
                })
                return myproductsarray
            }
            else {
                return (<h4 style={{textAlign:"center",width:"100%"}}>cart is empty</h4>)
            }
        }
        return (
            <Row style={{ width: "100%" }}>
                <div style={{ display: 'none' }}>
                    <Header />
                </div>
                <Row style={{ width: "100%" }}>
                    <Col span={24}>
                        <h1 style={{ textAlign: "center" }}>Cart</h1>
                    </Col>
                </Row>
                <Row style={{ width: "100%" }}>
                    <Col span={11}>
                        <h5>Product title</h5>
                    </Col>
                    <Col span={4}>
                        <h5>Product qunatity</h5>
                    </Col>
                    <Col span={4}>
                        <h5>Product price</h5>
                    </Col>
                    <Col span={4}>
                        <h5>Total price</h5>
                    </Col>
                </Row>
                <Row style={{width:"100%"}}>
                    <MyCart/>
                </Row>
            </Row>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);