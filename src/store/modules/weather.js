import axios from "axios";
export default {
  actions: {
    async getWeather(payload) {
      const apiKey = process.env.VUE_APP_WEATHER;
      const weather = await axios.get(
        `https://api.weatherbit.io/v2.0/forecast/daily?city=Barnaul,RU&key=${apiKey}&days=8&lang=ru`
      );
      payload = weather.data.data;
      return payload;
    }
  }
};
