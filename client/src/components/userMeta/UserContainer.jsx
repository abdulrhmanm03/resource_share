import { useNavigate } from "react-router-dom";
import { useRegistration } from "../../context/RegistrationContext";
import FollowButton from "../profile/FollowButton";
import styles from "./userMeta.module.css";

export default function UserContainer({ userMeta }) {
  const { user } = useRegistration();
  const ImageSrc = `http://localhost:3001/uploads/`;

  const navigate = useNavigate();

  function isOwnAccount(user_id) {
    return user_id == user.id;
  }
  return (
    <>
      {userMeta.map((user_i) => (
        <div
          className={styles.usermetacontainer}
          key={user_i.username}
          onClick={() => navigate(`/user/${user_i.username}`)}
        >
          <img
            src={ImageSrc + user.image}
            alt=""
            className={styles.profileimg}
          />
          <div className={styles.userdata}>
            <h3>{user_i.username}</h3>
            <p>{user_i.bio}</p>
            {!isOwnAccount(user_i.id) && <FollowButton userData={user_i} />}
          </div>
        </div>
      ))}
    </>
  );
}
