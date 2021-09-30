import { shallowMount } from "@vue/test-utils";
import Chart from "@/components/Chart.vue";

const data = [
  { value: 30, label: "1" },
  { value: 50, label: "2" },
  { value: 100, label: "3" },
];

const unit = "%";
const color = "blue";

const wrapper = shallowMount(Chart, {
  props: {
    data,
    unit,
    color,
  },
});

const bars = wrapper.findAll(".bar");

describe("Chart.vue", () => {
  it("renders the correct number of bars", () => {
    expect(bars.length).toBe(data.length);
  });
});
