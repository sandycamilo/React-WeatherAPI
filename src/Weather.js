import { useState } from 'react'
import './Weather.css';
import './DisplayWeather.js';
import DisplayWeather from './DisplayWeather.js';

// notes: 
//data ? <DisplayWeather temp={data.temp} desc={data.desc} />: null}
//<DisplayWeather { ... data} 

function Weather() {
  //calling the useState hook 
  //zip value and setZip function
  const [zip, setZip] = useState('')
  //null default value - no value
  const [data, setData] = useState(null)

  // function to load data  
  // always returns a promise 
  async function getWeather() {
      const apikey= process.env.REACT_APP_OPENWEATHERMAP_API_KEY
      
      const path = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apikey}`
      console.log(path)
      const res = await fetch(path) //stop !
      const json = await res.json() //stop !
      console.log(json)
      const temp = json.main.temp
      const humidity =json.main.humidity
      const desc = json.weather[0].description
      setData({ temp, humidity, desc })
      console.log(json)

      setData({ temp:64, desc: 'Scattered Clouds'})
  }

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
    </form>  
    </div>
  )
}

export default Weather;