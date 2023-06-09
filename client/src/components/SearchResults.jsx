import React from "react";
function SearchResults(props) { 
    if(props.searchProducts.length!=0){
        return (
            <div>
                {props.searchProducts.map(eachTitle=>eachTitle)}
            </div>
        )
    }
    else return <div></div>
}

export default SearchResults;