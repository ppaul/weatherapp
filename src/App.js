import './App.css';
import Days from './components/days';
import { useState, useEffect } from 'react';



function App() {
  const [days, setDays] = useState([]);
  const [country, setCountry] = useState('en');
  const [city, setCity] = useState('...');

  useEffect(() => {
    async function getWeatherByLocation() {
      const ipCheckResponse = await fetch(`http://api.ipstack.com/check?access_key=${process.env.REACT_APP_IPSTACK_API_KEY}`)
      const ipData = await ipCheckResponse.json();
      const { city, location: { languages } } = ipData;
      setCity(city);
      const { code } = languages[0];
      setCountry(code);

      const weatherResponse = await fetch(`https://community-open-weather-map.p.rapidapi.com/forecast/daily?q=${city}&units=${code === 'us' ? 'imperial' : 'metric'}`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": process.env.REACT_APP_X_RAPID_API_KEY,
          "x-rapidapi-host": process.env.REACT_APP_X_RAPID_API_HOST
        }
      })
      const weatherData = await weatherResponse.json();
      const { list } = weatherData;
      setDays(list);
    };

    getWeatherByLocation();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h2>Weekly weather in {city}</h2>
        <Days data={days} country={country} />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;