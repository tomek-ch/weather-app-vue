<template>
  <div class="container mx-auto p-4">
    <div class="d-flex justify-content-center" v-if="expectSignIn && !user">
      <div class="spinner-border mt-5 " role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <template v-else>
      <Header />
      <router-view
        @add-city="addCity"
        :cityList="cityList"
        :weatherData="weatherData"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import "./firebase";
import { ref, watchEffect } from "vue";
import CityWeather from "./types/CityWeather";
import getCities from "./utils/getCities";
import { getCityByName } from "./utils/getCity";
import Header from "./components/Header.vue";
import { expectSignIn, user } from "./auth/store";
import { addUserCity, getUserCities } from "./db";

const cityList = ref<number[]>([]);
const weatherData = ref<CityWeather[]>([]);

watchEffect(() => {
  if (user.value) {
    getUserCities(user.value.uid)
      .then((userCities) => (cityList.value = userCities))
      .then(async () => (weatherData.value = await getCities(cityList.value)))
      .catch(console.log);
  } else {
    cityList.value = [];
    weatherData.value = [];
  }
});

const addCity = async (name: string, handleError: (msg: string) => void) => {
  const data = await getCityByName(name);
  if (
    user.value &&
    data &&
    !weatherData.value.find(({ id }) => data.id === id)
  ) {
    addUserCity(user.value.uid, data.id);
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
