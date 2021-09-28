<template>
  <form @submit="handleSubmit">
    <label>
      Login
      <input v-model="login" class="form-control" />
    </label>
    <label>
      Password
      <input v-model="password" class="form-control" />
    </label>
    <button class="btn btn-primary">Log in</button>
  </form>
</template>

<script lang="ts">
import { ref } from "vue";
export default {
  setup() {
    const login = ref("");
    const password = ref("");

    const handleSubmit = async (e: Event) => {
      e.preventDefault();
      console.log({ login, password });
    };

    return { handleSubmit, login, password };
  },
};
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
