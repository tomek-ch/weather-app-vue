<template>
  <form @submit.prevent="$emit('auth-submit', email, password)">
    <label>
      Email
      <input v-model="email" class="form-control" type="email" />
    </label>
    <label>
      Password
      <input v-model="password" class="form-control" type="password" />
    </label>
    <button class="btn btn-primary">{{ label }}</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps({
  label: String,
});
defineEmits(["auth-submit"]);

const email = ref("");
const password = ref("");
</script>

<style scoped>
form {
  max-width: 500px;
  margin: auto;
}

label {
  display: block;
}
</style>
