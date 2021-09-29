<template>
  <AuthForm label="Register" @auth-submit="register" />
</template>

<script lang="ts">
import AuthForm from "@/components/AuthForm.vue";
import { register } from "@/auth/store";
import useGuestRoute from "@/composables/useGuestRoute";

export default {
  components: { AuthForm },
  setup() {
    useGuestRoute();
    return { register };
  },
};
</script>
