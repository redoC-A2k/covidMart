import React from "react"
import { connect } from "react-redux";
import { useEffect } from "react";
import {useState} from "react"
import {debounce} from "../assets/js/utilityFunctions"
import { applyFilter } from '../redux/ActionCreators/filter'

const mapStateToProps = state => {
  return { allproducts: state.dbdata }
}
const mapDispatchToProps = dispatch => {
  return {
    applyFilter: (price, category) => { dispatch(applyFilter(price, category)) }
  }
}

function togglePriceAcc(value){
    let pricePanel = document.querySelector("div.filter-price + div.panel");
    if(value){
        pricePanel.classList.add("active")
    }
    else{
        pricePanel.classList.remove("active")
    }
}

function toggleCategoryAcc(value){
    let pricePanel = document.querySelector("div.filter-category + div.panel");
    if(value){
        pricePanel.classList.add("active")
    }
    else{
        pricePanel.classList.remove("active")
    }
}

function closeSidebar(e){
    togglePriceAcc(false);
    toggleCategoryAcc(false);
    let sidebar = document.getElementById("sidebar")
    sidebar.style.visibility = "hidden"
}


function Sidebar(props){
    const [priceValue,setPriceValue] = useState(4000);
    const [category,setCategory] = useState("all");
    let priceAccVal = false;
    let categoryAccVal = false;

    // useEffect(() => {
    // },[])
    function categoryChange(event){
        let radiobtns = document.getElementsByName("category")
        for (let index = 0; index < radiobtns.length; index++) {
            let eachbtn = radiobtns[index];
            if(eachbtn.checked){
                setCategory(eachbtn.value);
                // console.log(eachbtn.value)
                props.applyFilter(priceValue,eachbtn.value)
                break;
            }
        }
    }

    function priceChange(event){
        event.persist()
        setPriceValue(event.target.value);
            console.log(event.target.value)
        let delayfn = debounce(()=>{
            props.applyFilter(event.target.value,category)
        },500)
        delayfn();
    }
    

return (<div id="sidebar">
        <div className="heading">
            <h3 className="gradient">Filter Products</h3>
            <h3 className="icon"><i onClick={closeSidebar} className="fa-solid fa-xmark"></i></h3>
        </div>
        <div className="body">
            <div className="filter-price accordion" onClick={()=>{
                    priceAccVal = !priceAccVal
                    togglePriceAcc(priceAccVal)
                }}>
                Filter by price
            </div>
            <div className="panel">
                <span>
                    <i className="fa-solid fa-minus"></i>
                    <input type="range" min="-" max="10000" 
                        value={priceValue}
                        onChange={priceChange}
                        />
                    <i className="fa-solid fa-plus"></i>
                </span>
                <span>
                    <input type="number" onChange={e=>{
                        e.preventDefault()
                        if(e.currentTarget.value>0)
                        setPriceValue(e.currentTarget.value)
                    }} value={priceValue}/>
                </span>
            </div>
            <div className="filter-category accordion " onClick={()=>{
                categoryAccVal = !categoryAccVal
                toggleCategoryAcc(categoryAccVal)
            }}>
                Filter by category
            </div>
            <div className="panel">
                <div><label><input value="all" defaultChecked="on" onChange={categoryChange} type="radio" name="category" /> All</label></div>
                <div><label><input value="masks" onChange={categoryChange} type="radio" name="category" /> Masks</label></div>
                <div><label><input value="ppekit" onChange={categoryChange} type="radio" name="category" /> PPE-Kit</label></div>
                <div><label><input value="gloves" onChange={categoryChange} type="radio" name="category" /> Gloves</label></div>
                <div><label><input value="disinfectant" onChange={categoryChange} type="radio" name="category" /> Disinfectant</label></div>
                <div><label><input value="sanitizer" onChange={categoryChange} type="radio" name="category" /> Sanitizer</label></div>
                <div><label><input value="thermometer" onChange={categoryChange} type="radio" name="category" /> Thermometer</label></div>
                <div><label><input value="other" onChange={categoryChange} type="radio" name="category" /> Other</label></div>
            </div>
        </div>
    </div>)
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);