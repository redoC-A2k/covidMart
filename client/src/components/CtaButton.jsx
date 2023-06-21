import React, { useEffect, useState } from "react";

export default function CtaButton(props){
    const[width,setWidth]=useState("")
    useEffect(()=>{
        console.log(props.children[1].props.children)
        let text = props.children[1].props.children;
        // console.log(typeof text.length)
        let charWidth = 1.6*(text.length+2); // for content
        // console.log(text, charWidth)
        setWidth(`calc(6px + 3ch + ${charWidth}ch`)
        // 6px(both sides border) + 3ch(both sides padding)+ (content box width)
    },[])
    return (
        <button onClick={props.onClick} type={props.type} id={props.id} style={{width:width}} className={`${props.solid?"ctabutton solid":"ctabutton"}`}>
            {props.children}
        </button>
    )
}