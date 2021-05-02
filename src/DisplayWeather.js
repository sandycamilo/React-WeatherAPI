import './DisplayWeather.css';
import DisplayTemp from './DisplayTemp'

function DisplayWeather(props) {
  if (props.cod !== 200) {
    return (
      <div className="DisplayWeather">
        <small className="warning">{props.cod} {props.message}</small>
      </div>
    )
  }
  return (
    <div className="DisplayWeather">
      <DisplayTemp temp={props.temp}/>
      <h2>{props.desc}</h2>
      <small>Humidity:{props.humidity}</small>
    </div>
  )
}

export default DisplayWeather;