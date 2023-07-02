import React from "react";
import Tilt from 'react-parallax-tilt';
import "./Logo.css";
import brain from "./brain5.png";

const Logo = ({userName}) =>{
    return(
        <div className="ma4 mt1">
            <Tilt className="Tilt br2 shadow-5">
                <div className="logoContainer">
                    <div className="userName">{userName}</div>
                    <img className="Logo" src={brain} alt="logo" />
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;
