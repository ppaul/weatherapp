// thanks https://www.abeautifulsite.net/posts/getting-localized-month-and-day-names-in-the-browser/

import "./days.scss";
import { UnitsContext } from '../../App';
import { useContext } from 'react';


function getDayNames(locale = 'en', format = 'long') {
    const formatter = new Intl.DateTimeFormat(locale, { weekday: format, timeZone: 'UTC' });
    const days = [1, 2, 3, 4, 5, 6, 7].map(day => {
      const dd = day < 10 ? `0${day}` : day;
      return new Date(`2017-01-${dd}T00:00:00+00:00`);
    });
    return days.map(date => formatter.format(date));
  }



export default ({ data, country, unit }) => {
    const dayNames = getDayNames(country);
    const todayDay = new Date().getDay();
    const unitType = unit === 'metric' ? '°C' : '°F';

    return <ul>
        {data.map((d, index) => {
            const { temp: { min, max }, weather } = d;
            const icon = weather && weather[0].icon;
            return <li className="day" key={index.toString()}>
                <div>
                    <h3>{dayNames[(todayDay + index) % 7]}</h3>
                    {icon && <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`}/>}
                </div>
                <div>
                    ↓ {`${parseInt(min)}${unitType} ↑ ${parseInt(max)}${unitType}`}
                </div>

            </li>
        })}
    </ul>
}