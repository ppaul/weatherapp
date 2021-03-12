// thanks https://www.abeautifulsite.net/posts/getting-localized-month-and-day-names-in-the-browser/

import "./weekView.scss";

function getDayNames(locale = "en", format = "long") {
    const formatter = new Intl.DateTimeFormat(locale, {
        weekday: format,
        timeZone: "UTC"
    });
    const days = [1, 2, 3, 4, 5, 6, 7].map((day) => {
        const dd = day < 10 ? `0${day}` : day;
        return new Date(`2017-01-${dd}T00:00:00+00:00`);
    });
    return days.map((date) => formatter.format(date));
}

const WeekView = ({ data, country, setSelectedDay, unit }) => {
    const dayNames = getDayNames(country);
    const todayDay = new Date().getDay();
    const unitType = unit === "metric" ? "°C" : "°F";

    return (
        <ul>
            {data.map((d, index) => {
                const {
                    temp: { min, max },
                    weather
                } = d;
                const icon = weather && weather[0].icon;
                return (
                    <li
                        className="day"
                        onClick={() => setSelectedDay(index + 1)}
                        key={index.toString()}
                    >
                        <h3 className="name">
                            {dayNames[(todayDay + index) % 7].substr(0, 3)}
                        </h3>
                        <div>
                            ↓{" "}
                            {`${Math.round(min)}${unitType} ↑ ${Math.round(
                                max
                            )}${unitType}`}
                        </div>
                        {icon && (
                            <img
                                src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                                alt="icon"
                            />
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

export default WeekView;
