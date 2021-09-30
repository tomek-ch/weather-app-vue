import {
  getAuth,
  createUserWithEmailAndPassword,
  User,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  Auth,
  UserCredential,
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

const errors: Record<string, string> = {
  "auth/invalid-email": "The email seems to be incorrect",
  "auth/email-already-in-use": "This email is already in use",
  "auth/user-not-found": "There doesn't seem to be a user with this email",
  "auth/wrong-password": "Incorrect password",
  "auth/network-request-failed": "There was a network error",
};

const authenticate = (
  cb: (auth: Auth, email: string, password: string) => Promise<UserCredential>
) => (email: string, password: string, handleError: (msg: string) => void) => {
  cb(auth, email, password).catch(({ code }) =>
    handleError(errors[code] || code)
  );
};

export const register = authenticate(createUserWithEmailAndPassword);
export const logIn = authenticate(signInWithEmailAndPassword);
export const logOut = () => {
  signOut(auth);
};
