import styles from "./navbar.module.css";
import { NavLink, Link } from "react-router-dom";
import { useRegistration } from "../../context/RegistrationContext";
import Search from "./Search";

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
        <img src="/logo.png" alt="logo" className={styles.logo} />
      </Link>

      <Search />

      <ul className={styles.nav}>
        {!isRegistered && (
          <li className={styles.nav}>
            <NavLink className={`${styles.link} ${styles.nav}`} to="/auth">
              Sign up
            </NavLink>
          </li>
        )}
        {isRegistered && (
          <>
            <li className={styles.nav}>
              <NavLink
                className={`${styles.link} ${styles.nav}`}
                to={`/user/${username}`}
              >
                Profile
              </NavLink>
            </li>
            <li className={styles.nav}>
              <NavLink
                className={`${styles.link} ${styles.nav}`}
                to="/createPost"
              >
                Create post
              </NavLink>
            </li>
            <li className={styles.nav} onClick={() => handleSignOut()}>
              <Link className={`${styles.link} ${styles.nav}`} to="/">
                <i className="fa-solid fa-right-from-bracket"></i>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
