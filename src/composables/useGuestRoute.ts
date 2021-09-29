import { user } from "@/auth/store";
import { watchEffect } from "vue";
import { useRouter } from "vue-router";

const useGuestRoute = () => {
  const router = useRouter();
  watchEffect(() => {
    if (user.value) {
      router.push("/");
    }
  });
};

export default useGuestRoute;
