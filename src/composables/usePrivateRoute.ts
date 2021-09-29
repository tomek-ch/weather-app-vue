import { user, expectSignIn } from "@/auth/store";
import { watchEffect } from "vue";
import { useRouter } from "vue-router";

const usePrivateRoute = () => {
  const router = useRouter();

  watchEffect(() => {
    if (!user.value && !expectSignIn.value) {
      router.push("/log-in");
    }
  });
};

export default usePrivateRoute;
