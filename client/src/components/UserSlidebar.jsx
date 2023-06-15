import React,{useState} from "react";
import { SlideBar,SBarTitle,SBarPosition, SBarButton} from "./SlideBar";
import { connect } from "react-redux";
import {debounce} from "utility"
import { applyFilter } from '../redux/ActionCreators/filter'
import { Link } from "react-router-dom";

function UserSlidebar (props) {

    return(
        <SlideBar id="userbar" rightWidth={props.rightWidth} right={props.right} setRight={props.setRight} position={SBarPosition.Right}>
            <SBarTitle>
                <h3 className="gradient">User Section</h3>
            </SBarTitle>
            <SBarButton>
                <Link to="/user/profile">Profile</Link>
            </SBarButton>
            <SBarButton>
                <Link to="/user/cart">Cart</Link>
            </SBarButton>
            <SBarButton>
                <Link to="/auth" onClick={()=>{}}>Logout</Link>
            </SBarButton>
        </SlideBar>
    )
    
}

// export default connect(mapStateToProps,mapDispatchToProps)(FilterSlideBar);
export default UserSlidebar;