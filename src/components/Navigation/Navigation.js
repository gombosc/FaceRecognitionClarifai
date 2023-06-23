import React from "react";

const Navigation = ({onRouteChange, isSignedIn, route}) =>{
    if(isSignedIn && route === 'face-detection-app'){
        return(
            <nav style={{display:"flex", justifyContent:"flex-end"}}>
                <p onClick={() => onRouteChange("signIn")} className="f3 link dim white underline pa3 pointer">Sign Out</p>
            </nav>
        )
    }else if (!isSignedIn && route === "signIn"){
        return(
            <nav style={{display:"flex", justifyContent:"flex-end"}}>
            <p onClick={() => onRouteChange("signOut")} className="f3 link dim white underline pa3 pointer">Register</p>
            </nav>
    )}
    else{
        return(
            <nav style={{display:"flex", justifyContent:"flex-end"}}>
            <p onClick={() => onRouteChange("signIn")} className="f3 link dim white underline pa3 pointer">Sign In</p>
            </nav>
    )
    }
}

export default Navigation;