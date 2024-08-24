import "./Navbar.css";
import { NavLink } from "react-router-dom";

function Navbar() {
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
