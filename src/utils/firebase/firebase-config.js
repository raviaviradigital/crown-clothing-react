import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeoIplevNS938SDvRFPXzipOP17lewp7M",
  authDomain: "crown-clothing-ecommerce-63bd8.firebaseapp.com",
  projectId: "crown-clothing-ecommerce-63bd8",
  storageBucket: "crown-clothing-ecommerce-63bd8.appspot.com",
  messagingSenderId: "1033088346216",
  appId: "1:1033088346216:web:1d5d881f86e6d4743273dd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Google auth provider
const googleprovider = new GoogleAuthProvider();

googleprovider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleprovider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleprovider);

//Initializing the firestore database...
export const db = getFirestore();

//Creating a method to check user exists in firestore otherwise save the user
export const createUserFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  //Establishing the doc reference
  const userDocRef = doc(db, "users", userAuth.uid);
  //Check user exsits
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation, //This will override the displayName property if it's null
      });
    } catch (error) {
      console.log("Error while creating user", error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInWithAuthUserEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
