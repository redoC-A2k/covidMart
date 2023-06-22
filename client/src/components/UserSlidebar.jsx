import React from "react";
import { SlideBar,SBarTitle,SBarPosition, SBarButton} from "./SlideBar";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function UserSlidebar (props) {
    const history = useHistory()
    function logout(){
        localStorage.clear()
        history.push('/auth')
    }
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
                <Link to="/auth" onClick={logout}>Logout</Link>
            </SBarButton>
        </SlideBar>
    )
    
}

// export default connect(mapStateToProps,mapDispatchToProps)(FilterSlideBar);
export default UserSlidebar;