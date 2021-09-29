<template>
  <AuthForm label="Log in" @auth-submit="logIn" />
  <p class="mt-3">
    Don't have an account? <router-link to="/register">Sign up</router-link>
  </p>
</template>

<script setup lang="ts">
import AuthForm from "@/components/AuthForm.vue";
import { logIn } from "@/auth/store";
import useGuestRoute from "@/composables/useGuestRoute";
useGuestRoute();
</script>
