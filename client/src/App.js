import React, { useEffect} from 'react';
import Header from './components/Header';
import Home from './screens/Home';
import {  Route, Switch, withRouter} from "react-router-dom";
// import AdminPage from "./screens/AdminPage";
import PasswordReset from "./screens/PasswordReset"
import Product from "./screens/Product";
import Cart from "./screens/Cart";
import UserAdminAuth from "./screens/UserAdminAuth.jsx";
import "./index.css";
import Footer from './components/Footer';
import Toast from './components/Toast';
import ErrorPage from './screens/ErrorPage';
import Loader from './components/Loader';
import Profile from './screens/Profile';

function App(props) {
  useEffect(()=>{
    let element = document.getElementById("loader");
    ['mouseover','wheel','scroll'].forEach(evt => {
      element.addEventListener(evt,(event)=>{
        event.preventDefault()
      })
    });
  })

  return (
      <>
        <Toast/>
        <Loader/>
        {props.location.pathname!=='/auth'?<Header/>:<></>}
        <section id="main" className={`${props.location.pathname!=='/auth'?"container":""}`}>
          <Switch>
            <Route exact path="/auth" component={UserAdminAuth} />
            {/*<Route exact path="/addproduct" component={AdminPage} />*/}
            <Route exact path="/user/cart" component={Cart} />
            <Route exact path="/user/profile" component={Profile} />
            <Route exact path="/product/:productId" component={Product} />
            <Route exact path="/" component={Home} />
            <Route exact path="/user/:userId/:token" component={PasswordReset} />
            <Route path = "*" component={ErrorPage} />
          </Switch>
        </section>
        {props.location.pathname!=='/auth'?<Footer/>:<></>}
      </>
  );
}

export default withRouter (App);
