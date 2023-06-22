import React from "react";
import { Link } from "react-router-dom"

export default function Footer(props) {
    return (
        <section id="footer" >
            <div className="info">
                <img alt="logo" src="/assets/images/CovidMart logo no background.png" className="logo"/>
                <p>CovidMart strives to fulfill all the demands of its customer<br/> and protect them in this tough time</p>
                <h5><Link to="/">CovidMart</Link> © All Rights Reserved</h5>
            </div>
            <div className="contact">
                <div>
                    <img className="social" alt="facebook" src="/assets/images/facebook-icon.png"/>
                    <img className="social" alt="twitter" src="/assets/images/twitter-icon.png"/>
                    <img className="social" alt="instagram" src="/assets/images/instagram-icon.png"/>
                    <img className="social" alt="linkedin" src="/assets/images/linkedin-icon.png"/>
                    <a href="mailto:covid-mart-help@yandex.com"><img className="social" alt="linkedin" src="/assets/images/email-icon.png"/></a>
                </div>
                <h5>Developed by <a href="https://www.linkedin.com/in/afshan-ak">Afshan Ahmed Khan</a></h5>
            </div>
        </section>
    );
}