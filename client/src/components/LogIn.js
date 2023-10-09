import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

function LogIn({ user, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const handleLogInClick = () => {
  //   navigate("/dog_houses");
  // };

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((r) => {
      if (r.ok) {
        console.log(r);
        r.json().then((user) => setUser(user));
        navigate("/dog_houses")
      }
    });
  }

  return (
    <div>
      {user ? (
        <NavBar />
        // <DogHouseList />
      ) : (
        <div className="row justify-content-center">
          <div className="col-md-6">
           <form onSubmit={handleSubmit} className="mt-4">
            <h1>Login</h1>
            <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address
            </label>
            <input
              type="email"
              id="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="name@example.com"
            />
            </div>
            <div className="mb-3">
            <label htmlFor="password" className="form-label">Password
            </label>
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
            </div>

            <button type="submit" className="btn btn-info">Login</button>
          </form>

          <p className="mt-3">
              Don't have an account?{" "}
              <Link to="/signup">Register</Link>
            </p>
            </div>
        </div>
      )}
    </div>
  );
}

export default LogIn;

//  onClick={handleLogInClick}