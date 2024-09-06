import "./Navbar.css";
import { NavLink, Link } from "react-router-dom";
import { useRegistration } from "../../context/RegistrationContext";

// TODO: get user states
function Navbar() {
  const { isRegistered } = useRegistration();
  console.log(isRegistered);
  function handleSignOut() {
    localStorage.removeItem("token");
    window.location.reload();
  }
  return (
    <nav>
      <img src="/logo.png" alt="logo" className="logo" />

      <ul className="nav">
        <li className="nav">
          <NavLink className="link nav" to="/">
            Home
          </NavLink>
        </li>
        {!isRegistered && (
          <li className="nav">
            <NavLink className="link nav" to="/auth">
              Sign up
            </NavLink>
          </li>
        )}
        {isRegistered && (
          <>
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
            <li className="nav" onClick={() => handleSignOut()}>
              <Link className="link nav" to="/">
                Sign Out
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
