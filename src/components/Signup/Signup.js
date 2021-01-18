import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { auth } from "../../lib/firebase";
import "./styles.css";

const intialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup = ({ showSignup }) => {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const [formData, setFormData] = useState(intialFormData);

  const [passwordError, setPasswordError] = useState({ state: false, msg: "" });
  const [emailError, setEmailError] = useState({ state: false, msg: "" });

  const toggleSignUp = (e) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      showSignup(false);
      setLoading(false);
    }, 1500);
  };

  const createAccount = (e) => {
    e.preventDefault();
    setLoading(true);

    const error = formData.password === formData.confirmPassword;

    if (!error) {
      setPasswordError({ state: true, msg: "Passwords do not match" });
      setFormData({ ...formData, confirmPassword: "" });
      setLoading(false);
      return;
    } else {
      setEmailError({ state: false, msg: "" });
      setPasswordError({ state: false, msg: "" });
    }

    auth
      .createUserWithEmailAndPassword(formData.email, formData.password)
      .then(() => {
        auth.currentUser
          .updateProfile({
            displayName: `${formData.firstName} ${formData.lastName}`,
          })
          .then(() => {
            setLoading(false);
            setEmailError({ state: false, msg: "" });
            setPasswordError({ state: false, msg: "" });
          });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setEmailError({ state: true, msg: "Email is already in use" });
          setLoading(false);
          setFormData({ ...formData, email: "" });
        }
        if (error.code === "auth/invalid-email") {
          setEmailError("Email address in not properly formatted");
          setFormData({ ...formData, email: "" });
          setLoading(false);
        } else if (error.code === "auth/weak-password") {
          setPasswordError("Password should be atleast 6 characters");
          setFormData({ ...formData, password: "", ConfirmPass: "" });
          setLoading(false);
        }
      });
  };

  const buttonDisabled =
    !formData.email ||
    !formData.password ||
    !formData.firstName ||
    !formData.lastName ||
    !formData.confirmPassword;
  return (
    <div className="signup__container">
      <div className={`signup ${loading && "login__fade"}`}>
        {loading && <div className="login__loading signup__loading" />}

        <div className="signup__container">
          <div className="signup__left">
            <img
              className="login__logo"
              src="/assets/svg/google.svg"
              alt="Google"
            />

            <h1 className="signup__heading">Create your Google Account</h1>
            <p className="signup__subheading">Continue to Gmail</p>

            <div className="signup__inputs">
              <div className="signup__nameInputs">
                <TextField
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  className="signup__nameInput"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      firstName: e.target.value,
                    })
                  }
                />

                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  className="signup__nameInput"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      lastName: e.target.value,
                    })
                  }
                />
              </div>

              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                type="email"
                fullWidth
                error={emailError.state}
                helperText={
                  emailError.msg
                    ? emailError.msg
                    : "You can use letters, numbers & periods"
                }
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
              />

              <div className="signup__passwordInputs">
                <div className="signup__passwordWrapper">
                  <TextField
                    id="outlined-basic"
                    label="Password"
                    type={checked ? "text" : "password"}
                    variant="outlined"
                    className="signup__passwordInput"
                    error={passwordError.state}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      })
                    }
                  />

                  <TextField
                    id="outlined-basic"
                    label="Confirm Password"
                    type={checked ? "text" : "password"}
                    variant="outlined"
                    className="signup__passwordInput"
                    value={formData.confirmPassword}
                    error={passwordError.state}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <p
                  className={`signup__helpertext ${
                    passwordError.state && "signin__error"
                  }`}
                >
                  {passwordError.msg
                    ? passwordError.msg
                    : "Use 8 or more characters with a mix of letters, numbers & symbols"}
                </p>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={() => setChecked(!checked)}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Show password"
                />
              </div>

              <div className="signup__buttons">
                <Button
                  className="signup__button"
                  variant="text"
                  color="primary"
                  onClick={toggleSignUp}
                >
                  Sign in instead
                </Button>

                <Button
                  className="signup__button"
                  variant="contained"
                  color="primary"
                  onClick={createAccount}
                  disabled={buttonDisabled}
                >
                  Create
                </Button>
              </div>
            </div>
          </div>
          <figure className="signup__figure">
            <img
              className="signup__figureImg"
              src="https://ssl.gstatic.com/accounts/signup/glif/account.svg"
              alt="account"
            />
            <figcaption className="signup__figcaption">
              One account. All of google working for you
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
};

export default Signup;
