import "./button.styles.scss";
const ButtonComponent = ({ children, buttonType, ...otherProps }) => {
  const BUTTON_CLASS_TYPE = {
    google: "google-sign-in",
    inverted: "inverted",
  };

  return (
    <button
      className={`button-container ${BUTTON_CLASS_TYPE[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
