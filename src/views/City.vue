<template>
  <div v-if="city">
    <h1>{{ city.name }}</h1>
    <div>{{ city.temperature }}°C</div>
    <div>Humidity: {{ city.humidity }}%</div>
    <img :src="city.icon" />
  </div>
</template>

<script lang="ts">
import getCity from "@/utils/getCity";
import { defineComponent, ref, watch, watchEffect } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    const city = ref();

    watchEffect(async () => {
      city.value = await getCity(route.params.name.toString());
    });

    return { city };
  },
});
</script>
