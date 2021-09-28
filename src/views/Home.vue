<template>
  <div class="home">
    <form @submit="handleSubmit">
      <input v-model="input" class="form-control" />
      <button class="btn btn-primary" :disabled="cities.includes(input)">
        Add city
      </button>
    </form>
    <div v-for="city in cities" :key="city">
      {{ city }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Home",
  props: { cities: [] },
  emits: ["add-city"],
  setup(_props, context) {
    const input = ref("");

    const handleSubmit = (e: Event) => {
      e.preventDefault();
      context.emit("add-city", input.value);
    };

    return { input, handleSubmit };
  },
});
</script>
