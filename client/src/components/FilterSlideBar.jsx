import React,{useState} from "react";
import { SlideBar,SBarTitle,SBarPosition, SBarAccordion, SBarAccTitle, SBarAccBody } from "./SlideBar";
import { connect } from "react-redux";
import {debounce} from "utility"
import { applyFilter } from '../redux/ActionCreators/filter'

const mapStateToProps = state => {
  return { allproducts: state.dbdata }
}
const mapDispatchToProps = dispatch => {
  return {
    applyFilter: (price, category) => { dispatch(applyFilter(price, category)) }
  }
}

function FilterSlideBar (props) {
    const [priceValue,setPriceValue] = useState(4000);
    const [category,setCategory] = useState("all");

    function priceChange(event){
        event.persist()
        setPriceValue(event.target.value);
            console.log(event.target.value)
        let delayfn = debounce(()=>{
            props.applyFilter(event.target.value,category)
        },500)
        delayfn();
    }

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

    return(
        <SlideBar id="filterbar" leftWidth={props.leftWidth} left={props.left} setLeft={props.setLeft} position={SBarPosition.Left}>
            <SBarTitle>
                <h3 className="gradient">Filter Products</h3>
            </SBarTitle>
            <SBarAccordion>
                <SBarAccTitle>Filter by Price</SBarAccTitle>
                <SBarAccBody>
                    <div className="price-filter">
                        <span className="range">
                            <span className="left">0</span>
                            <input type="range" min="0" max="10000" 
                                value={priceValue}
                                onChange={priceChange}
                                />
                            <span className="right">10000</span>
                        </span>
                        <span className="number">
                            <input size={3} readOnly type="number" onChange={e=>{
                                e.preventDefault()
                                if(e.currentTarget.value>0)
                                setPriceValue(e.currentTarget.value)
                            }} value={priceValue}/>
                        </span>
                    </div>
                </SBarAccBody>
            </SBarAccordion>
            <SBarAccordion>
                <SBarAccTitle>Filter by Category</SBarAccTitle>
                <SBarAccBody>
                    <div className="category-filter">
                        <div><input id="all"   value="all" defaultChecked="on" onChange={categoryChange} type="radio" name="category" /> <label htmlFor="all">All</label></div>
                        <div><input id="masks"  value="masks" onChange={categoryChange} type="radio" name="category" /> <label htmlFor="masks">Masks</label></div>
                        <div><input id="ppekit"  value="ppekit" onChange={categoryChange} type="radio" name="category" /> <label htmlFor="ppekit">PPE-Kit</label></div>
                        <div><input id="gloves" value="gloves" onChange={categoryChange} type="radio" name="category" /> <label htmlFor="gloves">Gloves</label></div>
                        <div><input id="disinfectant"  value="disinfectant" onChange={categoryChange} type="radio" name="category" /> <label htmlFor="disinfectant">Disinfectant</label></div>
                        <div><input id="sanitizer"  value="sanitizer" onChange={categoryChange} type="radio" name="category" /> <label htmlFor="sanitizer">Sanitizer</label></div>
                        <div><input id="thermometer"  value="thermometer" onChange={categoryChange} type="radio" name="category" /> <label htmlFor="thermomter">Thermometer</label></div>
                        <div><input id="other"  value="other" onChange={categoryChange} type="radio" name="category" /> <label htmlFor="other">Other</label></div>
                    </div>
                </SBarAccBody>
            </SBarAccordion>
        </SlideBar>
    )
    
}

export default connect(mapStateToProps,mapDispatchToProps)(FilterSlideBar);