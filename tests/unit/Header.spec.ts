import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import Header from "@/components/Header.vue";

const user = { email: "test email" };
const options = { global: { stubs: { RouterLink: RouterLinkStub } } };

const wrapperWithUser = shallowMount(Header, {
  props: { user },
  ...options,
});

const wrapperWithoutUser = shallowMount(Header, {
  props: { user: null },
  ...options,
});

describe("Header.vue", () => {
  it("renders auth links when there is no user", () => {
    expect(wrapperWithoutUser.findAllComponents(RouterLinkStub).length).toBe(3);
  });

  it("doesn't render a sign out button when there is no user", () => {
    expect(wrapperWithoutUser.find("button").exists()).toBe(false);
  });

  it("renders user's email", () => {
    expect(wrapperWithUser.text()).toContain(user.email);
  });

  it("renders a sign out button", () => {
    expect(wrapperWithUser.find("button").exists()).toBe(true);
  });

  it("doesn't render auth links when there is a user", () => {
    expect(wrapperWithUser.findAllComponents(RouterLinkStub).length).toBe(1);
  });
});
