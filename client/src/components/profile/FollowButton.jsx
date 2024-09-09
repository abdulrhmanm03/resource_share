import { useEffect, useState } from "react";
import { useRegistration } from "../../context/RegistrationContext";

export default function FollowButton({
  userData,
  numFollowers,
  setNumFollowers,
}) {
  const { user } = useRegistration();

  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    async function getIsFollowing() {
      // Ensure both users are defined before making the request
      if (user?.id && userData?.id) {
        console.log(user.id, userData.id);

        try {
          const response = await fetch(
            `http://localhost:3001/isFollowing?user1=${user.id}&user2=${userData.id}`,
          );
          const data = await response.json();
          if (data.isFollowing) {
            setIsFollowing(true);
          }
        } catch (error) {
          console.error("Error fetching isFollowing data:", error);
        }
      }
    }
    getIsFollowing();
  }, [user, userData]);

  async function toggleFollow() {
    const responce = await fetch(`http://localhost:3001/toggleFollow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user1: user.id, user2: userData.id, isFollowing }),
    });
    if (responce.ok) {
      if (isFollowing) {
        setNumFollowers(numFollowers - 1);
      } else {
        setNumFollowers(numFollowers + 1);
      }
      setIsFollowing(!isFollowing);
    }
  }

  return (
    <button onClick={toggleFollow}>
      {isFollowing ? "following" : "follow"}
    </button>
  );
}
