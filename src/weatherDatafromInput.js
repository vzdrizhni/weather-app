import RenderWeather from './render';

class DataFromInput {
  async weatherData(value) { // eslint-disable-line class-methods-use-this
    const key = '864ff7c45e1d04dd44cff07ac303aa2c';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${key}`;

    return fetch(url, {
      method: 'GET',
    }).then(response => response.json());
  }

  formData() {
    const form = document.querySelector('form');

    form.addEventListener('submit', event => {
      event.preventDefault();

      const input = document.querySelector('.form-control').value;
      const data = this.weatherData(input);
      const render = new RenderWeather();
      render.render(data);
      document.querySelector('.form-control').value = '';
    });
  }
}

export default DataFromInput;