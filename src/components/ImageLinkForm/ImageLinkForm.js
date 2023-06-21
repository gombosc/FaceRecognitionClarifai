import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({onInputChange, onButtonSubmit}) =>{
    return(
        <div>
            <p className="f2">
                {"Choose a imgae"}
            </p>
            <div className="center">
                <div className="form center pa4 br5 shadow-4">
                    <input 
                        className="f4 pa2 w-70 center" 
                        type="text" 
                        name="" 
                        id="" 
                        onChange={onInputChange} />
                    <button 
                        className="w-30 grow f3 link ph2 pv2 dib center white bg-dark-blue"
                        onClick={onButtonSubmit} >Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;