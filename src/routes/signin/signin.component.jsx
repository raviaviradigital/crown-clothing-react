import React, { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  auth,
  createUserFromAuth,
} from "../../utils/firebase/firebase-config";

const handleGoogleSignin = async () => {
  const response = await signInWithGooglePopup();
  const { user } = response;
  const userDocRef = await createUserFromAuth(user);
  console.log("USer ", userDocRef);
};

const SignIn = () => {
  useEffect(() => {
    async function fetchData() {
      const response = await getRedirectResult(auth);
      console.log(response);
      if (response) {
        const { user } = response;
        const userDocRef = await createUserFromAuth(user);
        console.log("USer Redirect", userDocRef);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      Sign in Page
      <button onClick={handleGoogleSignin}>Sign with google</button>
      <button onClick={signInWithGoogleRedirect}>
        Sign with google Redirect
      </button>
    </div>
  );
};

export default SignIn;
