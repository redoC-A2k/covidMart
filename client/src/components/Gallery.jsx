
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Gallery (props) {
    let product_url = "/product/"+props.product._id;
    let [currentImg,setCurrentImg] = useState(props.product.images[0]);
    useEffect(()=>{
        setCurrentImg(props.product.images[0])
    },[props])

    function handleImageChange(event, ind){
        setCurrentImg(props.product.images[ind]);
        let imgArray = document.getElementById("scrolldiv").children ;
        for (let index = 0; index < imgArray.length; index++) {
            let element = imgArray[index];
            element.classList = "col-4 col-sm-12 p-1 "
        }
        imgArray[ind].classList.add("selected")
    }
    return (
        <div className='row' id="gallery">
            <div className="col-12 col-sm-10 order-sm-2 p-4" id="currdiv">
                <img src={currentImg} alt="current_img" className='w-100' />
            </div>
            <div className="col-12 col-sm-2 order-sm-1 p-2">
                <div className="row" id="scrolldiv">
                {props.product.images.map((eachImgUrl, ind)=>{
                    return(
                        <div className={"col-4 col-sm-12 p-1 "+(ind==0?"selected":"") } key={ind} onClick={(event)=>handleImageChange(event,ind)}>
                            <img src={eachImgUrl} className="w-100"/>
                        </div>
                    )
                })}
                </div>
            </div>
        </div>
    )
}