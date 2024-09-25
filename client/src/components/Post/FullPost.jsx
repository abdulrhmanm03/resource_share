import { useEffect, useState } from "react";
import { useRegistration } from "../../context/RegistrationContext";
import DeletePostButton from "./DeletePostButton";
import styles from "./postPage.module.css";
import LikeButton from "./LikeButton";

export default function FullPost({ post }) {
  const { user } = useRegistration();

  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [topics, setTopics] = useState("");
  const [content, setContent] = useState({});

  const [isUserPost, setIsUserPost] = useState(false);

  useEffect(() => {
    if (post.username == user.username) {
      setIsUserPost(true);
    }

    setTitle(post.title);
    setOwner(post.username);
    setLastUpdated(post.timestamp);
    setTopics(post.topics);
    setContent(JSON.parse(post.content));
  }, [post, user]);
  return (
    <div className={styles.postcontainer}>
      <div className={styles.maindata}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.username}>by {owner}</p>
        <p className={styles.lastupdated}>{lastUpdated}</p>
      </div>
      <p className={styles.topics}>{topics}</p>
      <ul>
        {Object.keys(content).map((i) => (
          <li key={i} className={styles.subjectcontainer}>
            <a
              href={content[i].link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.subjectcontainer}
            >
              <h3 className={styles.subjecttitle}>{content[i].name}</h3>
              <a className={styles.subjecturl}>{content[i].link}</a>
            </a>
          </li>
        ))}
      </ul>
      <LikeButton post={post} />
      {isUserPost && <DeletePostButton post_id={post.id} />}
    </div>
  );
}
