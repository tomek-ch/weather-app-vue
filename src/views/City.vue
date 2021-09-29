<template>
  <div v-if="city">
    <div class="d-flex justify-content-between mb-5">
      <div>
        <h1>{{ city.name }}</h1>
        <div>{{ city.temperature }}°C</div>
        <div>Humidity: {{ city.humidity }}%</div>
      </div>
      <img :src="city.icon" />
    </div>
    <h3 class="mb-5">Temperature</h3>
    <Chart :data="tempData" unit="°C" color="#fd7e14" />
    <h3 class="my-5">Humidity</h3>
    <Chart :data="humidityData" unit="%" color="#007bff" />
  </div>
</template>

<script setup lang="ts">
import CityWeather from "@/types/CityWeather";
import { getCityByName } from "@/utils/getCity";
import { computed, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import Chart from "@/components/Chart.vue";
import getTime from "@/utils/getTime";

const route = useRoute();
const city = ref<CityWeather | null>(null);

watchEffect(async () => {
  if (route.params.name) {
    const data = await getCityByName(route.params.name as string);
    if (data) {
      city.value = data;
    }
  }
});

enum Key {
  hum = "humidity",
  temp = "temperature",
}

const getChartData = (key: Key) =>
  computed(
    () =>
      city.value?.forecast.map((item) => ({
        value: Math.round(item[key]),
        label: getTime(item.timestamp, city.value?.timezone as number),
      })) || []
  );

const tempData = getChartData(Key.temp);
const humidityData = getChartData(Key.hum);
</script>

<style scoped>
img {
  filter: drop-shadow(0px 0px 5px darkgray);
}
</style>
