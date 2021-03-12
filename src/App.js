import WeekView from "./components/WeekView";
import { useState, useEffect } from "react";
import DayView from "./components/DayView";

function App() {
    const [days, setDays] = useState([]);
    const [country, setCountry] = useState("en");
    const [city, setCity] = useState("");
    const [unit, setUnit] = useState("metric");
    const [selectedDay, setSelectedDay] = useState(null);

    useEffect(() => {
        async function getWeatherByLocation() {
            const geoLocationResponse = await fetch(
                `https://api.getgeoapi.com/api/v2/ip/check?api_key=${process.env.REACT_APP_X_IPGEOLOCATION_APP_KEY}`
            );

            const geoLocation = await geoLocationResponse.json();

            const {
                city: { name: city },
                country: { code }
            } = geoLocation;

            setCountry(code);
            let unit = "metric";
            if (code === "US" || code === "LR" || code === "MM") {
                unit = "imperial";
            }

            const weatherResponse = await fetch(
                `https://community-open-weather-map.p.rapidapi.com/forecast/daily?q=${city}&units=${unit}`,
                {
                    method: "GET",
                    headers: {
                        "x-rapidapi-key": process.env.REACT_APP_X_RAPID_API_KEY,
                        "x-rapidapi-host":
                            process.env.REACT_APP_X_RAPID_API_HOST
                    }
                }
            );

            const weatherData = await weatherResponse.json();
            const { list } = weatherData;
            const first5Days = list.slice(0, 5);
            setDays(first5Days);
            setUnit(unit);
            setCity(city);

            const daysDetailsResponse = await fetch(
                `https://community-open-weather-map.p.rapidapi.com/forecast?q=${city}&units=${unit}`,
                {
                    method: "GET",
                    headers: {
                        "x-rapidapi-key": process.env.REACT_APP_X_RAPID_API_KEY,
                        "x-rapidapi-host":
                            process.env.REACT_APP_X_RAPID_API_HOST
                    }
                }
            );

            const daysDetailsData = await daysDetailsResponse.json();

            const hourDetails = daysDetailsData.list;

            let i = 0;
            let k = 0;
            let date, hourDetailDate;
            do {
                date = new Date(first5Days[k].dt * 1000).getDate();
                hourDetailDate = new Date(hourDetails[i].dt * 1000).getDate();
                if (date === hourDetailDate) {
                    first5Days[k].hours = first5Days[k].hours
                        ? [...first5Days[k].hours, hourDetails[i]]
                        : [hourDetails[i]];

                    i = i + 1;
                } else {
                    k = k + 1;
                }
            } while (i < hourDetails.length && k < first5Days.length);
            setDays(first5Days);
        }

        getWeatherByLocation();
    }, []);

    // todo identify city
    return (
        <div className="App">
            <header className="App-header">
                {!selectedDay && city ? (
                    <h2>Weekly weather in {city}</h2>
                ) : (
                    <h2>Day</h2>
                )}
                {!selectedDay ? (
                    <WeekView
                        data={days}
                        country={country}
                        unit={unit}
                        setSelectedDay={setSelectedDay}
                    />
                ) : (
                    <DayView
                        details={days[selectedDay].hours}
                        unit={unit}
                        setSelectedDay={setSelectedDay}
                    />
                )}
            </header>
        </div>
    );
}

export default App;
