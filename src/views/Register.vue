<template>
  <AuthForm label="Register" @auth-submit="register" />
  <p class="mt-3">
    Already have an account? <router-link to="/log-in">Log in</router-link>
  </p>
</template>

<script setup lang="ts">
import AuthForm from "@/components/AuthForm.vue";
import { register } from "@/auth/store";
import useGuestRoute from "@/composables/useGuestRoute";
useGuestRoute();
</script>
