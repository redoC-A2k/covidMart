# CovidMart
MERN based eCommerce web app for buying covid products . Ironical name though :) .
This website provides an interface for buying covid precautionary products . 
<br>
![logo](https://covid-mart.netlify.app/assets/images/CovidMart%20logo%20no%20background.png)
<br>
## Features
1. Authentication using jwt token
2. Admin Dashboard for adding new products
3. Hashing password using bcryptjs
4. Forgot password functionality implemented with reset link getting recieved on email
5. Validation on signin, signup and forget password page (basically all forms which recieve user input)
6. Completely responsive frontend
7. Product rating mechanism implemented
8. User cart functionality implemented
9. Images of products are uploaded on cloudinary cdn for faster access
10. Filtering of products on the basis of price and category
11. Continuous delivery

## Technologies used
**Backend** : Nodejs is used for implementing backend logic, backend server is deployed on render.com
<br>
**Databse**: Mongodb is used and mongoose is used for object modeling as interface between nodejs backedn server and mongodb
<br>
**Frontend**: Very minimal dependencies have been used (react scaffolding dependencies and redux and redux-thunk) otherwise everything is in vanilla html/jsx,css,js and from scratch (Be it carousel, cards, toasts, Loader, or tooltips) . Even for bootstrap just only bootstrap min css has been used not the js and popper cdns. Frontend is deployed on netlify.com
<br>
**Payment**: For payment Razorpay is used

## Screenshots

Signin:
![image](https://github.com/redoC-A2k/covidMart/assets/60838316/86fd58e7-3fc0-4046-9aa9-58565ec47067)
![image](https://github.com/redoC-A2k/covidMart/assets/60838316/03bf36ed-cd90-4095-a7d3-3bc4fb88b191)

Signup:
![image](https://github.com/redoC-A2k/covidMart/assets/60838316/410391a8-1247-49cf-b4c2-96ec81615369)

Loader:
![image](https://github.com/redoC-A2k/covidMart/assets/60838316/f938023b-8a0c-4107-990e-02a84e4b3d87)

More Screenshots will be added by today night ....




