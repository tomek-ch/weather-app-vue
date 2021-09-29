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

<script lang="ts">
import CityWeather from "@/types/CityWeather";
import getCity from "@/utils/getCity";
import { computed, defineComponent, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import Chart from "@/components/Chart.vue";
import getTime from "@/utils/getTime";

export default defineComponent({
  components: { Chart },
  setup() {
    const route = useRoute();
    const city = ref<CityWeather | null>(null);

    watchEffect(async () => {
      if (route.params.name) {
        const data = await getCity(route.params.name as string);
        if (data) {
          city.value = data;
        }
      }
    });

    const getChartData = (key: "humidity" | "temperature") =>
      computed(
        () =>
          city.value?.forecast.map((item) => ({
            value: Math.round(item[key]),
            label: getTime(item.dt, city.value?.timezone as number),
          })) || []
      );

    return {
      city,
      tempData: getChartData("temperature"),
      humidityData: getChartData("humidity"),
    };
  },
});
</script>

<style scoped>
img {
  filter: drop-shadow(0px 0px 5px darkgray);
}
</style>
