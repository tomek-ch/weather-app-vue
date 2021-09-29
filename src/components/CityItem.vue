<template>
  <router-link
    :to="`/city/${city.name}`"
    class="list-group-item list-group-item-action d-flex justify-content-between mb-3 align-items-center"
  >
    <div>
      <h5 class="mb-1">{{ city.name }}</h5>
      <div>{{ city.temperature }}°C</div>
      <div>Humidity: {{ city.humidity }}%</div>
    </div>
    <img :src="city.icon" />
  </router-link>
</template>

<script setup lang="ts">
defineProps({
  city: { type: Object },
});
</script>

<style scoped>
img {
  filter: drop-shadow(0px 0px 5px darkgray);
}
</style>
