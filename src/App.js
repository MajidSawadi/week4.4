import React, { useState, useEffect } from "react";
import './App.css';
import 'react-bootstrap';
import  NavBBar from './NavBBar.js';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card  } from 'react-bootstrap';


function App() {
  const[weather, setWeather] = useState(null);
const fetchWeacther =async(lat , lon)=>{
  const response= await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7218f65eb805ca72215b95d1f17d846f`,
  );

  const json =await response.json();
 
  setWeather(json);
  
}
const WeatherInfo = ({ weather }) => {
  const temperatureC =
    weather && weather.main ? (weather.main.temp - 273.15).toFixed(2) : "";
  const temperatureF =
    weather && weather.main
      ? (((weather.main.temp - 273.15) * 9) / 5 + 32).toFixed(2)
      : "";
  return (
    <Card className="bg-dark text-black main-content" >
      <Card.ImgOverlay className="d-flex flex-column justify-content-center text-center">
        <Card.Title>{weather?.name}</Card.Title>
        <Card.Text className="text-success h2">
          {`${temperatureC} °C / ${temperatureF} °F`}
        </Card.Text>
        <Card.Text className="text-info text-uppercase h2">
          {weather && weather.weather[0]?.description}
        </Card.Text>
       
      </Card.ImgOverlay>
    </Card>
  );
};
useEffect(()=>{
  console.log(navigator.geolocation.getCurrentPosition((pos)=>{
    const {latitude, longitude} =pos.coords;
  
    fetchWeacther(latitude, longitude);
    
  }))
},[]);
if(!weather){
  return<h1>loading</h1>
}
  return (
    <div className="App" >
    
      <NavBBar/>
      <br></br>
      <WeatherInfo weather={weather} />

    </div>
  );
}

export default App;
