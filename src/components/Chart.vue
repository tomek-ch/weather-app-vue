<template>
  <div class="chart">
    <div class="y-labels">
      <div>{{ max }}{{ unit }}</div>
      <div>{{ max / 2 }}{{ unit }}</div>
      <div>0{{ unit }}</div>
    </div>
    <div class="row bars">
      <div
        v-for="({ value }, idx) in data"
        :key="`bar-${idx}`"
        class="bar"
        :style="`height: ${(value / max) * 100}%; background-color: ${color}`"
      />
    </div>
    <div class="row x-labels">
      <div v-for="({ label }, idx) in data" :key="`label-${idx}`" class="label">
        {{ label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";

const props = defineProps({
  data: {
    type: Array as PropType<{ value: number; label: string }[]>,
    required: true,
  },
  unit: String,
  color: String,
});

const values = props.data.map(({ value }) => value);
const max = Math.max(...values);
</script>

<style scoped>
.chart {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 200px auto;
  gap: 1em;
}

.y-labels {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0;
}

.bars {
  height: 200px;
  align-items: flex-end;
  grid-column: 2/3;
  padding: 0 0.5em;
}

.bar {
  background-color: dodgerblue;
  width: 1em;
  border-radius: 10px 10px;
}

.x-labels {
  grid-row: 2/3;
  grid-column: 2/3;
}
</style>
