<template>
  <header class="d-flex justify-content-between">
    <router-link to="/"><h1 class="mb-3">Weather app</h1></router-link>
    <div v-if="user">{{ user.email }} aa</div>
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
