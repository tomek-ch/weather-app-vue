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
        :style="`height: ${(value / max) * 100}%`"
      />
    </div>
    <div class="row x-labels">
      <div v-for="({ label }, idx) in data" :key="`label-${idx}`" class="label">
        {{ label }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<{ value: number; label: string }[]>,
      required: true,
    },
    unit: String,
  },
  setup(props) {
    const values = props.data.map(({ value }) => value);
    const max = Math.max(...values);
    return { max };
  },
});
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
}

.bar {
  background-color: dodgerblue;
  width: 2em;
}

.x-labels {
  grid-row: 2/3;
  grid-column: 2/3;
}
</style>
