import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { auth } from "../../lib/firebase";
import Signup from "../Signup/Signup";
import "./styles.css";

const Signin = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [mailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState({ state: false, msg: "" });
  const toggleSignUp = (e) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      setShowSignup(true);
      setLoading(false);
    }, 1500);
  };

  const signin = (e) => {
    e.preventDefault();
    setLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setPasswordError({ state: false, msg: "" });
        setEmailError({ state: false, msg: "" });
      })
      .catch((err) => {
        setLoading(false);

        if (err.code === "auth/wrong-password") {
          setEmailError({ state: false, msg: "" });
          setPasswordError({ state: true, msg: "Incorrect password" });
        } else if (
          err.code === "auth/user-not-found" ||
          err.code === "auth/invalid-email"
        ) {
          setEmailError({ state: true, msg: "Email Dosen't exsist" });
          setPasswordError({ state: false, msg: "" });
        }
      });
  };

  return (
    <div className="login">
      {showSignup ? (
        <Signup showSignup={setShowSignup} />
      ) : (
        <div className="login__content">
          {loading && <div className="login__loading" />}

          <div className={`login__wrapper ${loading && "login__fade"}`}>
            <img
              className="login__logo"
              src="/assets/svg/google.svg"
              alt="Google"
            />

            <p className="login__title">Sign in</p>
            <p className="login__subtitle">Continue to Gmail</p>

            <form className="login__form">
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                type="email"
                className="login__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={mailError.state}
                helperText={mailError.msg}
              />

              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                className="login__input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError.state}
                helperText={passwordError.msg}
              />

              <div className="login__infoText">
                Not your computer? Use guest mode to sign in privately?
                <a href="/learnmore">Learn More</a>
              </div>

              <div className="login__buttons">
                <Button
                  className="login__button"
                  color="primary"
                  onClick={toggleSignUp}
                >
                  Create Account
                </Button>

                <Button
                  className="login__button"
                  color="primary"
                  variant="contained"
                  onClick={signin}
                >
                  Sign in
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signin;
