<template>
  <header class="d-flex justify-content-between">
    <router-link to="/"><h1 class="mb-3">Weather app</h1></router-link>
    <div>
      <div v-if="user">{{ user.email }}</div>
      <div v-else>
        <router-link to="/log-in">Log in</router-link>
        <router-link to="/register" class="btn btn-primary ml-3">
          Register
        </router-link>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { user } from "@/auth/store";

export default defineComponent({
  setup() {
    return { user };
  },
});
</script>

<style scoped>
h1 {
  font-size: 1.5em;
}
</style>
