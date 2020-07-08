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
    const switchWeather = document.querySelector('.btn-group')
    const temp = document.querySelector('.temp');

    this.renderCity(weatherDataResult);
    temp.innerHTML = this.renderTempCel(weatherDataResult);
    this.renderWind(weatherDataResult);
    this.renderIcon(weatherDataResult);
    this.renderDate(weatherDataResult);

    switchWeather.addEventListener('click', event => {
      if (event.target.classList.contains('celcius')) {
        temp.innerHTML = this.renderTempCel(weatherDataResult);
      } else if (event.target.classList.contains('fahrenheit')) {
        temp.innerHTML = this.renderTempFah(weatherDataResult);
      }
    })
  }

  renderCity (result) {
    const city = document.querySelector('.city');
    const weatherResultName = result.name;
    city.textContent = weatherResultName;
  }

  renderTempCel (result) {
    // const temp = document.querySelector('.temp');
    const tempResult =  result.main.temp;
    const temp = Math.round(parseFloat(tempResult)-273.15) + 'C' + '&deg;';
    return temp;
  }

  renderTempFah (result) {
    const tempResult =  result.main.temp;
    const temp = Math.round(((parseFloat(tempResult)-273.15)*1.8)+32) + 'F' + '&deg;';
    return temp;
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