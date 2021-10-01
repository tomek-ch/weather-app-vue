import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import Header from "@/components/Header.vue";

const stubs = { RouterLink: RouterLinkStub };

describe("Header.vue", () => {
  it("renders auth links when there is no user", () => {
    const wrapper = shallowMount(Header, {
      props: { user: null },
      global: { stubs },
    });
    expect(wrapper.findAllComponents(RouterLinkStub).length).toBe(3);
  });
});
