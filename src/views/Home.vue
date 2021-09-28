<template>
  <div>
    <form @submit="handleSubmit">
      <input v-model="input" class="form-control" />
      <button class="btn btn-primary" :disabled="cities.includes(input)">
        Add city
      </button>
    </form>
    <div v-for="city in weatherData" :key="city">
      <div>{{ city.name }}</div>
      <div>{{ city.temperature }}°C</div>
      <div>Humidity: {{ city.humidity }}%</div>
      <img :src="city.icon" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watchEffect } from "vue";
import getCities from "@/utils/getCities";
import CityWeather from "@/types/CityWeather";

export default defineComponent({
  name: "Home",
  props: { cities: { type: [] as PropType<Array<string>>, required: true } },
  emits: ["add-city"],
  setup(props, context) {
    const input = ref("");

    const handleSubmit = (e: Event) => {
      e.preventDefault();
      context.emit("add-city", input.value);
      input.value = "";
    };

    const weatherData = ref<CityWeather[]>([]);
    watchEffect(
      async () => (weatherData.value = await getCities(props.cities))
    );
    return { input, handleSubmit, weatherData };
  },
});
</script>

<style scoped>
form {
  display: flex;
  gap: 0.5em;
}

button {
  white-space: nowrap;
}

img {
  filter: drop-shadow(0px 0px 5px darkgray);
}
</style>
