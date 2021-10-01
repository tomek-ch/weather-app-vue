import { shallowMount } from "@vue/test-utils";
import Alert from "@/components/Alert.vue";

describe("Alert.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(Alert, {
      props: { msg },
    });

    expect(wrapper.text()).toMatch(msg);
  });

  it("doesn't render an empty msg", () => {
    const msg = "";
    const wrapper = shallowMount(Alert, {
      props: { msg },
    });
    expect(wrapper.find("div").exists()).toBe(false);
  });

  it("renders an aprropriate variant", () => {
    const wrapper = shallowMount(Alert, {
      props: {
        msg: "test",
        variant: "danger",
      },
    });
    expect(wrapper.classes()).toContain("alert-danger");
  });
});
