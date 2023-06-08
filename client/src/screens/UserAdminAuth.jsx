import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Img from "../assets/images/backimage.jpg";
import Header from "../components/Header";

// TODO: Make responsive
export default function UserAdminAuth() {
  const [showname, setShowname] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const history = useHistory()

  function authenticate_btn_handler(event) {
    if (showname) {
      event.preventDefault()
      fetch("http://localhost:4000/signup", {
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
        .then(res => res.json()) .then(data => {
          alert("now login with credentials")
        })
    }
    else {
      event.preventDefault()
      fetch("http://localhost:4000/signin", { method: "post", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            if(data.error==="userNotExist")
            alert("Your account not exist ! Create new")
            else
            alert("Incorrect email or password")
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
        <div className="field">
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
        </div>
      )
		}
	}

	return (
		<section id="useradminauth" >
			<img className="backimage" src={Img} alt="background" />
			<div className="container-fluid backdrop" >
				<div className="row">
					<div className="col heading">
            {isAdmin && !showname ? "Hello Admin" : <h1 className='brand'><Link to="/"> CovidMart</Link></h1>}
						<h4 className="title" >
							We have got all the precautionary products <br/> to keep you safe from coronavirus
            </h4>
					</div>
					<div className="col body">
            {formcomp()}
            <div className="field">
              <input
                type="email"
                autoComplete="off"
                placeholder="Email"
                id="email"
                name="email"
                onChange={(e) => { setEmail(e.target.value) }}
                required
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="field">
              <input
                placeholder="Password"
                autoComplete="off"
                type="password"
                name="password"
                id="password"
                onChange={(e) => { setPassword(e.target.value) }}
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="row w-100 auth">
              <div className="col-md-6 col-lg-5">
                <button
                  className="type1 w-100"
                  onClick={authenticate_btn_handler}
                >
                  <span className="background"></span>
                  {showname?
                  (<><span className='text'>signup</span><span className="fa-solid fa-user-plus icon"></span></>)
                  :
                  (<><span className='text'>signin</span><span className="fa-solid fa-arrow-right-to-bracket icon"></span></>)}
                </button>
              </div>
            </div>
            <div>
              <button onClick={() => { setIsAdmin(true) }} >
                {isAdmin || showname ? "" : "Are you admin ?"}
              </button>
            </div>
            <div>
              <button onClick={() => {
                    setShowname(prevstate => !prevstate);
                    setIsAdmin(false)
                  }}
              >
                {showname || isAdmin ? "Back" : "Create account"}
              </button>
            </div>
          </div>
				</div>
			</div>
		</section>
	);
}
