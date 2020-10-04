import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import 'antd/dist/antd.css';
import App from "./App";
import UserAdminAuth from './screens/UserAdminAuth.jsx';
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AdminPage from "./screens/AdminPage";
import Home from "./screens/Home"
import Navbar from './components/Navbar'
import {store} from "./redux/store"
import {Provider} from "react-redux";
import Product from "./screens/Product"
import Cart from "./components/Cart"


const routing = (
  <BrowserRouter>
  <Provider store={store}>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/cart" component={Cart}/>
        <Route path="/auth" component={UserAdminAuth} />
        <Route path="/addproduct" component={AdminPage}/>
        <Route path="/home" component={Home}/>
        <Route path="/navbar" component={Navbar}/>
        <Route path="/:productid" component={Product}/>
      </Switch>
      </Provider>
    </BrowserRouter>
  
);

ReactDOM.render(
  routing,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
