import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Img from "../assets/images/back2.jpg";
import { Button, Row, Col, Input } from "antd";

export default function UserAdminAuth() {
	const [showname, setShowname] = useState(false)
	const [isAdmin, setIsAdmin] = useState(false)
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const history = useHistory()

	let formcomp = () => {
		if (showname) {
			return (<Input
				style={{ marginBottom: "8px", width: "50%", marginTop: "8px" }}
				type="text"
				autoComplete="off"
				placeholder="Enter your name"
				id="email"
				onChange={(e) => { setName(e.target.value) }}
			/>)
		}
	}

	return (
		<div
			style={{
				height: "100vh",
				position: "absolute",
				top: 0,
				width: "100%",
			}}
		>

			<img
				src={Img}
				style={{ height: "100%", width: "inherit", top: "0", position: "absolute" }}
				alt="sampleImg"
			/>
			<div
				style={{ height: "100%", display: "flex", alignItems: 'center', margin: "0px", position: "absolute", width: 'inherit', top: "0", backgroundColor: "rgba(240,240,240,0.5)" }}
			>
				<Row style={{ width: "100%", position: "relative" }}>
					<Col sm={24} lg={12} xl={12} style={{ minWidth: "50%", minHeight: "100%" }}>
						<h2
							style={{
								margin: "0",
								fontSize: "4vh",
								textAlign: "center",
								minWidth: "100%"
							}}
						>
							We have got all the  <br /> precautionary products to  keep <br /> you safe from coronavirus
            			</h2>
					</Col>
					<Col sm={24} lg={12} xl={12} style={{ justifyContent: "center" }}>
						<Row style={{ width: "100%" }}>
							<Col span={24}>
								<h1 style={{ textAlign: "center", color: "#1890ff" }}><b>{isAdmin && !showname ? "Hello Admin" : "CovidMart"}</b></h1>
							</Col>
							<Col span={24}>
								<div style={{ margin: "0", padding: "0", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
									{formcomp()}
									<Input
										style={{ display: "block", marginBottom: "8px", width: "50%", marginTop: "8px" }}
										type="text"
										autoComplete="off"
										placeholder="Enter your email"
										id="email"
										onChange={(e) => { setEmail(e.target.value) }}
									/>
									<Input
										style={{ display: "block", marginBottom: "8px", marginTop: "8px", width: "50%" }}
										placeholder="Enter your password"
										type="password"
										id="password"
										onChange={(e) => { setPassword(e.target.value) }}
									/>
									<div style={{ width: "50%" }}>
										<Button
											className="waves-effect waves-light btn"
											type="primary"
											onClick={(eve) => {
												if (showname) {
													eve.preventDefault()
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
														.then(res => res.json())
														.then(data => {
															console.log(data)
															alert("now login with credentials")
														})
												}
												else {
													eve.preventDefault()
													fetch("http://localhost:4000/signin", {
														method: "post",
														headers: {
															"Content-Type": "application/json"
														},
														body: JSON.stringify({
															email: email,
															password: password
														})
													})
														.then(res => res.json())
														.then(data => {
															if (data.error) {
																console.log(data.error)
																alert("incorrect email or password")
															}
															else {
																localStorage.setItem("jwt", data.token)
																localStorage.setItem("userId", data.userId)
																console.log(data)
																history.push("/")
															}
														})
												}
											}}
										>
											{/* <i className="right material-icons">account_circle</i> */}
											{showname ? "Signup" : "Signin"}
										</Button>
										<Link style={{ display: "inline-block", textDecoration: "none", color: "black", marginLeft: "2%" }}
											onClick={() => console.log("hello world")}>{showname || isAdmin ? "" : "Forgot password"}</Link>
									</div>
									<div style={{ marginTop: "10px" }}>
										<Link
											onClick={() => { setIsAdmin(true) }}
											style={{ textDecoration: "none", color: "black" }}
										>
											{isAdmin || showname ? "" : "Are you admin ?"}
										</Link>
									</div>
									<div style={{ marginTop: "10px" }}>
										<Link
											style={{ textDecoration: "none", color: "black" }}
											onClick={() => {
												setShowname(prevstate => !prevstate);
												setIsAdmin(false)
											}

											}
										>
											{showname || isAdmin ? "Back" : "Create account"}
										</Link>
									</div>
								</div>
							</Col>
						</Row>
					</Col>
				</Row>
			</div>
		</div>
	);
}
