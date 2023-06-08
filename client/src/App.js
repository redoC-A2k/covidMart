import React from 'react';
// import './App.css';
import Header from './components/Header';
// import AdminSignin from "./screens/adminSifnin.jsx";
import Home from './screens/Home';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AdminPage from "./screens/AdminPage";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import Product from "./screens/Product";
import Cart from "./components/Cart";
import UserAdminAuth from "./screens/UserAdminAuth.jsx";
import "./index.css";
import Footer from './components/Footer';
import Toast from './components/Toast';

function App() {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <BrowserRouter>
        <Toast/>
        <Header/>
        <Switch>
          {<Route exact path="/auth" component={UserAdminAuth} />
          /*<Route exact path="/addproduct" component={AdminPage} />*/}
          <Route exact path="/user/cart" component={Cart} />
          <Route exact path="/product/:productId" component={Product} />
          <Route exact path="/" component={Home} />
        </Switch>
        <Footer/>
      </BrowserRouter>
      {/* </PersistGate> */}
    </Provider>
  );
}
    // <div className="App">
    //     {/*<Header toggleBool={(value) => { this.toggleBool(value) }} applyFilterPrice={(price) => { this.applyFilterPrice(price) }} applyFilterCategory={(category) => { this.applyFilterCategory(category) }}/>*/} 
    //     <Header/>
    //     <Home/>
    // </div>

export default App;
