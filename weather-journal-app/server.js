// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8080;
/* Spin up the server*/
const server = app.listen(port, listening);
 function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
  };



// GET route
app.get('/all', sendData);

function sendData (request, respond) {
  respond.json(projectData);
  
};
 

 //POST route
app.post('/add', callBack);

function callBack(req,res){
  res.send('POST received');
  console.log('POST recieved')
};

// POST a weatherData

app.post('/addweatherdata', addWeatherData);

function addWeatherData (req,res){
  let newEntry = [];

   newEntry = {
    date: req.body.date,
    zip: req.body.zip,
    temp: req.body.temp,
    feeling: req.body.feeling
  };

  projectData = newEntry;
  console.log(projectData);

}

 

