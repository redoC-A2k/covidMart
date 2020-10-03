import React, { Component } from 'react';
import { connect } from "react-redux";
import { PageHeader, Row, Carousel } from 'antd';
import styles from "./Product.module.css"

const mapStateToProps = state => {
    return { allproducts: state.dbdata.products }
}
// const mapDispatchToProps = dispatch => {
//     return {
//         fetchdata: () => { dispatch(fetchAllProducts()) }
//     }
// }

class Product extends Component {
    render() {
        let myproduct = this.props.allproducts.filter((product) => {
            return product._id === this.props.match.params.productid
        })
        const contentStyle = {
            height: '160px',
            color: '#fff',
            lineHeight: '160px',
            textAlign: 'center',
            background: '#364d79',
          };
        return (
            <Row>
                <Row style={{ width: "100%" }}>
                    {myproduct ? (<PageHeader className={styles.pageClass} onBack={() => { this.props.history.goBack() }} title={myproduct[0].title} />) : (<div>Hello</div>)}
                </Row>
                <Row style={{width:"100%"}}>
                    <Carousel autoplay>
                        <Row><h3 style={contentStyle}>1</h3></Row>
                        <Row><h3 style={contentStyle}>2</h3></Row>
                        <Row><h3 style={contentStyle}>3</h3></Row>
                    </Carousel>
                </Row>
            </Row>
        )
    }
}

export default connect(mapStateToProps, null)(Product)