import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon  from '../assets/search.png'
import clear_icon  from '../assets/clear.png'
import cloud_icon  from '../assets/cloud.png'
import drizzle_icon  from '../assets/drizzle.png'
import humidity_icon  from '../assets/humidity.png'
import rain_icon  from '../assets/rain.png'
import wind_icon  from '../assets/wind.png'
import snow_icon  from '../assets/snow.png'
import pressure_icon  from '../assets/gauge.png'


const Weather = () => {
  const inputRef = useRef('London')
  const [weatherData, setWeatherData] = useState(false);
  useEffect(()=>{
    search("")
  },[])
  // created the allIcon object to store the defferent code for the weather icon that for which id which icon will be displayed
  const allIcons = {
    "01d" : clear_icon,
    "01n" : clear_icon,
    "02d" :cloud_icon,
    "02n" :cloud_icon,
    "03d" :cloud_icon,
    "03n" :cloud_icon,
    "04d" :drizzle_icon,
    "04n" :drizzle_icon,
    "09d" :rain_icon,
    "09n" :rain_icon,
    "010d" :rain_icon,
    "010n" :rain_icon,
    "013d" :snow_icon,
    "013n" :snow_icon,
  }
  //created the search function to find the city 
  const search = async (city)=>{
    if(city == ""){
      alert("Enter city Name")
      return ;
    }
    try{
      //url is the variable for storing the url of the api
      //in this we had changed the city by using string literal ${city} and also changes the unit as &unit=metric
      //the api key is imported in place of Api key as import.meta.env.Variable_name 
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      //storing the data in json formate in data variable 
      const data = await response.json();
      // if response is not correct the return the alert message as nothing will be displayed except search box and icon
      if(!response.ok){
        alert(data.message);
        return ;
      }

      //printing the data in console to get the idea of data we get from the API
      console.log(data)
      //puting the obj allIcons in icon and using it in the setWeather state changer
      //if code is not found then clear_icon 
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      //defining how the state will be change
      //storing everything needed from the api in from of the variable
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature:Math.floor(data.main.temp),
        location:data.name,
        Icon: icon,
        pressure:data.main.pressure,
        desc:data.weather[0].main,
      })
    }catch(error){
      setWeatherData(false);
      console.error("Error in fetching the weather Data")
    }
  }



  return (
    <div className='weather'>
        <div className='search-box'>
          {/* here we are putting the text of the search box/input field to the state inputRef*/}
          {/*which the pass to the search function whenever we clicke the search icon */}
            <input ref = {inputRef} type="text" placeholder='Search' />
            {/* whenever we click the search icon whatever written in the search box that willl be passed in the search function */}
            <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
        </div>
        {/* if Api is working finely or the data is correct then below thing will be done */}
        {weatherData ? <>
        <div className="header">
        <img src={weatherData.Icon} alt="" className='weather_icon'/>
        <div className="insider">
        <p className='Temp'>{weatherData.temperature}°c</p>
        <p className='Location'>{weatherData.location}</p>
        </div>
        </div>
         <p className='desc'>Looks Like {weatherData.desc}</p>
        <div className="weather-data">
          <div className="col">
            <img src={humidity_icon} alt="" />
            <div>
              <p>{weatherData.humidity}%</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className="col">
            <img src={wind_icon} alt="" />
            <div>
              <p>{weatherData.windSpeed} KMPH</p>
              <span>Wind Speed</span>
            </div>
          </div>
          <div className="col">
            <img src={pressure_icon} alt="" />
            <div>
              <p>{weatherData.pressure} in</p>
              <span>Pressure</span>
            </div>
          </div>
        </div>
        </> :
        // Otherwise empty Fragment will be taking place that is nothing will happen
         <></>}
       
    </div>
  )
}

export default Weather
