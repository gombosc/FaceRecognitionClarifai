React App that uses Clarifai API in order to detect faces from images

Progress:

1. Create basic components:
- Logo
- Navigation
- Rank
- Image Link Form 
- Face Recognition 

2. Create state components and build the basic layout (using tachyons for css mostly)

3. Import Libraries (react-parallax-tilt, particles-bg)
- set background using particles-bg, still have to figure out how to make it fully cover the page when it becomes scrollable
- create small logo using tilt library

4. Get the basic API, connect id and user in order to access face-detection
- use destructuring for useState instead of classes

5. Make the layout interactive, let user select and insert image into the form input, make image show beneath the form

6. Select the boounding-box values from the API and figure out the 400 Error, CORS, as well as understand the async nature of React

7. Figure out the math for left, right, top and bottom values, grab the image width and height and calculate the position of the box on the face

8. Add the box on the face (figured out why it wasn't working, mispelled an r in the bottomRow, checked the properties in the browser)

9. Test to see if box works with any image (Verified, it works)

10. Add Sign In Page and Register, 1 new state: route - which verifies on which page we are (Functional)

11. Finished Front-End Part, moving to Backend and Node

12. Working on Node (leaarnt to work with servers - Express)

13. Back-End side (working on the API with Postman)
- installed bcrypt-nodejs for hashing passwords

14. Connecting front end with backend (installing cors package too for CORS error when fetching from http to https)