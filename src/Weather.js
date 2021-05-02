import { useState } from 'react'
import './Weather.css';
import './DisplayWeather.js';
import DisplayWeather from './DisplayWeather.js';

function Weather() { //********************************
  //calling the useState hook 
  //zip value and setZip function
  const [zip, setZip] = useState('')
  //null default value - no value
  const [data, setData] = useState(null)
  // const [unit, setUnit] = useState('farenheit')

  // -------------------------------------------------
  // function to load data  
  // always returns a promise 
  async function getWeather() {
      const apikey= process.env.REACT_APP_OPENWEATHERMAP_API_KEY
      const path = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apikey}&units=imperial`
      // console.log(path)
      const res = await fetch(path) //stop !
      const json = await res.json() //stop !

      const { cod, message } = json
      console.log(json)

      if (cod !== 200) { // if 404 == "404" true ... 404 === "404" false
        setData({ cod, message })
        return //stop here and exit!
      }

      const temp = json.main.temp
      const humidity =json.main.humidity
      const desc = json.weather[0].description

      setData({ temp, desc, humidity, cod, message})
  } 
  // -------------------------------------------------
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  return (
    <div className="Weather">
      {/* ...? if-truthy : if-falsy  */}
      {data ? <DisplayWeather { ...data } /> : null}
      <form onSubmit={e => {
        e.preventDefault()
        //when submit the form you call get weather to load data 
        getWeather()
      } }>
        <input 
          value= {zip}
          //when user inputs zipcode 
          //e is an event object 
          onChange={e => setZip(e.target.value)}
          placeholder={'Zip Code'}
        />
        <button type="submit">Submit</button>
        
        <button
        className="location"
        type="button"
        onClick={ () => {
          const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          };
          
          function success(pos) {
            const crd = pos.coords;
          
            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
          }
          
          function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
          }
          
          navigator.geolocation.getCurrentPosition(success, error, options);
        }}
      >Location</button>
    </form>  
    </div>
  ) // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
}//********************************

export default Weather;