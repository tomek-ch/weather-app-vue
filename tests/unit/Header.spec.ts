import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import Header from "@/components/Header.vue";

const stubs = { RouterLink: RouterLinkStub };
const user = { email: "test email" };
const wrapperWithUser = shallowMount(Header, {
  props: { user },
  global: { stubs },
});

describe("Header.vue", () => {
  it("renders auth links when there is no user", () => {
    const wrapperWithoutUser = shallowMount(Header, {
      props: { user: null },
      global: { stubs },
    });
    expect(wrapperWithoutUser.findAllComponents(RouterLinkStub).length).toBe(3);
  });

  it("renders user's email", () => {
    expect(wrapperWithUser.text()).toContain(user.email);
  });
});
