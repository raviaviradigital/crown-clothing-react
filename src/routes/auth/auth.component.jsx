import React from "react";
import SignInForm from "../../components/sign-in/sign-in.form.component";
import SignUpForm from "../../components/sign-up/sign-up.form.component";
import "./auth.styles.scss";

const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
