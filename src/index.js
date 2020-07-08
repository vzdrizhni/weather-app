import 'bootstrap';
import './scss/app.scss';
import GetLocalWeatherData from './getWeatherData'
import RenderWeather from './render'
import DataFromInput from './weatherDatafromInput'

const weather = new RenderWeather();
const input = new DataFromInput();
// console.log(weather.weatherData());
weather.render(weather.getData());
input.formData();

