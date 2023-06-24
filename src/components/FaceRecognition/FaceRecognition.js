import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, recognitionBox }) =>{
    return(
        <div className="center ma">
            <div className="absolute mt2">
                <div className="image-container">
                    <img id="inputImage"
                    id="inputImage" 
                    src={imageUrl} 
                    // style={{width: "600px", height: "400px"}} 
                    />

                </div>
                <div className="face-detection-box" style={{ top: recognitionBox.topRow, right: recognitionBox.rightCol, bottom: recognitionBox.bottomRow, left: recognitionBox.leftCol }}></div>
            </div>
        </div>
    )
}

export default FaceRecognition;