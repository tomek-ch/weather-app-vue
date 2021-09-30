import CityItem from "@/components/CityItem.vue";
import { mount, shallowMount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import City from "@/views/City.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: City },
    {
      path: "/city/:name",
      name: "City",
      component: City,
    },
  ],
});

const city = {
  id: 1,
  name: "London",
  temperature: 15,
  humidity: 50,
  icon: "src",
};

describe("CityItem.vue", () => {
  it("renders correct data", () => {
    router.isReady().then(() => {
      const wrapper = shallowMount(City, {
        props: { city },
        global: { plugins: [router] },
      });

      expect(wrapper.find("h4").text()).toBe(city.name);
    });
  });
});
