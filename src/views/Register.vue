<template>
  <AuthForm label="Register" @auth-submit="register" />
</template>

<script lang="ts">
import AuthForm from "@/components/AuthForm.vue";
import { register } from "@/auth/store";

export default {
  components: { AuthForm },
  setup() {
    return { register };
  },
};
</script>
