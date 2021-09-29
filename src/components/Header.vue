<template>
  <header class="d-flex justify-content-between mb-4">
    <router-link to="/"><h1>Weather app</h1></router-link>
    <div>
      <div v-if="user">
        {{ user.email }}
        <button class="btn btn-secondary ml-2" @click="logOut">
          Sign out
        </button>
      </div>
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
import { user, logOut } from "@/auth/store";

export default defineComponent({
  setup() {
    return { user, logOut };
  },
});
</script>

<style scoped>
h1 {
  font-size: 1.5em;
}
</style>
