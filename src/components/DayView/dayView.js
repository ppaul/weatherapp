import "./dayView.scss";

const DayView = ({ unit, details, setSelectedDay }) => {
    const unitType = unit === "metric" ? "°C" : "°F";
    return (
        <>
            <div onClick={() => setSelectedDay(null)}>←</div>
            <ul className="hoursList">
                {details &&
                    details.map((d, index) => {
                        const {
                            main: { temp, feels_like },
                            weather,
                            dt_txt
                        } = d;
                        const icon = weather && weather[0].icon;
                        const hour = dt_txt.split(" ")[1].substr(0, 5);
                        return (
                            <li className="hour" key={index.toString()}>
                                <div>{hour}</div>
                                <h2>{`${parseInt(temp)}${unitType}`}</h2>
                                <div>
                                    {`feels ${parseInt(feels_like)}${unitType}`}
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
        </>
    );
};

export default DayView;
