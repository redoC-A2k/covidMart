import React from "react";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {fetchUserdata} from '../redux/ActionCreators/fetchUserdata'

const mapStateToProps = state => {
    return {
        userdata: state.user
    };
}
const mapDispatchToProps = dispatch => {
    return {
        fetchUserdata: (userId) => { dispatch(fetchUserdata(userId)) }
    }
}

function Popup(props) {
    const [isLogin,setIsLogin] = useState();

    useEffect(()=>{
    },[])

    function logoutHandler(){
        localStorage.clear();
    }
    return (
        <div id="popup">
            <h4><Link to="/user/profile">Profile</Link></h4>
            <h4><Link to="/user/cart">Cart</Link></h4>
            <h4><Link to="/" onClick={logoutHandler}>Logout</Link></h4>
        </div> 
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup);