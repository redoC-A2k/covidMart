import React, { useEffect, useState } from 'react';
import Header from './components/Header';
// import AdminSignin from "./screens/adminSifnin.jsx";
import Home from './screens/Home';
import {  Route, Switch, withRouter} from "react-router-dom";
import AdminPage from "./screens/AdminPage";
import Product from "./screens/Product";
import Cart from "./components/Cart";
import UserAdminAuth from "./screens/UserAdminAuth.jsx";
import "./index.css";
import Footer from './components/Footer';
import Toast from './components/Toast';
import ErrorPage from './screens/ErrorPage';

function App(props) {
  // const [classname,setClassName]=useState("")
  // useEffect(
  //   ()=>{
  //     console.log(process.env.REACT_APP_BACKEND)
  //   },
  //   []
  // )

  return (
      <>
        <Toast/>
        {props.location.pathname!=='/auth'?<Header/>:<></>}
        <section id="main" className={`${props.location.pathname!=='/auth'?"container":""}`}>
          <Switch>
            <Route exact path="/auth" component={UserAdminAuth} />
            {/*<Route exact path="/addproduct" component={AdminPage} />*/}
            <Route exact path="/user/cart" component={Cart} />
            <Route exact path="/product/:productId" component={Product} />
            <Route exact path="/" component={Home} />
            <Route path = "*" component={ErrorPage} />
          </Switch>
        </section>
        {props.location.pathname!=='/auth'?<Footer/>:<></>}
      </>
  );
}
    // <div className="App">
    //     {/*<Header toggleBool={(value) => { this.toggleBool(value) }} applyFilterPrice={(price) => { this.applyFilterPrice(price) }} applyFilterCategory={(category) => { this.applyFilterCategory(category) }}/>*/} 
    //     <Header/>
    //     <Home/>
    // </div>

export default withRouter (App);
