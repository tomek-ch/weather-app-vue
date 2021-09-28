<template>
  <router-view @add-city="addCity" :cities="cities" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    {
      const cities = ref<string[]>(["London"]);

      const addCity = (city: string) => {
        cities.value = [city, ...cities.value];
      };

      return { cities, addCity };
    }
  },
});
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  max-width: 500px;
  margin: auto;
  padding: 2em;
}
</style>
