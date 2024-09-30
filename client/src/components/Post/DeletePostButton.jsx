import { useNavigate } from "react-router-dom";
import styles from "./postPage.module.css";

export default function DeletePostButton({ post_id }) {
  const navigate = useNavigate();
  async function deletPost(post_id) {
    console.log(post_id);

    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3001/deletePost", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ post_id: post_id }),
    });
    navigate("/");
    console.log(response);
  }

  return (
    <button className={styles.button} onClick={() => deletPost(post_id)}>
      delete
    </button>
  );
}
