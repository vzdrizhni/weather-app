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
    console.log(coords);
    console.log(latitude, longtitude);
    const key = '864ff7c45e1d04dd44cff07ac303aa2c';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=${key}`;

    return fetch(url, {
      method: 'GET'
    }).then( response => {
      return response.json();
    });
  }
}

export default GetLocalWeatherData
