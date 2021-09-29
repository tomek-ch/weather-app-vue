<template>
  <AuthForm label="Log in" @auth-submit="logIn" />
</template>

<script lang="ts">
import AuthForm from "@/components/AuthForm.vue";
import { logIn } from "@/auth/store";
import useGuestRoute from "@/composables/useGuestRoute";

export default {
  components: { AuthForm },
  setup() {
    useGuestRoute();
    return { logIn };
  },
};
</script>
