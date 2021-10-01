<template>
  <div>
    <form @submit.prevent="addCity" class="mb-3">
      <input
        v-model="input"
        class="form-control"
        placeholder="London"
        @input="handleError('')"
      />
      <button
        class="btn btn-primary"
        :disabled="
          !!weatherData.find(
            ({ name }) => name.toLocaleLowerCase() === input.toLocaleLowerCase()
          )
        "
      >
        Add city
      </button>
    </form>
    <Alert :msg="error" variant="warning" />
    <div class="list-group">
      <CityItem
        v-for="city in weatherData"
        :key="city.id"
        :city="city"
        @delete-city="deleteCity"
      />
    </div>
    <Spinner v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import Alert from "@/components/Alert.vue";
import CityItem from "@/components/CityItem.vue";
import useError from "@/composables/useError";
import usePrivateRoute from "@/composables/usePrivateRoute";
import CityWeather from "@/types/CityWeather";
import { ref, watchEffect } from "vue";
import { user } from "@/auth/store";
import { addUserCity, deleteUserCity, getUserCities } from "@/db";
import getCities from "@/utils/getCities";
import { getCityByName } from "@/utils/getCity";
import Spinner from "@/components/Spinner.vue";

const input = ref("");
const { error, handleError } = useError();
const cityList = ref<number[]>([]);
const weatherData = ref<CityWeather[]>([]);
const isLoading = ref(true);

// Sync the list of user's cities
watchEffect(() => {
  if (user.value) {
    getUserCities(user.value.uid)
      .then((userCities) => (cityList.value = userCities))
      .then(async () => (weatherData.value = await getCities(cityList.value)))
      .then(() => (isLoading.value = false))
      .catch(console.log);
  } else {
    cityList.value = [];
    weatherData.value = [];
  }
});

const addCity = async () => {
  const data = await getCityByName(input.value);
  if (
    user.value &&
    data &&
    !weatherData.value.find(({ id }) => data.id === id)
  ) {
    addUserCity(user.value.uid, data.id);
    cityList.value.push(data.id);
    weatherData.value.push(data);
    input.value = "";
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

usePrivateRoute();
</script>

<style scoped>
form {
  display: flex;
  gap: 0.5em;
}

button {
  white-space: nowrap;
}
</style>
