
const express = require('express')
const app = express();
const db = require('./db');

// bodyparses is a middleware library for express.js 
// it is used to parse and extract the body of incoming HTTP request
// bodyparser helps parse and extract this data from the request so that you can work with it in your express application.

const bodyParser = require('body-parser');
app.use(bodyParser.json());   // data received from body or form is in req.body


// app is like blueprint or instance, now we will use app for all the work of server

app.get('/', function(req, res){
    res.send('Welcome to our hotel')
})
// app.get is like menu card i.e. what all things can be done. We have used get method i.e. we just need basic data and don't want to change it, just need data 
// --- Here / this slash means that at localhost/ we will see this response i.e. Hello World on the screen
// First run server.js and then in browser localhost:3000/ to see the result


// Import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

// use the routers
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);


app.listen(3000, ()=>{
    console.log("Listening on port 3000");
});
// port of app or server







