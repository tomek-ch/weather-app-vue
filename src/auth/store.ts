import {
  getAuth,
  createUserWithEmailAndPassword,
  User,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { ref } from "vue";

export const user = ref<User | null>(null);
export const expectSignIn = ref<boolean>(
  !!localStorage.getItem("expectSignIn")
);
const auth = getAuth();

onAuthStateChanged(auth, (userData) => {
  user.value = userData;
  const isLoggedIn = !!userData;
  expectSignIn.value = isLoggedIn;
  localStorage.setItem("expectSignIn", JSON.stringify(isLoggedIn));
});

export const register = (email: string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password);
};

export const logIn = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password);
};

export const logOut = () => {
  signOut(auth);
};
