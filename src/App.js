import React, { useState } from 'react';
import './index.css';
import DisplayWeather from './DisplayWeather';
import axios from 'axios';

const App = () => {
  const [weather, setWeather] = useState([]);
  const [form, setForm] = useState({ city: '' });
  const [photos, setPhotos] = useState([]);

console.log(form)

  const APIKEY = 'a388733a05ff27e506473e8f50c88aac';
  const weatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${form.city}&appid=${APIKEY}`;

  const APP_ID = '6WUd2h6zgltlWrvtUdNXN4qlUMYGZQG6u0vZ8nc3Puw';

  const fetchWeatherData = async (e) => {
    e.preventDefault();
    if (form.city === '') {
      alert('Enter all the inputs');
    } else {
      const data = await axios(weatherurl)
        .then((res) => res.data)
      setWeather({ data: data });
    }
    setForm({ city: '' });

    try {
      axios(
          `https://api.unsplash.com/search/photos?query=${form.city}&client_id=${APP_ID}`
        )
        .then((res) => {
          if (res.ok) {
            return res.data;
          } else {
            throw new Error('You made a mistake');
          }
        })
        .then((data) => {
          setPhotos(data?.results[0]?.urls?.raw);
        });
    } catch (error) {
      console.log(error);
    }
  };
  //   fetch(
  //     `https://api.unsplash.com/search/photos?query=${form.city}&client_id=${APP_ID}`
  //   )
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       } else {
  //         throw new Error('You made a mistake');
  //       }
  //     })
  //     .then((data) => {
  //       setPhotos(data?.results[0]?.urls?.raw);
  //     })
  //     .catch((error) => console.log(error));
  

  const changeHandler = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [key]: value });
  };

  return (
    <div className="weather">
      <div className="title">
        <p>Weather App</p>
      </div>
      <div className="img_cta">
        <img src={photos} alt="" />
      </div>
      <form className="form">
        <div className="form_control">
          <input
            type="text"
            name="city"
            id="cityname"
            placeholder="Enter the city name"
            value={form.city}
            onChange={changeHandler}
          />
        </div>
        <button
          type="submit"
          className="getweather_btn"
          onClick={(e) => fetchWeatherData(e)}
        >
          submit
        </button>
      </form>

      {weather.data !== undefined ? (
        <div>
          <DisplayWeather data={weather.data} photos={photos} />
        </div>
      ) : null}
    </div>
  );
};

export default App
