<template>
  <div>
    <form @submit="handleSubmit">
      <input v-model="input" class="form-control" placeholder="London" />
      <button class="btn btn-primary" :disabled="cityNames.includes(input)">
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
import { defineComponent, ref, PropType } from "vue";
import CityWeather from "@/types/CityWeather";

export default defineComponent({
  name: "Home",
  props: {
    cityNames: { type: Array as PropType<Array<string>>, required: true },
    weatherData: {
      type: Array as PropType<Array<CityWeather>>,
      required: true,
    },
  },
  emits: ["add-city"],
  setup(_props, context) {
    const input = ref("");

    const handleSubmit = (e: Event) => {
      e.preventDefault();
      context.emit("add-city", input.value);
      input.value = "";
    };

    return { input, handleSubmit };
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
