import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserFromAuth,
  signInWithGooglePopup,
  signInWithAuthUserEmailAndPassword,
} from "../../utils/firebase/firebase-config";
import ButtonComponent from "../buttons/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in.styles.scss";
const defaultFormData = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignInForm = () => {
  const [formObj, SetFormObj] = useState(defaultFormData);
  const { displayName, email, password, confirmPassword } = formObj;

  const handleOnChange = (event) => {
    //Destructuring event object
    const { name, value } = event.target;
    //Spread operator updating the values inside a json object
    SetFormObj({ ...formObj, [name]: value });
  };

  const resetFormFields = () => {
    SetFormObj(defaultFormData);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { user } = await signInWithAuthUserEmailAndPassword(
        email,
        password
      );
      console.log("Sign in", user);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect password ");
          break;
        case "auth/user-not-found":
          alert("No User found ");
          break;
        default:
          console.log(error);
      }
    }
  };
  const handleGoogleSignin = async () => {
    const response = await signInWithGooglePopup();
    const { user } = response;
    const userDocRef = await createUserFromAuth(user);
    console.log("gOOGLE SIGN IN ", userDocRef);
  };
  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign In with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={email}
          required
          onChange={handleOnChange}
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={password}
          required
          onChange={handleOnChange}
        />
        <div className="buttons-container">
          <ButtonComponent type="submit">Sign In</ButtonComponent>
          <ButtonComponent
            type="button"
            onClick={handleGoogleSignin}
            buttonType="google"
          >
            Google SignIn{" "}
          </ButtonComponent>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
