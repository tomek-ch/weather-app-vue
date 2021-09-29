<template>
  <div>
    <form
      @submit.prevent="
        $emit('add-city', input, handleError);
        input = '';
      "
      class="mb-3"
    >
      <input v-model="input" class="form-control" placeholder="London" />
      <button
        class="btn btn-primary"
        :disabled="cityNames.includes(lowerCaseName)"
      >
        Add city
      </button>
    </form>
    <div v-if="error" class="alert alert-warning" role="alert">
      {{ error }}
    </div>
    <div v-for="city in weatherData" :key="city.name" class="list-group">
      <CityItem :city="city" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, PropType, computed } from "vue";
import CityWeather from "@/types/CityWeather";
import CityItem from "@/components/CityItem.vue";
import usePrivateRoute from "@/composables/usePrivateRoute";

defineProps({
  cityNames: { type: Array as PropType<Array<string>>, required: true },
  weatherData: {
    type: Array as PropType<Array<CityWeather>>,
    required: true,
  },
});

const input = ref("");
const lowerCaseName = computed(() => input.value.toLowerCase());

const error = ref("");
const handleError = (msg: string) => (error.value = msg);

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
