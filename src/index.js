import 'bootstrap';
import './scss/app.scss';
import RenderWeather from './render';
import DataFromInput from './weatherDatafromInput';

const weather = new RenderWeather();
const input = new DataFromInput();
weather.render(weather.getData());
input.formData();
