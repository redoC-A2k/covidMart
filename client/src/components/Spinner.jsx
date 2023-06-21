import React from "react";

export default function Spinner(props){
    return (
        <div id="spinner">
            <div>
                <img src={process.env.PUBLIC_URL+"/assets/images/CovidMart logo no background.png"} />
                <span> </span>
            </div>
        </div>
    )
}