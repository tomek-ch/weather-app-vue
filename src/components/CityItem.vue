<template>
  <div class="list-group-item list-group-item-action d-flex mb-3">
    <button class="close mr-4" @click="$emit('delete-city', city.id)">
      <Trash />
    </button>
    <router-link
      :to="`/city/${city.name}`"
      class="d-flex justify-content-between align-items-center"
    >
      <div>
        <h4>{{ city.name }}</h4>
        <div>{{ city.temperature }}°C</div>
        <div>Humidity: {{ city.humidity }}%</div>
      </div>
      <img :src="city.icon" />
    </router-link>
  </div>
</template>

<script setup lang="ts">
import Trash from "@/icons/Trash.vue";
defineProps({
  city: { type: Object, required: true },
});
defineEmits(["delete-city"]);
</script>

<style scoped>
img {
  filter: drop-shadow(0px 0px 5px darkgray);
}

.list-group-item {
  position: relative;
}

button {
  z-index: 2;
}

a {
  color: inherit;
  flex-grow: 1;
  text-decoration: none;
}
</style>
