import { formatDistance, subDays, fromUnixTime } from 'date-fns'
import { format } from 'date-fns'

import GetLocalWeather from './getWeatherData'


class RenderWeather {
  weatherData = new GetLocalWeather();

  getData () {
    const weatherResult = this.weatherData.weatherData();
    return weatherResult;
  }

  async render () {
    const weatherDataResult = await this.getData();
    // console.log(weatherDataResult.main.temp);
    this.renderCity(weatherDataResult);
    this.renderTemp(weatherDataResult);
    this.renderWind(weatherDataResult);
    this.renderIcon(weatherDataResult);
    this.renderDate(weatherDataResult);
  }

  renderCity (result) {
    const city = document.querySelector('.city');
    const weatherResultName = result.name;
    city.textContent = weatherResultName;
  }

  renderTemp (result) {
    const temp = document.querySelector('.temp');
    const tempResult =  result.main.temp;
    temp.innerHTML = Math.round(parseFloat(tempResult)-273.15) + '&deg;';
  }

  renderWind (result) {
    const wind = document.querySelector('.wind');
    const windSpeed = result.wind.speed;
    wind.innerHTML = 'wind: ' + windSpeed + ' km/h';
  }

  renderIcon (result) {
    const weatherIcon = document.querySelector('.wi-day-sunny');
    const icon = result.weather[0].icon;
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`;
  }

  renderDate (result) {
    const date = document.querySelector('.day');
    const dateResult = format(fromUnixTime(result.dt), 'EEEE d');
    date.textContent = dateResult;
  }
}

export default RenderWeather