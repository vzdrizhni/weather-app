import 'bootstrap';
import './scss/app.scss';
import GetLocalWeatherData from './getWeatherData'
import RenderWeather from './render'

const weather = new RenderWeather();
// console.log(weather.weatherData());
weather.render();

