import { shallowMount } from "@vue/test-utils";
import Alert from "@/components/Alert.vue";

describe("Alert.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(Alert, {
      props: { msg },
    });

    const text = wrapper.find("div").text();
    expect(text).toMatch(msg);
  });
});
