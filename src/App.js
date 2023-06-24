  import React from "react";
  import { useState, useEffect} from "react";  
  import ParticlesBg from 'particles-bg';
  import './App.css';
  import Navigation from "./components/Navigation/Navigation";
  import Logo from "./components/Logo/Logo"
  import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
  import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
  import Rank from "./components/Rank/Rank";
  import SignIn from "./components/Sign-In/Sign-in";
  import Register from "./components/Register/Register";
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

  const initialUserState = {
    id: "",
    name: "",
    email: "",
    password: "",
    entries: 0,
    joined: ""
  }
 
  function App() { 
    const [inputText, setInputText] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [recognitionBox, setRecognitionBox] = useState("");
    const [route, setRoute] = useState("signIn");
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userData, updateUserData] = useState(initialUserState);

    const loadUserData = (data) =>{
      updateUserData({
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      entries: data.entries,
      joined: data.joined
      })
    }
   
    const calculateRecognitionBox = (boundingBoxData) =>{
     const clarifaiFace = boundingBoxData.outputs[0].data.regions[0].region_info.bounding_box;
     const image = document.getElementById("inputImage");
     const width = Number(image.width);
     const height = Number(image.height);
    //  console.log("Image data are: ", width, height);

     return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
     }
    }

    const displayFaceBox = (boxResponse) => {
      // console.log("Display Response: " , boxResponse);
      setRecognitionBox(boxResponse);
    }

    const onInputChange = (event) => {
      setInputText(event.target.value);
    }

    const onButtonSubmit =() =>{
      setImageUrl(inputText);
      fetch("https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs", returnClarifaiRequestOptions(inputText))
          .then(response => response.json())
          .then(boundingBox =>{
            if(boundingBox){
                fetch("http://localhost:3000/image/", {
              method: "put",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({
                  id : userData.id
                })
             })
             .then(response => response.json())
             .then(count => {
              updateUserData({...userData,
                              entries: count})
              })
              .catch(console.log())
            }
            displayFaceBox(calculateRecognitionBox(boundingBox))
            })
          .catch(error => console.log('error', error));
    }

    const onRouteChange = (route) => {
      if (route === "signIn"){
        setInputText("");
        setImageUrl("");
        setRecognitionBox("");
        updateUserData(initialUserState);
        setIsSignedIn(false)
        setRoute('signIn')
      }
      else if (route === 'face-detection-app'){
        setIsSignedIn(true)
        setRoute('face-detection-app')
      } else{
        setRoute('register')
      }
    }

    return (
      <div className="App container">
        <ParticlesBg className="particles-bg-canvas-self particles"
          num={150}
          type="square"
          bg={{
            background: "#997026",
            position: "fixed", /* this took way too much to figure out */
            zIndex: -1,
            top: 0,
            left: 0
          }}
          />

          { route === "face-detection-app" ? 
              <>
                  <Navigation isSignedIn = {isSignedIn} onRouteChange = {onRouteChange} route = {route} />
                  <Logo />
                  <Rank name={userData.name} entries={userData.entries} />
                  <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit}/>
                  <FaceRecognition imageUrl={imageUrl} recognitionBox={recognitionBox} />
              </>
              : ( route === "signIn" 
                    ? <>
                      <Navigation isSignedIn = {isSignedIn} onRouteChange = {onRouteChange} route = {route}/>
                      <SignIn loadUserData={loadUserData} onRouteChange = {onRouteChange} />
                      </>
                    : <> 
                    <Navigation isSignedIn = {isSignedIn} onRouteChange = {onRouteChange} route = {route}/>
                    <Register loadUserData={loadUserData} onRouteChange = {onRouteChange} />
                    </> )
                      
          }
        
      </div>
    );
  }

  export default App;
