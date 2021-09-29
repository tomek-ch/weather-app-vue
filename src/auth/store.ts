import {
  getAuth,
  createUserWithEmailAndPassword,
  User,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { ref } from "vue";

export const user = ref<User | null>(null);
const auth = getAuth();

onAuthStateChanged(auth, (userData) => {
  if (userData) {
    user.value = userData;
  } else {
    user.value = null;
  }
});

export const register = (email: string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password);
  // .then((userCredential) => {
  //   user.value = userCredential.user;
  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  // });
};

export const logIn = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password);
  // .then((userCredential) => {
  //   user.value = userCredential.user;
  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  // });
};
