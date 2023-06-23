import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {showInfoToast,showErrorToast} from 'toast';
import CtaButton from "../components/CtaButton";
import {showLoader,hideLoader} from "utility"

export default function UserAdminAuth() {
  const [showname, setShowname] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const history = useHistory()

  function handleForgot(event){
    event.preventDefault()
    showLoader()
    let element = document.querySelector('#useradminauth div.backdrop form fieldset input[type="email"]')
    if(element.checkValidity()){
      fetch(`${process.env.REACT_APP_BACKEND}/user/forgot-password`,{
        method:"post",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email,
        })
      })
      .then(res=>res.json())
      .then(data => {
        hideLoader()
        if(data.message)
        showInfoToast(data.message)
        else showErrorToast(data.error)
      })
    }
    else
    element.reportValidity()
  }

  function authenticate_btn_handler(event) {
    event.preventDefault()
    showLoader()
    if (showname) {
      fetch(`${process.env.REACT_APP_BACKEND}/signup`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password
        })
      })
      .then(res => res.json()) 
      .then(data => {
        hideLoader()
        console.log(data.error)
        if(data.error)
        showErrorToast(data.error.toString())
        else
        showInfoToast("Now login with credentials")
      })
    }
    else {
      fetch(`${process.env.REACT_APP_BACKEND}/signin`, { method: "post", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
        .then(res => res.json())
        .then(data => {
          hideLoader()
          if (data.error) {
            showErrorToast(data.error)
          }
          else {
            localStorage.setItem("jwt", data.token)
            localStorage.setItem("userId", data.userId)
            history.push("/")
          }
        })
    }
  }

	let formcomp = () => {
		if (showname) {
			return (
        <fieldset>
          <input
            type="text"
            autoComplete="off"
            placeholder="Name"
            id="name"
            name="name"
            onChange={(e) => { setName(e.target.value) }}
            required
          />
          <label htmlFor="name">Name</label>
        </fieldset>
      )
		}
	}

	return (
		<section id="useradminauth" >
			<img className="backimage" src="/assets/images/backimage.jpg" alt="background" />
			<div className="backdrop container-fluid" >
        <div className="row w-100" style={{marginRight:"0"}}>
          <div className="offset-lg-3 col-lg-6 col-xs-12">

            <div className="row" style={{marginLeft:"auto",marginRight:"auto"}}>
              <div className="col-12 heading">
                {isAdmin && !showname ? <h1 className="brand">Hello Admin</h1> : <h1 className='brand'><Link to="/"> CovidMart</Link></h1>}
                <h4 className="title" >
                  We have got all the precautionary products to keep you safe from coronavirus
                </h4>
              </div>
              <div className="col-12 body">
                <form className="myform" onSubmit={authenticate_btn_handler} autoComplete="off">
                {formcomp()}
                <fieldset>
                  <input
                    type="email"
                    autoComplete="off"
                    placeholder="Email"
                    id="email"
                    name="email"
                    title="Please an enter a valid email address"
                    onChange={(e) => { setEmail(e.target.value) }}
                    required
                  />
                  <label htmlFor="email">Email</label>
                </fieldset>
                <fieldset>
                  <input
                    placeholder="Password"
                    autoComplete="off"
                    type="password"
                    name="password"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters."
                    id="password"
                    onChange={(e) => { setPassword(e.target.value) }}
                    required
                  />
                  <label htmlFor="password">Password</label>
                </fieldset>
                <div className="row auth">
                  <div className="col-12 row justify-content-between">
                    <CtaButton
                      solid
                      type="submit"
                    >
                      <span className={`fa-solid ${showname?"fa-user-plus":"fa-arrow-right-to-bracket"} icon`}></span>
                      <span className={`text`}>{showname?"Signup":"Signin"}</span>
                    </CtaButton>
                    <button onClick={handleForgot}>{!showname?"Forgot Password ?":""}</button>
                  </div>
                </div>
                </form>
                <div>
                  <button onClick={() => { setIsAdmin(true) }} >
                    {isAdmin || showname ? "" : "Are you admin ?"}
                  </button>
                </div>
                <div>
                  <button onClick={() => {
                        if(isAdmin) setIsAdmin(false)
                        else setShowname(prevstate => !prevstate);
                      }}
                  >
                    {showname || isAdmin? "Back" : "Create account"}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
			</div>
		</section>
	);
}
