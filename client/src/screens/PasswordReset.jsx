import React, { useEffect, useState } from "react";
import CtaButton from "../components/CtaButton";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { showInfoToast,showErrorToast } from "toast";
export default function PasswordReset (props){
    const[pass1,setPass1] = useState("")
    const[pass2,setPass2] = useState("")
    const history = useHistory()
    let params = useParams();
    function handlePasswordReset(event){
        event.preventDefault();
        let element = document.querySelector('#passwordreset form fieldset:nth-child(2) input')
        if(pass1!==pass2){
            element.setCustomValidity("Password do not match")
            element.reportValidity()
        } else {
            element.setCustomValidity("")
            fetch(`${process.env.REACT_APP_BACKEND}/user/password/reset`,{
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    userId:params.userId,
                    token: params.token,
                    password:pass1
                })
            }).then(res=>res.json())
            .then(data => {
                if(data.error)
                showErrorToast(data.error)
                else {
                    showInfoToast(data.message)
                    history.push("/auth")
                }
            })
        }
        // showInfoToast("Password Matched")
    }
    return (<section id="passwordreset">
        <form className="myform" onSubmit={handlePasswordReset}>
            <fieldset>
                <input
                    placeholder="New Password"
                    autoComplete="off"
                    type="password"
                    name="pass1"
                    id="pass1"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters."
                    onChange={(e) => { setPass1(e.target.value) }}
                    required
                />
                <label htmlFor="pass1">New password:</label>
            </fieldset>
            <fieldset>
                <input
                    placeholder="Confirm Password"
                    autoComplete="off"
                    type="password"
                    name="pass2"
                    id="pass2"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters."
                    onChange={(e) => { setPass2(e.target.value) }}
                    required
                />
                <label htmlFor="pass2">Confirm password:</label>
            </fieldset>
            <CtaButton
                solid
                type="submit"
            >
                <span className={`fa-solid fa-key icon`}></span>
                <span className={`text`}>Submit</span>
            </CtaButton>
        </form>
    </section>)
}
