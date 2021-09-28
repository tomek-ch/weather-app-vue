<template>
  <router-view
    @add-city="addCity"
    :cityNames="cityNames"
    :weatherData="weatherData"
  />
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import CityWeather from "./types/CityWeather";
import getCities from "./utils/getCities";
import getCity from "./utils/getCity";

export default defineComponent({
  setup() {
    {
      const localData = localStorage.getItem("cityNames");
      const cityNames = ref<string[]>(["London"]);
      cityNames.value = localData ? JSON.parse(localData) : [];

      watchEffect(() => {
        localStorage.setItem("cityNames", JSON.stringify(cityNames.value));
      });

      const weatherData = ref<CityWeather[]>([]);
      getCities(cityNames.value).then((data) => (weatherData.value = data));

      const addCity = async (
        name: string,
        handleError: (msg: string) => void
      ) => {
        const data = await getCity(name);
        const cityName = data?.name.toLowerCase();

        if (data && cityName && !cityNames.value.includes(cityName)) {
          cityNames.value.push(cityName);
          weatherData.value.push(data);
        } else if (!data) {
          handleError("Could not find that city");
        } else if (cityName) {
          handleError("City is already on the list");
        }
      };

      return { weatherData, addCity, cityNames };
    }
  },
});
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  max-width: 500px;
  margin: auto;
  padding: 2em;
}
</style>
