import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "antd/dist/antd.css";
import App from "./App";
import UserAdminAuth from "./screens/UserAdminAuth.jsx";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AdminPage from "./screens/AdminPage";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import Product from "./screens/Product";
import Cart from "./components/Cart";

const routing = (
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
    <BrowserRouter>
      <Switch>
        <Route exact path="/addproduct" component={AdminPage} />
        <Route exact path="/auth" component={UserAdminAuth} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/:productId" component={Product} />
        <Route exact path="/" component={App} />
      </Switch>
    </BrowserRouter>
    {/* </PersistGate> */}
  </Provider>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
