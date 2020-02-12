<template>
  <v-card-text class="weather">
    <v-container>
      <Preloader v-if="preloader" />
      <v-row v-else>
        <v-col cols="12" md="4" class="mt-md-10" v-if="show">
          <v-card max-width="344" class="mx-auto">
            <div class="pt-4 mb-12 text-center">
              <span class="headline">
                {{ firstWeatherChild.weather.description }}
              </span>
            </div>
            <v-img
              :src="
                require(`@/assets/weather/${
                  icons[`${firstWeatherChild.weather.code}`]
                }.svg`)
              "
              aspect-ratio="1.6"
              width="150px"
              height="150px"
              class="mx-auto"
            ></v-img>

            <v-card-text class="d-flex justify-space-between mt-6">
              <div class="temperature">
                <p class="current">
                  {{ Math.round(firstWeatherChild.temp) }} <sup>°C</sup>
                </p>
              </div>
              <div class="details">
                <span class="date">
                  {{
                    new Date(firstWeatherChild.datetime).toLocaleDateString(
                      "ru",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      }
                    )
                  }}
                </span>
                <div class="aqua mt-3">
                  <div class="d-flex justify-space-between flex-column">
                    <div class="max-min d-flex justify-space-between mt-2">
                      <div class="max">
                        <v-icon>mdi-thermometer-high</v-icon>
                        {{ Math.round(firstWeatherChild.max_temp) }}
                      </div>
                      <div class="min">
                        <v-icon>mdi-thermometer-low</v-icon>
                        {{ Math.round(firstWeatherChild.min_temp) }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4" class="mt-md-10" v-else>
          <v-card max-width="344" class="mx-auto">
            <div class="pt-4 mb-12 text-center">
              <span class="headline">
                {{ weatherInCard }}
              </span>
            </div>
            <v-img
              :src="require(`@/assets/weather/${icons[`${icon}`]}.svg`)"
              aspect-ratio="1.6"
              width="150px"
              height="150px"
              class="mx-auto"
            ></v-img>

            <v-card-text class="d-flex justify-space-between mt-6">
              <div class="temperature">
                <p class="current">{{ temp }} <sup>°C</sup></p>
              </div>
              <div class="details">
                <span class="date">
                  {{
                    new Date(dateInCard).toLocaleDateString("ru", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })
                  }}
                </span>
                <div class="aqua mt-3">
                  <div class="d-flex justify-space-between flex-column">
                    <div class="max-min d-flex justify-space-between mt-2">
                      <div class="max">
                        <v-icon>mdi-thermometer-high</v-icon>
                        {{ max_temp }}
                      </div>
                      <div class="min">
                        <v-icon>mdi-thermometer-low</v-icon>
                        {{ min_temp }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="8">
          <v-row>
            <v-col
              cols="6"
              md="3"
              v-for="(weather, i) in weatherArray"
              :key="i"
            >
              <v-card
                max-width="200px"
                class="mx-auto"
                color="amber lighten-3"
                @click="logMe(weather)"
              >
                <v-card-text class="black--text text-center">
                  <span class="phone-text">
                    {{
                      new Date(weather.datetime).toLocaleDateString("ru", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })
                    }}
                  </span></v-card-text
                >
                <v-img
                  aspect-ratio="1.5"
                  width="90px"
                  class="mx-auto"
                  :src="
                    require(`@/assets/weather/${
                      icons[`${weather.weather.code}`]
                    }.svg`)
                  "
                ></v-img>
                <v-card-text
                  class="text-center black--text d-flex justify-space-around"
                >
                  <div class="max">
                    <v-icon color="black">mdi-thermometer-high</v-icon>
                    {{ Math.round(weather.max_temp) }}
                  </div>
                  <div class="min">
                    <v-icon color="black">mdi-thermometer-low</v-icon>
                    {{ Math.round(weather.min_temp) }}
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6"> </v-col>
      </v-row>
    </v-container>
  </v-card-text>
</template>

<script>
export default {
  data() {
    return {
      weatherArray: [],
      max_temp: "",
      min_temp: "",
      temp: "",
      wind: "",
      weatherInCard: "",
      dateInCard: "",
      icon: 200,
      icons: {
        "200": "thunder",
        "201": "thunder",
        "202": "thunder",
        "230": "thunder",
        "231": "thunder",
        "232": "thunder",
        "233": "thunder",
        "300": "rainy-7",
        "301": "rainy-7",
        "302": "rainy-7",
        "500": "rainy-6",
        "501": "rainy-6",
        "502": "rainy-6",
        "511": "rainy-6",
        "520": "rainy-6",
        "521": "rainy-1",
        "522": "rainy-6",
        "600": "snowy-2",
        "601": "snowy-6",
        "602": "snowy-6",
        "610": "snowy-2",
        "611": "cloudy",
        "612": "cloudy",
        "621": "snowy-3",
        "622": "snowy-7",
        "623": "snowy-4",
        "700": "cloudy-day-2",
        "711": "cloudy-day-2",
        "721": "cloudy-day-2",
        "731": "cloudy-day-2",
        "741": "cloudy-day-2",
        "751": "cloudy-day-2",
        "800": "day",
        "801": "cloudy-day-3",
        "802": "cloudy-day-2",
        "803": "cloudy-day-2",
        "804": "cloudy",
        "900": "rainy-6"
      },
      show: true,
      preloader: true
    };
  },
  computed: {
    firstWeatherChild() {
      return this.weatherArray[0];
    }
  },
  methods: {
    logMe(weather) {
      this.max_temp = Math.round(weather.max_temp);
      this.min_temp = Math.round(weather.min_temp);
      this.temp = Math.round(weather.temp);
      this.wind = weather.wind_cdir_full;
      this.weatherInCard = weather.weather.description;
      this.dateInCard = weather.datetime;
      this.icon = weather.weather.code;
      this.show = false;
      this.$vuetify.goTo(0, {
        duration: 900,
        offset: 0,
        easing: "easeInOutCubic"
      });
    }
  },
  async mounted() {
    this.weatherArray = await this.$store.dispatch("getWeather");
    this.preloader = false;
  }
};
</script>

<style lang="scss" scoped>
.weather {
  .temperature {
    color: #fff;
    .current {
      margin-top: 20px;
      font-size: 54px;
      font-weight: bold;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        width: 27px;
        height: 7px;
        background: #fff;
        top: -25px;
        left: 0;
      }
      sup {
        font-size: 24px;
        margin-left: -10px;
      }
    }
    .max-min {
      font-weight: 300;
      margin-bottom: 0;
    }
  }
  .details {
    color: #fff;
    p {
      margin: 0;
    }
    .date {
      position: relative;
      font-size: 18px;
      font-weight: bold;
      padding-bottom: 8px;
      margin-bottom: 8px;

      &::after {
        content: "";
        height: 2px;
        width: 100%;
        background: #fff;
        position: absolute;
        bottom: 3px;
        left: 0;
      }
    }
  }
}

.phone-text {
  font-size: 18px;
  font-weight: bold;

  @media (max-width: 556px) {
    .phone-text {
      font-size: 14px;
    }
  }
}
</style>
