import { user } from "@/auth/store";
import { watchEffect } from "vue";
import { useRouter } from "vue-router";

const usePrivateRoute = () => {
  const router = useRouter();
  watchEffect(() => {
    if (user.value) {
      router.push("/");
    }
  });
};

export default usePrivateRoute;
