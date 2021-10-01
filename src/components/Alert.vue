<template>
  <div
    v-if="msg"
    :class="`alert alert-${variant} d-flex align-items-center`"
    role="alert"
  >
    <AlertIcon class="mr-2" />
    {{ msg }}
  </div>
</template>

<script setup lang="ts">
import AlertIcon from "@/icons/Alert.vue";
defineProps({ msg: String, variant: String });
</script>
