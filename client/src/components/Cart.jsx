import React, { Component } from 'react'
import styles from "./cart.module.css"

class Cart extends Component {
    render() {
        return (
            <div style={{overflowX:"clip"}}>
                <button onClick={() => {
                    let elem = document.getElementById("cart")
                    elem.style.display = "block";
                    elem.style.width = "20vw"
                    elem.style.visibility="visible"
                    elem.style.right = "0"
                }}>
                    Show cart
                </button>
                <div className={styles.cart} style={{ transition: "right 1s", width:"" }} id="cart">
                    hello
                </div>
            </div>
        )
    }
}

export default Cart;