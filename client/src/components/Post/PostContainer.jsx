import { useNavigate } from "react-router-dom";
import styles from "./postContainer.module.css";
import LikeButton from "./LikeButton";

// TODO: add prop validation
export default function PostContainer({ posts }) {
  const navigate = useNavigate();

  function openPost(post) {
    navigate(`/post/${post.id}`, { state: post });
  }

  function goToUser(e, username) {
    e.stopPropagation();
    navigate(`/user/${username}`);
  }

  return (
    <div className={styles.post}>
      <ul className={styles.post}>
        {Object.keys(posts).map((i) => (
          <li
            className={styles.post}
            key={posts[i].id}
            onClick={() => openPost(posts[i])}
          >
            <div>
              <h1 className={styles.posttitle}>{posts[i].title}</h1>
              {posts[i].username && (
                <p
                  className={styles.postusername}
                  onClick={(e) => goToUser(e, posts[i].username)}
                >
                  by {posts[i].username}
                </p>
              )}
            </div>
            <hr className={styles.post} />
            <p className={styles.posttopics}>{posts[i].topics}</p>
            <LikeButton post={posts[i]} />
          </li>
        ))}
      </ul>
    </div>
  );
}
