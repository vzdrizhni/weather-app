import {
  fromUnixTime, format,
} from 'date-fns';

import GetLocalWeather from './getWeatherData';


class RenderWeather {
  weatherData = new GetLocalWeather();

  getData() {
    const weatherResult = this.weatherData.weatherData();
    return weatherResult;
  }

  async render(parameter) {
    const weatherDataResult = await parameter;

    const switchWeather = document.querySelector('.btn-group');
    const temp = document.querySelector('.temp');
    const gif = await this.weatherData.getGif(weatherDataResult.weather[0].description);
    const countryGif = await this.weatherData.getGif(weatherDataResult.sys.country);

    const cont = document.querySelector('.container');
    const country = document.querySelector('.current');

    cont.style.background = `url('${gif}')`;
    country.style.background = `url('${countryGif}')`;

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
    });
  }

  renderCity(result) { // eslint-disable-line class-methods-use-this
    const city = document.querySelector('.city');
    const weatherResultName = result.name;
    city.textContent = weatherResultName;
  }

  renderTempCel(result) { // eslint-disable-line class-methods-use-this
    const tempResult = result.main.temp;
    const temp = `${Math.round(parseFloat(tempResult) - 273.15)}C` + '&deg;'; // eslint-disable-line no-useless-concat
    return temp;
  }

  renderTempFah(result) { // eslint-disable-line class-methods-use-this
    const tempResult = result.main.temp;
    const temp = `${Math.round(((parseFloat(tempResult) - 273.15) * 1.8) + 32)}F` + '&deg;'; // eslint-disable-line no-useless-concat
    return temp;
  }

  renderWind(result) { // eslint-disable-line class-methods-use-this
    const wind = document.querySelector('.wind');
    const windSpeed = result.wind.speed;
    wind.innerHTML = `wind: ${windSpeed} km/h`;
  }

  renderIcon(result) { // eslint-disable-line class-methods-use-this
    const weatherIcon = document.querySelector('.wi-day-sunny');
    const { icon } = result.weather[0];
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`;
  }

  renderDate(result) { // eslint-disable-line class-methods-use-this
    const date = document.querySelector('.day');
    const dateResult = format(fromUnixTime(result.dt), 'EEEE d MMM');
    date.textContent = dateResult;
  }
}

export default RenderWeather;