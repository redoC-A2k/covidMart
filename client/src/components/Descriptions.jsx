import React, { useState } from 'react';

export default function Description (props) {
    return(
    <div className="row" id="description">
        <h3>Description of the product</h3>
        <div>
            <p>{props.product.description}</p>
        </div>
    </div>
    )
}