import React from "react";
import { Link } from "react-router-dom";
function SearchResults(props) { 
    if(props.searchResults.length!=0){
        return (
            <div id="searchResults">
                <ul>
                    {props.searchResults.map((eachObj,ind)=>(
                        <li key={ind}>
                            <div>
                                <img src={eachObj.image}/>
                                <span><Link to={eachObj.url} onClick={()=>props.setSearchResult([])}>{eachObj.title}</Link></span>
                            </div>
                        </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
    else return <></>
}

export default SearchResults;