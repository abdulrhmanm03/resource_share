import "./AuthForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthForm() {
  const navigateTo = useNavigate();

  const [isRegister, setIsRegister] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function registeredOrNot() {
    isRegister ? setIsRegister(false) : setIsRegister(true);
  }

  const signInORLogIn = (isRegister) => {
    return isRegister ? "Log in" : "Sign up";
  };

  async function login(e) {
    e.preventDefault();
    const body = isRegister
      ? { username, password }
      : { username, password, email };
    const route = isRegister ? "login" : "register";

    const response = await fetch("http://localhost:3001/" + route, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const { token } = await response.json();
    localStorage.setItem("token", token);

    navigateTo("/");
    window.location.reload();
  }

  return (
    <div className="AuthFormDiv">
      <h1 className="auth">{signInORLogIn(isRegister)}</h1>

      <form onSubmit={login} method="post" className="AuthForm">
        <label htmlFor="username" className="auth">
          Username:
        </label>
        <input
          type="text"
          className="auth"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />

        {!isRegister && (
          <>
            <label htmlFor="email" className="auth">
              Email:
            </label>
            <input
              type="email"
              className="auth"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </>
        )}

        <label htmlFor="password" className="auth">
          Password:
        </label>
        <input
          type="password"
          className="auth"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        <button type="submit" className="auth">
          {signInORLogIn(isRegister)}
        </button>
      </form>
      <p className="authLink" onClick={registeredOrNot}>
        {signInORLogIn(!isRegister)}
      </p>
    </div>
  );
}

export default AuthForm;
