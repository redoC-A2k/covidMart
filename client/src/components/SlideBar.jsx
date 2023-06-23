import React, { useEffect, useState } from "react"

const SBarPosition = {
    Left:"left",
    Right:"right"
}

function SBarButton(props){
    return (
        <div className="sbarbutton">
            {props.children}
        </div>
    )
}

function SBarAccordion(props){
    const [id,setID] = useState(new Date().getMinutes().toString()+new Date().getSeconds().toString()+new Date().getMilliseconds().toString())

    useEffect(()=>{
        let SBarAccTitle = document.getElementById(id).children[0]
        let SBarAccBody = document.getElementById(id).children[1]
        // As by default the expanded is false so we need to hide accordion body
        // document.getElementById(id).children[1].classList.add("visible")
        // console.log(document.getElementById(id).children[1].classList)
        SBarAccTitle.addEventListener("click", ()=>{
            if(SBarAccBody.classList.contains("visible")){
                SBarAccBody.classList.remove("visible")
            } else {
                SBarAccBody.classList.add("visible")
            }
        })
    },[])

    return (
        <div id={id} className="sbaraccordion">{props.children}</div>
    )
}

function SBarAccTitle(props){ 
    return <div className="title">{props.children}</div>
}
function SBarAccBody(props){
    return <div className="body">{props.children}</div>
}

function SBarTitle(props){
    return (
        <div className="sbartitle">
            {props.children}
        </div>
    )
}


function SlideBar(props){
    useEffect(()=>{
        if(props.position==SBarPosition.Left){
            let element = document.querySelector('section.slidebar.left')    
            element.style.left = props.left;
            element.style.width = props.leftWidth;
        } else if(props.position==SBarPosition.Right){
            let element = document.querySelector('section.slidebar.right')    
            element.style.right = props.right;
            element.style.width = props.rightWidth;
        }
    },[props.left,props.right])

    function handleClose(){
        if(props.position==SBarPosition.Left){
            props.setLeft("-"+props.leftWidth);
        }
        else if(props.position==SBarPosition.Right){
            props.setRight("-"+props.rightWidth);
        }
    }

    return (<section id={props.id?`${props.id}`:""} className={`slidebar ${props.position}`}>
        <div className="head">
            {props.children[0].type === SBarTitle? props.children[0]:<></>}
            <div className="sbarcross"><i className="fa-solid fa-xmark" onClick={handleClose}></i></div>
        </div>
        <div className="body">
            {
                props.children.map((child,ind)=>{
                    if((props.children[0].type===SBarTitle&&ind>0) || (props.children[0].type!==SBarTitle)) {
                        return (<div key={ind} className="sbaritem">
                            {child}
                        </div>)
                    }
                })
            }
        </div>
    </section>)
}

export {SlideBar,SBarAccordion,SBarAccTitle,SBarAccBody,SBarButton,SBarTitle,SBarPosition};