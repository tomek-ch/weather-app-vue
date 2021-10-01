<template>
  <form @submit.prevent="$emit('auth-submit', email, password, handleError)">
    <label>
      Email
      <input v-model="email" class="form-control mt-1" />
    </label>
    <label>
      Password
      <input v-model="password" class="form-control mt-1" type="password" />
    </label>
    <button
      class="btn btn-primary"
      :disabled="!/^\S+@\S+(\.\S+)+$/.test(email) || password.length < 6"
    >
      {{ label }}
    </button>
  </form>
  <Alert :msg="error" variant="danger" class="mt-3" />
</template>

<script setup lang="ts">
import useError from "@/composables/useError";
import { ref } from "vue";
import Alert from "./Alert.vue";

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
