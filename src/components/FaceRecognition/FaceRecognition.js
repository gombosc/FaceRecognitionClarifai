import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, recognitionBox }) =>{
    return(
        <div className="center ma">
            <div className="absolute mt2">
                <img id="inputImage" src={imageUrl} width="600px" height={"auto"}/>
                <div className="face-detection-box" style={{ top: recognitionBox.topRow, right: recognitionBox.rightCol, bottom: recognitionBox.bottomRow, left: recognitionBox.leftCol }}></div>
            </div>
        </div>
    )
}

export default FaceRecognition;