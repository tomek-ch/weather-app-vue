<template>
  <div class="container mx-auto p-4">
    <Header />
    <router-view
      @add-city="addCity"
      :cityList="cityList"
      :weatherData="weatherData"
    />
  </div>
</template>

<script setup lang="ts">
import "./firebase";
import { ref, watchEffect } from "vue";
import CityWeather from "./types/CityWeather";
import getCities from "./utils/getCities";
import { getCityByName } from "./utils/getCity";
import Header from "./components/Header.vue";

const localData = localStorage.getItem("cityList");
const cityList = ref<number[]>([]);
cityList.value = localData ? JSON.parse(localData) : [];

watchEffect(() => {
  localStorage.setItem("cityList", JSON.stringify(cityList.value));
});

const weatherData = ref<CityWeather[]>([]);
getCities(cityList.value).then((data) => (weatherData.value = data));

const addCity = async (name: string, handleError: (msg: string) => void) => {
  const data = await getCityByName(name);

  if (data && !weatherData.value.find(({ id }) => data.id === id)) {
    cityList.value.push(data.id);
    weatherData.value.push(data);
  } else if (!data) {
    handleError("Could not find that city");
  } else {
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
