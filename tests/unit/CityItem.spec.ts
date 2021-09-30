import CityItem from "@/components/CityItem.vue";
import { shallowMount } from "@vue/test-utils";
import { RouterLinkStub } from "@vue/test-utils";

const city = {
  id: 1,
  name: "London",
  temperature: 15,
  humidity: 50,
  icon: "src",
};

const wrapper = shallowMount(CityItem, {
  props: { city },
  global: {
    stubs: {
      RouterLink: RouterLinkStub,
    },
  },
});

describe("CityItem.vue", () => {
  it("renders correct city name", () => {
    expect(wrapper.find("h4").text()).toBe(city.name);
  });
});
