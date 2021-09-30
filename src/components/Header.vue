<template>
  <header class="d-flex justify-content-between mb-4 align-items-baseline">
    <router-link to="/">
      <h1>Weather app</h1>
    </router-link>
    <div>
      <div v-if="user" class="d-flex align-items-baseline">
        {{ user.email }}
        <button class="btn close ml-3" @click="logOut">
          <LogOut />
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

<script setup lang="ts">
import { user, logOut } from "@/auth/store";
import LogOut from "@/icons/LogOut.vue";
</script>

<style scoped>
h1 {
  font-size: 1.5em;
}
</style>
