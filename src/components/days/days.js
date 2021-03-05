// thanks https://www.abeautifulsite.net/posts/getting-localized-month-and-day-names-in-the-browser/

function getDayNames(locale = 'en', format = 'long') {
    const formatter = new Intl.DateTimeFormat(locale, { weekday: format, timeZone: 'UTC' });
    const days = [1, 2, 3, 4, 5, 6, 7].map(day => {
      const dd = day < 10 ? `0${day}` : day;
      return new Date(`2017-01-${dd}T00:00:00+00:00`);
    });
    return days.map(date => formatter.format(date));
  }



export default ({ data, country }) => {
    const dayNames = getDayNames(country);
    const todayDay = new Date().getDay();
    return <ul>{data.map((d, index) => {
        const { temp: { min, max}} = d;
        return <li>
            <div><h3>{dayNames[(todayDay + index) % 7]}</h3></div>
            <div>
                min: {parseInt(min)} max: {parseInt(max)}
            </div>

        </li>
    })}
    </ul>
}