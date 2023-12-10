import React, { useEffect, useState } from "react";
import "./SignupLogin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faKey,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

const SignupLogin = () => {
  const [action, setAction] = useState("login");
  const [isVisible, setIsVisible] = useState(false);
  const [formInput, setFormInput] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const toggleForms = (value) => {
    setAction(value);
    setFormInput({ username: "", email: "", phone: "", password: "" });
    setFormErrors({});
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  useEffect(() => {
    if (
      Object.keys(formErrors).length === 0 &&
      Object.values(formInput).every((v) => v !== "") &&
      isSubmit
    ) {
      console.log(formInput);
    }
  }, [formErrors]);

  const validate = (input) => {
    const { username, email, phone, password } = input;
    const errors = {};
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (!username) {
      errors.username = "Username is required!";
    }

    if (!email) {
      errors.email = "Email is required!";
    } else if (!regex.test(email)) {
      errors.email = "Please enter a valid email!";
    }

    if (!phone) {
      errors.phone = "Phone number is required!";
    } else if (isNaN(phone)) {
      errors.phone = "Only numbers allowed!";
    } else if (phone.length >= 13) {
      errors.phone = "Only 13 digits allowed!";
    }

    if (!password) {
      errors.password = "Password is required!";
    } else if (password.length < 6 || password.length > 16) {
      errors.password = "Password length should be 6 to 16 letters!";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formInput));
    setIsSubmit(true);
  };

  return (
    <div className="wrapper">
      <div className="actions">
        {/* <div className="tab tab-left">Sign Up</div> */}
        <div
          className={action == "signup" ? "tab active" : "tab"}
          onClick={() => toggleForms("signup")}
        >
          Sign Up
        </div>
        {/* <div className="tab tab-right">Login</div> */}
        <div
          className={action == "login" ? "tab active" : "tab"}
          onClick={() => toggleForms("login")}
        >
          Login
        </div>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        {action == "signup" && (
          <div className="input-field">
            <FontAwesomeIcon className="icon" icon={faUser} />
            <input
              type="text"
              name="username"
              value={formInput.username}
              onChange={handleChange}
              placeholder="Full Name"
              autoComplete="off"
            />
            <span className="error">{formErrors.username}</span>
          </div>
        )}

        <div className="input-field">
          <FontAwesomeIcon className="icon" icon={faEnvelope} />
          <input
            type="email"
            name="email"
            value={formInput.email}
            onChange={handleChange}
            placeholder="Email Id"
            autoComplete="off"
          />
          <span className="error">{formErrors.email}</span>
        </div>

        {action == "signup" && (
          <div className="input-field">
            <FontAwesomeIcon className="icon" icon={faPhone} />
            <input
              type="text"
              name="phone"
              value={formInput.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              autoComplete="off"
            />
            <span className="error">{formErrors.phone}</span>
          </div>
        )}

        <div className="input-field">
          <FontAwesomeIcon className="icon" icon={faKey} />
          <input
            type={isVisible ? "text" : "password"}
            name="password"
            value={formInput.password}
            onChange={handleChange}
            placeholder="Password"
            autoComplete="off"
          />
          <FontAwesomeIcon
            className="eye-icon"
            icon={isVisible ? faEyeSlash : faEye}
            onClick={() => setIsVisible(!isVisible)}
          />
          <span className="error">{formErrors.password}</span>
        </div>

        {action == "login" && (
          <div className="forgot-password">
            <a href="#">Forgot Password?</a>
          </div>
        )}

        {/* <button>Register</button> */}
        <button type="submit">
          {action == "signup" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default SignupLogin;
