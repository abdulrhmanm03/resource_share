import { useRegistration } from "../../context/RegistrationContext";
import FollowButton from "../profile/FollowButton";

export default function UserContainer({ userMeta }) {
  const { user } = useRegistration();
  const ImageSrc = `http://localhost:3001/uploads/`;

  function isOwnAccount(user_id) {
    return user_id == user.id;
  }
  return (
    <>
      {userMeta.map((user_i) => (
        <div key={user_i.username}>
          {/* <img src={ImageSrc + user.image} alt="" /> */}
          <h3>{user_i.username}</h3>
          <h4>{user_i.image}</h4>
          <p>{user_i.bio}</p>
          {!isOwnAccount(user_i.id) && <FollowButton userData={user_i} />}
        </div>
      ))}
    </>
  );
}
