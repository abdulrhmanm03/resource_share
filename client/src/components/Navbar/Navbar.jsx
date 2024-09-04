import { useEffect, useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

// TODO: get user states
function Navbar() {
  const [isRegistered, setIsRegistered] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    async function checkRegistration() {
      const response = await fetch("http://localhost:3001/getUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the token in the Authorization header
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setIsRegistered(true);
      } else {
        console.log("no");
      }
    }

    checkRegistration();
  }, []);
  return (
    <nav>
      <img src="/logo.png" alt="logo" className="logo" />

      <ul className="nav">
        <li className="nav">
          <NavLink className="link nav" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav">
          <NavLink className="link nav" to="/auth">
            Sign up
          </NavLink>
        </li>
        <li className="nav">
          <NavLink className="link nav" to="/profile">
            Profile
          </NavLink>
        </li>
        <li className="nav">
          <NavLink className="link nav" to="/createPost">
            Create post
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
