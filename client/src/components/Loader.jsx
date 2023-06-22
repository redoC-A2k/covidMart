import React from "react";

export default function Loader(props){
    return (
        <div id="loader">
            <div>
                <img src={process.env.PUBLIC_URL+"/assets/images/CovidMart logo no background.png"} />
                <span> </span>
            </div>
        </div>
    )
}