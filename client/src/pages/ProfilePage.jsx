import Profile from "../components/profile/profile";
import FetchUserPosts from "../components/Post/FetchUserPosts";
import { useRegistration } from "../context/RegistrationContext";

function ProfilePage() {
  const { user } = useRegistration();
  const username = user.username;

  return (
    <>
      <Profile />
      {username && <FetchUserPosts username={username} />}
    </>
  );
}

export default ProfilePage;
