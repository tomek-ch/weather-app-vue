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

      const addCity = async (name: string) => {
        const data = await getCity(name);

        if (data) {
          cityNames.value.push(name);
          weatherData.value.push(data);
        } else {
          console.log("no city");
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
