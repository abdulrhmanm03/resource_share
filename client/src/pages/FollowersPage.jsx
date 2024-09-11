import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserContainer from "../components/userMeta/UserContainer";

export default function FollowersPage() {
  const location = useLocation();
  const user_id = location.state.user_id;

  const [userMeta, setUserMeta] = useState([]);

  useEffect(() => {
    async function getFollowers() {
      const response = await fetch(
        `http://localhost:3001/getFollowers/${user_id}`,
      );
      const followrs = await response.json();
      setUserMeta(followrs);
    }
    getFollowers();
  }, [user_id]);

  return <UserContainer userMeta={userMeta} />;
}
