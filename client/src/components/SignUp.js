import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp({ setUser }) {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const navigate = useNavigate();

    // const handleSignUpClick = () => {
    //   ;
    // };

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
            password_confirmation: passwordConfirmation,
          }),
        }).then((r) => {
          if (r.ok) {
            r.json().then((user) => setUser(user))
              navigate("/login")};
        
        });
    }

     
    return (
      <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="mt-4">
            <h1>Sign Up</h1>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password_confirmation">Password Confirmation</label>
              <input
                type="password"
                id="password_confirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                autoComplete="new-password"
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-info">
              Sign Up
            </button>
          </form>

          <p className="mt-3">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

// onClick={handleSignUpClick}