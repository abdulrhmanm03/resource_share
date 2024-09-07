import "./Navbar.css";
import { NavLink, Link } from "react-router-dom";
import { useRegistration } from "../../context/RegistrationContext";

// TODO: get user states
function Navbar() {
  const { isRegistered } = useRegistration();
  const { user } = useRegistration();
  const username = user.username;
  console.log(isRegistered);
  function handleSignOut() {
    localStorage.removeItem("token");
    window.location.reload();
  }
  return (
    <nav>
      <Link to="/">
        <img src="/logo.png" alt="logo" className="logo" />
      </Link>

      <ul className="nav">
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
              <NavLink className="link nav" to={`/user/${username}`}>
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
