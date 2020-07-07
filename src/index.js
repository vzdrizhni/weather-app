import 'bootstrap';
import './scss/app.scss';
import GetLocalWeatherData from './getWeatherData'

const weather = new GetLocalWeatherData();
weather.weatherData();
