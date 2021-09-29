<template>
  <div class="container mx-auto p-4">
    <Header />
    <router-view
      @add-city="addCity"
      :cityNames="cityNames"
      :weatherData="weatherData"
    />
  </div>
</template>

<script setup lang="ts">
import "./firebase";
import { ref, watchEffect } from "vue";
import CityWeather from "./types/CityWeather";
import getCities from "./utils/getCities";
import getCity from "./utils/getCity";
import Header from "./components/Header.vue";

const localData = localStorage.getItem("cityNames");
const cityNames = ref<string[]>(["London"]);
cityNames.value = localData ? JSON.parse(localData) : [];

watchEffect(() => {
  localStorage.setItem("cityNames", JSON.stringify(cityNames.value));
});

const weatherData = ref<CityWeather[]>([]);
getCities(cityNames.value).then((data) => (weatherData.value = data));

const addCity = async (name: string, handleError: (msg: string) => void) => {
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
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 500px;
}
</style>
