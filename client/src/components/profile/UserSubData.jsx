import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./profile.module.css";

export default function UserSubData({
  userData,
  numFollowers,
  setNumFollowers,
  numFollowes,
  setnumFollowes,
}) {
  const [numPosts, setNumPosts] = useState(0);

  async function getFollowData() {
    const response = await fetch(
      `http://localhost:3001/getFollowData/${userData.username}`,
    );
    console.log(response);
    const data = await response.json();
    setnumFollowes(data.numFollowes);
    setNumFollowers(data.numFollowers);
    console.log(data);
  }

  async function getPostCount() {
    const response = await fetch(
      `http://localhost:3001/getPostCount/${userData.id}`,
    );
    const data = await response.json();
    setNumPosts(data.post_count);
  }

  useEffect(() => {
    getFollowData();
    getPostCount();
  }, [userData]);

  return (
    <>
      <Link
        className={`${styles.subdata} ${styles.followersandfollowing}`}
        to={`/${userData.username}/followers`}
        state={{ user_id: userData.id }}
      >
        {`${numFollowers} followers`}
      </Link>
      <Link
        className={`${styles.subdata} ${styles.followersandfollowing}`}
        to={`/${userData.username}/following`}
        state={{ user_id: userData.id }}
      >
        {`${numFollowes} following`}
      </Link>
      <h4 className={styles.subdata}>{`${numPosts} posts`} </h4>
    </>
  );
}
