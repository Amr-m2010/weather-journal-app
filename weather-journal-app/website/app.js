/* Global Variables */
const date = document.querySelector('#date')
const temp = document.querySelector('#temp')
const content = document.querySelector('#content')
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

let myData=[];


//contacting the api
//the api url
let baseURL = `http://api.openweathermap.org/data/2.5/weather?zip=`;
//our unique api key
let apiKey = '1df1924edb43646ace315854f2eab9f7';



//link the button with an event

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
  
const newZip =  document.getElementById('zip').value;
const newFeeling= document.getElementById('feelings').value;
//Get data from API THEN Save data in the server THEN fetch data from the server and updating the UI.
getWeatherData(baseURL,newZip, apiKey)
.then (function(data){ 
    postWeatherData('/addweatherdata', { date: newDate, zip: newZip, temp: data.main.temp, feeling: newFeeling });
  })
  .then (function(data){updateUI()});
  

}




//fetch the data from the api
const getWeatherData = async (baseURL,newZip, apiKey)=>{

  const res = await fetch(baseURL+newZip+'&appid='+apiKey+'&units=metric')
  try {

    const weatherData = await res.json();
    console.log(weatherData['main']['temp'])
    return weatherData;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}
//Saving data to the server
const postWeatherData = async ( url = '', data = {})=>{
    
      const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
  
      try {
        const newData = await response.json();
        
        return newData;
      }catch(error) {
      console.log("error", error);
      // appropriately handle the error
      }
  }
  
  //Updating the UI at Last =>
  const updateUI = async()=>{
    //requesting the data from the server.
    const request = await fetch('/all')
    try{
      //updating the UI
      
      const allData= await request.json();
      date.innerHTML = `Date: ${allData['date']}`
      temp.innerHTML = `Temp: ${allData['temp']}`
      content.innerHTML = `Feelings: ${allData['feeling']}`

    }
    catch(error){
      console.log('error',console.error);
    }
  }

  
