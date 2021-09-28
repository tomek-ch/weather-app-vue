<template>
  <div>
    <form @submit="handleSubmit">
      <input v-model="input" class="form-control" placeholder="London" />
      <button
        class="btn btn-primary"
        :disabled="cityNames.includes(lowerCaseName)"
      >
        Add city
      </button>
    </form>
    <div v-if="error">{{ error }}</div>
    <div v-for="city in weatherData" :key="city" class="list-group">
      <CityItem :city="city" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, computed } from "vue";
import CityWeather from "@/types/CityWeather";
import CityItem from "@/components/CityItem.vue";

export default defineComponent({
  name: "Home",
  props: {
    cityNames: { type: Array as PropType<Array<string>>, required: true },
    weatherData: {
      type: Array as PropType<Array<CityWeather>>,
      required: true,
    },
  },
  components: { CityItem },
  emits: ["add-city"],
  setup(_props, context) {
    const input = ref("");
    const lowerCaseName = computed(() => input.value.toLowerCase());

    const error = ref("");
    const handleError = (msg: string) => (error.value = msg);

    const handleSubmit = (e: Event) => {
      e.preventDefault();
      context.emit("add-city", lowerCaseName.value, handleError);
      input.value = "";
    };

    return { input, handleSubmit, lowerCaseName, error };
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
</style>
