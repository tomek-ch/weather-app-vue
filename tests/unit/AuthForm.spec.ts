import { shallowMount } from "@vue/test-utils";
import AuthForm from "@/components/AuthForm.vue";

describe("Alert.vue", () => {
  it("renders a button with appropriate label", () => {
    const label = "test";

    const wrapper = shallowMount(AuthForm, {
      props: { label },
    });

    const text = wrapper.find("button").text();
    expect(text).toMatch(label);
  });

  it("is disabled by default", () => {
    const wrapper = shallowMount(AuthForm, {});
    expect(wrapper.find("button").element.disabled).toBe(true);
  });

  it("is disabled when the password is too short", () => {
    const wrapper = shallowMount(AuthForm, {});

    wrapper.find("input").setValue("test@test.com");
    wrapper.find('input[type="password"]').setValue("12345");

    expect(wrapper.find("button").element.disabled).toBe(true);
  });

  it("is disabled when the email is incorrect", () => {
    const wrapper = shallowMount(AuthForm, {});

    wrapper.find("input").setValue("test");
    wrapper.find('input[type="password"]').setValue("123456");

    expect(wrapper.find("button").element.disabled).toBe(true);
  });
});
