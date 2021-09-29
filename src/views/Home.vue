<template>
  <div>
    <form
      @submit.prevent="
        $emit('add-city', input, handleError);
        input = '';
      "
      class="mb-3"
    >
      <input v-model="input" class="form-control" placeholder="London" />
      <button
        class="btn btn-primary"
        :disabled="
          !!weatherData.find(
            ({ name }) => name.toLocaleLowerCase() === input.toLocaleLowerCase()
          )
        "
      >
        Add city
      </button>
    </form>
    <Alert :msg="error" variant="warning" />
    <div v-for="city in weatherData" :key="city.id" class="list-group">
      <CityItem :city="city" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, PropType } from "vue";
import CityWeather from "@/types/CityWeather";
import CityItem from "@/components/CityItem.vue";
import usePrivateRoute from "@/composables/usePrivateRoute";
import useError from "@/composables/useError";
import Alert from "@/components/Alert.vue";

defineProps({
  cityList: { type: Array as PropType<Array<number>>, required: true },
  weatherData: {
    type: Array as PropType<Array<CityWeather>>,
    required: true,
  },
});
defineEmits(["add-city"]);

const input = ref("");
const { error, handleError } = useError();
usePrivateRoute();
</script>

<style scoped>
form {
  display: flex;
  gap: 0.5em;
}

button {
  white-space: nowrap;
}
</style>
