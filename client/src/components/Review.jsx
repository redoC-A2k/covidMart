import React, { useState } from 'react';

export default function Review (props) {
    const [rating,setRating] = useState(0);

    let handleRate = function (ind) {
        let arr = document.querySelector("#review div.rating").children
        for (let index = 0; index < 5; index++) {
            if(index <= ind) {
                arr.item(index).classList.add("solid");
            }
            else{
                arr.item(index).classList = "star-icon"
            }
        }
        setRating (ind+1);
    }

    let giveRating = function () {
        props.giveRating(props.productId,props.userId,rating);
    }

    return(
    <div className="row" id="review">
        <div className="col-sm-6">
            <h3>Give your rating !</h3>
            <div className="rating">
                <span key={0} onMouseOver={()=>handleRate(0)} className="star-icon">★</span>
                <span key={1} onMouseOver={()=>handleRate(1)} className="star-icon">★</span>
                <span key={2} onMouseOver={()=>handleRate(2)} className="star-icon">★</span>
                <span key={3} onMouseOver={()=>handleRate(3)} className="star-icon">★</span>
                <span key={4} onMouseOver={()=>handleRate(4)} className="star-icon">★</span>
            </div>
            <div className="review">
                {/* <textarea name="review" className='w-100' rows="2" placeholder='Write your review here!'></textarea> */}
                {/* TODO: Add a review area  */}
                <button className="submit" onClick={giveRating}>Submit</button>
            </div>
        </div>
        <div className="col-sm-6">
            {/* <h4>Words from other buyers</h4> */}
        </div>
    </div>
    )
}