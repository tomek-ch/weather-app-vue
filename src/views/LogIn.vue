<template>
  <AuthForm label="Log in" @auth-submit="logIn" />
</template>

<script setup lang="ts">
import AuthForm from "@/components/AuthForm.vue";
import { logIn } from "@/auth/store";
import useGuestRoute from "@/composables/useGuestRoute";
useGuestRoute();
</script>
