<template>
  <form @submit="handleSubmit">
    <label>
      Login
      <input v-model="login" />
    </label>
    <label>
      Password
      <input v-model="password" />
    </label>
    <button>Log in</button>
  </form>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const login = ref("");
    const password = ref("");

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log({ login, password });
    };

    return { handleSubmit, login, password };
  },
};
</script>

<style></style>
