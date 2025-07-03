import { useState, useEffect } from "react";
import axios from "axios";

const Search = ({ handleSearch }) => {
  return (
    <>
      find countries <input onChange={handleSearch} />
    </>
  );
};
const Details = ({ targetCountry }) => {
  const apiKey = import.meta.env.VITE_SOME_KEY;
  const [lat, lon] = targetCountry.latlng || [0, 0];
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!lat || !lon) return;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKey}`
      )
      .then(response => setWeather(response.data));
  }, [lat, lon, apiKey]);

  return (
    <div>
      <h1>{targetCountry.name.common}</h1>
      Capital {targetCountry.capital} <br />
      Area {targetCountry.area} <br />
      <h2>Languages</h2>
      <ul>
        {targetCountry.languages ? (
          Object.values(targetCountry.languages).map(l => <li key={l}>{l}</li>)
        ) : (
          <li>No languages listed</li>
        )}
      </ul>
      <img
        src={targetCountry.flags.png}
        alt={`Flag of ${targetCountry.name.common}`}
      />
      <h2>{`Weather in ${targetCountry.capital}`}</h2>
      {weather ? (
        <div>
          <div>Temperature {weather.main.temp} Celsius</div>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <div>Wind {weather.wind.speed} m/s</div>
        </div>
      ) : (
        <div>Loading weather...</div>
      )}
    </div>
  );
};
const Results = ({ countries, country }) => {
  const [shownCountry, setShownCountry] = useState(null);

  useEffect(() => {
    setShownCountry(null);
  }, [country]);

  const filtered = countries
    .map(c => c.name.common)
    .filter(cn => cn.toLowerCase().includes(country.toLowerCase().trim()));

  if (shownCountry) {
    const targetCountry = countries.find(c => c.name.common === shownCountry);
    return <Details targetCountry={targetCountry} />;
  }

  switch (true) {
    case filtered.length > 10:
      return <div>Too many matches, specify another filter</div>;
    case filtered.length > 1 && filtered.length <= 10:
      return (
        <div>
          {filtered.map(cn => (
            <div key={cn}>
              {cn} <button onClick={() => setShownCountry(cn)}>Show</button>
            </div>
          ))}
        </div>
      );
    case filtered.length === 1:
      const singleCountry = countries.find(c => c.name.common === filtered[0]);
      return <Details targetCountry={singleCountry} />;

    default:
      return <div>No countries matched.</div>;
  }
};
function App() {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountries(response.data);
      });
  }, []);

  const handleSearch = e => {
    setCountry(e.target.value);
  };

  return (
    <div>
      <Search handleSearch={handleSearch} />
      {country.trim() !== "" && (
        <Results countries={countries} country={country} />
      )}
    </div>
  );
}

export default App;
