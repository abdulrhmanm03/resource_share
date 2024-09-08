import FetchUserPosts from "../components/Post/FetchUserPosts";
import { useParams } from "react-router-dom";
import GetUserProfile from "../components/profile/GetUserProfile";

function ProfilePage() {
  const { username } = useParams();

  return (
    <>
      <GetUserProfile username={username} />
      {username && <FetchUserPosts username={username} />}
    </>
  );
}

export default ProfilePage;
