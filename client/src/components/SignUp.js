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
        <div>
          <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            /><br></br>

            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /><br></br>

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            /><br></br>

            <label htmlFor="password">Password Confirmation</label>
            <input
              type="password"
              id="password_confirmation"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              autoComplete="current-password"
            /><br></br>
            <button type="submit" >Sign Up</button>
          </form>

          <Link to={`/login`}>Already have an account? Login</Link>
        </div>
      );

}

export default SignUp

// onClick={handleSignUpClick}