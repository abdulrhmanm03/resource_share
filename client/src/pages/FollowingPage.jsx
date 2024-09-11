import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserContainer from "../components/userMeta/UserContainer";

export default function FollowingPage() {
  const location = useLocation();
  const user_id = location.state.user_id;

  const [userMeta, setUserMeta] = useState([]);

  useEffect(() => {
    async function getFollowing() {
      const response = await fetch(
        `http://localhost:3001/getFollowing/${user_id}`,
      );
      const following = await response.json();
      console.log(following);
      setUserMeta(following);
    }
    getFollowing();
  }, [user_id]);

  return <UserContainer userMeta={userMeta} />;
}
