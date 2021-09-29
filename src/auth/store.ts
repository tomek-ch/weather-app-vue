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
const auth = getAuth();

onAuthStateChanged(auth, (userData) => {
  user.value = userData;
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
