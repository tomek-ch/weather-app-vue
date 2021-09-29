<template>
  <form @submit.prevent="$emit('auth-submit', email, password, handleError)">
    <label>
      Email
      <input v-model="email" class="form-control" />
    </label>
    <label>
      Password
      <input v-model="password" class="form-control" type="password" />
    </label>
    <button
      class="btn btn-primary"
      :disabled="!email.includes('@') || password.length < 6"
    >
      {{ label }}
    </button>
  </form>
  <div v-if="error" class="alert alert-danger mt-3" role="alert">
    {{ error }}
  </div>
</template>

<script setup lang="ts">
import useError from "@/composables/useError";
import { ref } from "vue";

defineProps({
  label: String,
});
defineEmits(["auth-submit"]);

const email = ref("");
const password = ref("");
const { error, handleError } = useError();
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
