import React, { useEffect, useState } from 'react'; 
import './App.css';
import Navbar from './Components/Navbar';
import Mainweather from './Components/Mainweather';
import axios from 'axios';
import TodayHighlights from './Components/TodayHighlights';
import FiveDayForecast from './Components/Fiveday';

const App = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('London'); 
    const [airQualityData, setAirQualityData] = useState(null);
    const [fiveDayForecast, setFiveDayForecast] = useState(null);

    useEffect(() => {
        fetchWeatherData(city);
    }, [city]);

    const fetchAirQualityData = (lat, lon) => {
        const API_KEY = 'c49266ca7dd4ad3b42a5a145fde92790';
        axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
            .then(response => {
                setAirQualityData(response.data.list[0]);
            })
            .catch(error => console.error('Error fetching the air quality data:', error));
    };

    const fetchFiveDayForecast = (lat, lon) => {
        const API_KEY = 'c49266ca7dd4ad3b42a5a145fde92790';
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
            .then(response => {
                setFiveDayForecast(response.data);
            })
            .catch(error => console.error('Error fetching five-day forecast data:', error));
    };

    const fetchWeatherData = (city) => {
        const API_KEY = 'c49266ca7dd4ad3b42a5a145fde92790';
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                setWeatherData(data);
                console.log(JSON.stringify(data));
                fetchAirQualityData(data.coord.lat, data.coord.lon);
                fetchFiveDayForecast(data.coord.lat, data.coord.lon);
            })
            .catch(error => console.error('Error fetching weather data:', error)); 
    };

    const handleSearch = (searchCity) => {
        setCity(searchCity); 
    };

    return (
        <>
            <Navbar onSearch={handleSearch} />
            {weatherData && airQualityData && (
                <div style={{ display: 'flex', padding: '30px', gap: '20px' }}>
                    <div style={{ flex: '1', marginRight: '10px' }}>
                        <Mainweather weatherData={weatherData} />
                        <p style={{ fontWeight: '700', fontSize: '20px', marginTop: '20px' }}> Forecast </p>
                        {fiveDayForecast && <FiveDayForecast forecastData={fiveDayForecast} />}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', flex: '0.5', gap: '20px' }}>
                        <TodayHighlights weatherData={weatherData} airQualityData={airQualityData} />
                    </div>
                </div>
            )}
        </>
    );
}

export default App;
