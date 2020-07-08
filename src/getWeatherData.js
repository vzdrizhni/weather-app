import { data } from "jquery";

class GetLocalWeatherData {
  getPosition = () => {
    const promise = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((success) => {
        resolve(success);
      });
    });
    return promise;
  };

  async weatherData() {
    const coords = await this.getPosition();
    const latitude = coords.coords.latitude;
    const longtitude = coords.coords.longitude;
    const key = '864ff7c45e1d04dd44cff07ac303aa2c';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=${key}`;

    return fetch(url, {
      method: 'GET'
    }).then( response => {
      return response.json();
    });
  }

  async getGif(value) {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const key = 'Gt9FodsxBnAnMnrSFQKP8ANKF6YtdeuQ';
    const url = `${proxy}https://api.giphy.com/v1/gifs/search?q=${value}&api_key=${key}`;

    return fetch(url, {
      method: 'GET'
    }).then( response => {
      return response.json();
    }).then (content => {
      const result = content.data[Math.floor(Math.random() * data.length)].images.original.url;
      return result;
    });
  }
}

export default GetLocalWeatherData
