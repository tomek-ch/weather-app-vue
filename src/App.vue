<template>
  <div class="container mx-auto p-4">
    <Spinner v-if="expectSignIn && !user" />
    <template v-else>
      <Header />
      <router-view
        @add-city="addCity"
        @delete-city="deleteCity"
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
import { addUserCity, deleteUserCity, getUserCities } from "./db";
import Spinner from "./components/Spinner.vue";

const cityList = ref<number[]>([]);
const weatherData = ref<CityWeather[]>([]);

// Sync the list of user's cities
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

const deleteCity = (cityId: number) => {
  if (user.value) {
    deleteUserCity(user.value.uid, cityId);
    weatherData.value = weatherData.value.filter(({ id }) => id !== cityId);
    cityList.value = cityList.value.filter((id) => id !== cityId);
  }
};
</script>

<style>
.container {
  max-width: 500px;
}
</style>
