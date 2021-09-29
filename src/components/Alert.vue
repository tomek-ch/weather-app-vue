<template>
  <div v-if="msg" :class="`alert alert-${variant}`" role="alert">
    {{ msg }}
  </div>
</template>

<script setup lang="ts">
defineProps({ msg: String, variant: String });
</script>
