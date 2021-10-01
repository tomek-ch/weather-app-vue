<template>
  <header class="d-flex justify-content-between mb-4 align-items-baseline">
    <router-link to="/">
      <h1>Weather app</h1>
    </router-link>
    <div>
      <div v-if="user" class="d-flex align-items-baseline">
        {{ user.email }}
        <button class="btn close ml-3" @click="$emit('log-out')">
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
import LogOut from "@/icons/LogOut.vue";
import { PropType } from "@vue/runtime-core";
import { User } from "firebase/auth";

defineProps({ user: { type: Object as PropType<User | null> } });
defineEmits(["log-out"]);
</script>

<style scoped>
h1 {
  font-size: 1.5em;
}
</style>
