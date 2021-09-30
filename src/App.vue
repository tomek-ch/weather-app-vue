<template>
  <div class="container mx-auto p-4">
    <Spinner v-if="expectSignIn && !user" />
    <template v-else>
      <Header />
      <router-view />
    </template>
  </div>
</template>

<script setup lang="ts">
import "./firebase";
import { expectSignIn, user } from "./auth/store";
import Header from "./components/Header.vue";
import Spinner from "./components/Spinner.vue";
</script>

<style>
.container {
  max-width: 500px;
}
</style>
