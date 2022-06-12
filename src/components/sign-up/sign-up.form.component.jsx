import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserFromAuth,
} from "../../utils/firebase/firebase-config";
import ButtonComponent from "../buttons/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-up.styles.scss";
const defaultFormData = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
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
    if (password !== confirmPassword) alert("Password don't match");
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email already in use");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          name="displayName"
          value={displayName}
          onChange={handleOnChange}
        />
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
        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          required
          onChange={handleOnChange}
        />
        <ButtonComponent type="submit">Sign Up</ButtonComponent>
      </form>
    </div>
  );
};

export default SignUpForm;
