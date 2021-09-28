<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const getWeather = async (location: string) => {
      const url = "https://api.openweathermap.org/data/2.5/forecast";
      const key = "77507ca00606a30af83452d6251687da";
      const units = "metric";
      const endpoint = `${url}?q=${location}&appid=${key}&units=${units}`;

      try {
        const response = await fetch(endpoint);
        if (response.ok) {
          return await response.json();
        }
      } catch (e) {
        console.log(e);
      }
    };

    return { getWeather };
  },
});
</script>
