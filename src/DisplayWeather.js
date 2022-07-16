import React from 'react'

const DisplayWeather = ({data}) => {
  
  return (
    <section className="weather_report">
      <div className="report_details">
        <div className="temp">
          <h1>
            TEMP <span>{Math.floor(data.main.temp - 273.15)}</span>
            <span className="celcius">&#8451;</span>
          </h1>
        </div>
        <div className="prw">
          <span className="pressure">
            Pressure <span>{data.main.pressure} hPa</span>
          </span>
          <span className="wind">
            Wind <span>{Math.floor((data.wind.speed * 18) / 5)} km/hr</span>
          </span>
        </div>
        <div>
          <p className="time">
            Time <span>{new Date().toLocaleTimeString()}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default DisplayWeather