import axios from "axios";
export default {
  actions: {
    async getWeather(payload) {
      const apiKey = "512e30e025fa482f9f1e38ad33f6eb3a";
      const weather = await axios.get(
        `https://api.weatherbit.io/v2.0/forecast/daily?city=Barnaul,RU&key=${apiKey}&days=8&lang=ru`
      );
      payload = weather.data.data;
      return payload;
    }
  }
};
