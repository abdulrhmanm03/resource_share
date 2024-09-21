import styles from "./postPage.module.css";

export default function DeletePostButton({ post_id }) {
  async function deletPost(post_id) {
    console.log(post_id);
    const response = await fetch("http://localhost:3001/deletePost", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post_id: post_id }),
    });
    console.log(response);
  }

  return (
    <button className={styles.button} onClick={() => deletPost(post_id)}>
      delete
    </button>
  );
}
