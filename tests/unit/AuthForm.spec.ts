import { shallowMount, mount } from "@vue/test-utils";
import AuthForm from "@/components/AuthForm.vue";
import { nextTick } from "vue";

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

  it("is disabled when the password is too short", async () => {
    const wrapper = shallowMount(AuthForm, {});
    await Promise.all([
      wrapper.find("input").setValue("test@test.com"),
      wrapper.find('input[type="password"]').setValue("12345"),
    ]);
    expect(wrapper.find("button").element.disabled).toBe(true);
  });

  it("is disabled when the email is incorrect", async () => {
    const wrapper = shallowMount(AuthForm, {});
    await Promise.all([
      wrapper.find("input").setValue("test"),
      wrapper.find('input[type="password"]').setValue("123456"),
    ]);
    expect(wrapper.find("button").element.disabled).toBe(true);
  });

  it("is enabled when the data is correct", async () => {
    const wrapper = shallowMount(AuthForm, {});
    await Promise.all([
      wrapper.find("input").setValue("test@test.com"),
      wrapper.find('input[type="password"]').setValue("123456"),
    ]);
    expect(wrapper.find("button").element.disabled).toBe(false);
  });

  it("submits correct data", async () => {
    const wrapper = mount(AuthForm);
    const email = "test@test.com";
    const password = "123456";

    await Promise.all([
      wrapper.find("input").setValue(email),
      wrapper.find('input[type="password"]').setValue(password),
    ]);

    await wrapper.find("form").trigger("submit");
    const event = wrapper.emitted<(string | ((msg: string) => string))[]>()[
      "auth-submit"
    ][0];

    expect(event[0]).toBe(email);
    expect(event[1]).toBe(password);
    expect(typeof event[2]).toBe("function");
  });
});
