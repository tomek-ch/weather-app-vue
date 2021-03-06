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

  it("renders correct labels on the x axis", () => {
    const labels = wrapper.findAll(".label");
    labels.forEach((label, idx) => {
      expect(label.text()).toBe(data[idx].label);
    });
  });

  it("renders correct labels on the y axis", () => {
    const labels = wrapper.findAll(".y-labels div");
    const correctValues = [max, max / 2, 0];

    labels.forEach((label, idx) => {
      expect(label.text()).toBe(`${correctValues[idx]}${unit}`);
    });
  });
});
