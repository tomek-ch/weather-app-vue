<template>
  <AuthForm label="Register" @auth-submit="register" />
</template>

<script setup lang="ts">
import AuthForm from "@/components/AuthForm.vue";
import { register } from "@/auth/store";
import useGuestRoute from "@/composables/useGuestRoute";
useGuestRoute();
</script>
