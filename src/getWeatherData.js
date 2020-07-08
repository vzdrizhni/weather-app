import { data } from 'jquery';

class GetLocalWeatherData {
  getPosition = () => {
    const promise = new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition((success) => {
        resolve(success);
      });
    });
    return promise;
  };

  async weatherData() {
    const coords = await this.getPosition();
    const { latitude } = coords.coords;
    const longtitude = coords.coords.longitude;
    const key = '864ff7c45e1d04dd44cff07ac303aa2c';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=${key}`;

    return fetch(url, {
      method: 'GET',
    }).then(response => response.json());
  }

  async getGif(value) { // eslint-disable-line class-methods-use-this
    const key = 'Gt9FodsxBnAnMnrSFQKP8ANKF6YtdeuQ';
    const url = `https://api.giphy.com/v1/gifs/search?q=${value}&api_key=${key}`;

    return fetch(url, {
      method: 'GET',
    }).then(response => response.json()).then(content => {
      const result = content.data[Math.floor(Math.random() * data.length)].images.original.url;
      return result;
    });
  }
}

export default GetLocalWeatherData;
