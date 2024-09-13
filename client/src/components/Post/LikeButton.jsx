import { useState, useEffect } from "react";
import { useRegistration } from "../../context/RegistrationContext";
import { useNavigate } from "react-router-dom";
import styles from "./postContainer.module.css";

export default function LikeButton({ post }) {
  const navigate = useNavigate();

  const { user } = useRegistration();
  const { isRegistered } = useRegistration();

  function liked() {
    if (post.liked_by) {
      for (const u of post.liked_by.split(",")) {
        console.log(u == user.username);
        if (user.username == u) {
          return true;
        }
      }
    }
    return false;
  }

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(liked());
  }, [post, user]);

  async function toggleLike(e) {
    e.stopPropagation();
    if (isRegistered) {
      const response = await fetch("http://localhost:3001/toggleLike", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          post_id: post.id,
          is_liked: isLiked,
        }),
      });
      if (response.ok) {
        setIsLiked(!isLiked);
      }
    } else {
      navigate("/auth");
    }
  }

  return (
    <>
      <i
        className={`${styles.postlikes} ${isLiked ? "fa-solid fa-heart" : "fa-regular fa-heart"}`}
        onClick={toggleLike}
      ></i>
    </>
  );
}
