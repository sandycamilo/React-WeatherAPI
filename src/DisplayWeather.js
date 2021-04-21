import './DisplayWeather.css';

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
      <h1>{props.temp}</h1>
      <p>{props.desc}</p>
      <small>Humidity:{props.humidity}</small>
      <small>{props.cod} {props.message}</small>
    </div>
  )
}

export default DisplayWeather;