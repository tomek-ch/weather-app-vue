import {
  arrayRemove,
  arrayUnion,
  doc,
  FieldValue,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
const db = getFirestore();

export const getUserCities = async (uid: string) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().cities;
  }

  await setDoc(doc(db, "users", uid), {
    cities: [],
  });
  return [];
};

const updateCities = (cb: (...elements: unknown[]) => FieldValue) => async (
  uid: string,
  cityId: number
) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    cities: cb(cityId),
  });
};

export const addUserCity = updateCities(arrayUnion);
export const deleteUserCity = updateCities(arrayRemove);
