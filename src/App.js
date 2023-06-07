  import React from "react";
  import { useState } from "react";
  import ParticlesBg from 'particles-bg';
  import './App.css';
  import Navigation from "./components/Navigation/Navigation";
  import Logo from "./components/Logo/Logo"
  import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
  import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
  import Rank from "./components/Rank/Rank";
  import "tachyons";


  const returnClarifaiRequestOptions = (imageUrl) =>{
    const PAT = '0b25009030b548bc8c18d8f6a57a83e6';
    const USER_ID = 'gombosc';       
    const APP_ID = 'Face-Detection-App';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';   
    const IMAGE_URL = imageUrl;

    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });

  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };

  return requestOptions;
  }


  function App() { 
    const [inputText, setInputText] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [recognitionBox, setRecognitionBox] = useState("");

    const calculateRecognitionBox = (data) =>{
     const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
     const image = document.getElementById("inputImage");
     const width = Number(image.width);
     const height = Number(image.height);
     console.log("Image data are: ", width, height);
     return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
     }
    }

    const displayFaceBox = (boxResponse) => {
      console.log("Display Response: " , boxResponse);
      setRecognitionBox(boxResponse);
    }

    const onInputChange = (event) => {
      setInputText(event.target.value);
    }

    const onButtonSubmit =() =>{
      setImageUrl(inputText);
      console.log("This is the input text " + inputText);
      fetch("https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs", returnClarifaiRequestOptions(inputText))
          .then(response => response.json())
          .then(boundingBox => displayFaceBox(calculateRecognitionBox(boundingBox)))
          .catch(error => console.log('error', error));
    }


    return (
      <div className="App">
        <ParticlesBg 
          className="particles-bg-canvas-self"
          type="square" 
          bg={true} 
          num={200}
           />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit}/>
        <FaceRecognition imageUrl={imageUrl} recognitionBox={recognitionBox}/>
      </div>
    );
  }

  export default App;
