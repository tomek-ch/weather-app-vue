<template>
  <div class="row bars">
    <div
      v-for="({ value }, idx) in data"
      :key="`bar-${idx}`"
      class="bar"
      :style="`height: ${(value / max) * 100}%`"
    />
  </div>
  <div class="row">
    <div v-for="({ label }, idx) in data" :key="`label-${idx}`" class="label">
      {{ label }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<{ value: number; label: string }[]>,
      required: true,
    },
  },
  setup(props) {
    const max = computed(() =>
      Math.max(...props.data.map(({ value }) => value))
    );

    return { max };
  },
});
</script>

<style scoped>
.row {
  display: flex;
  justify-content: space-between;
}

.bars {
  height: 200px;
  align-items: flex-end;
}

.bar {
  background-color: dodgerblue;
  width: 2em;
}
</style>
