import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import loginDetails from "../data/loginDetails.json";
import { useAuth } from "../AuthContext";
import "../App.css";

const Login = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/";

  const [formData, setFormData] = useState({
    email: "test@gmail.com",
    password: "password",
  });
  const { email, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginDetails.email === email && loginDetails.password === password) {
      let formData = new FormData(e.currentTarget);
      let email = formData.get("email");

      auth.login(email, () => {
        localStorage.setItem("user", loginDetails.name);
        navigate(from, { replace: true });
      });
      return;
    } else {
      alert("Invalid login credentials");
    }
  };

  return (
    <div className="main-container">
      <div className="app-title">
        <h1>Todo</h1>
      </div>
      <div className="login-form ">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-form">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              value={email}
            />
          </div>
          <div className="login-form">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              value={password}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
