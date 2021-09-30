import { shallowMount } from "@vue/test-utils";
import Chart from "@/components/Chart.vue";

const data = [
  { value: 21, label: "1" },
  { value: 37, label: "2" },
  { value: 44, label: "3" },
];

const max = Math.max(...data.map(({ value }) => value));
const unit = "%";
const color = "blue";

const wrapper = shallowMount(Chart, { props: { data, unit, color } });
const bars = wrapper.findAll<HTMLElement>(".bar");

describe("Chart.vue", () => {
  it("renders the correct number of bars", () => {
    expect(bars.length).toBe(data.length);
  });

  it("renders bars of correct heights", () => {
    bars.forEach(({ element: { style: { height } } }, idx) =>
      expect(height).toBe(`${(data[idx].value / max) * 100}%`)
    );
  });

  it("renders bars of correct color", () => {
    expect(bars[0].element.style.backgroundColor).toBe(color);
  });
});
