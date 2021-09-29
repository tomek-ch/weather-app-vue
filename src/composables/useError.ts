import { ref } from "vue";

const useError = () => {
  const error = ref("");
  const handleError = (msg: string) => (error.value = msg);
  return { error, handleError };
};

export default useError;
