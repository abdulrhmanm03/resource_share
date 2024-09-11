import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserSubData({
  userData,
  numFollowers,
  setNumFollowers,
  numFollows,
  setNumFollows,
}) {
  const [numPosts, setNumPosts] = useState(0);

  async function getFollowData() {
    const response = await fetch(
      `http://localhost:3001/getFollowData/${userData.username}`,
    );
    console.log(response);
    const data = await response.json();
    setNumFollows(data.numFollows);
    setNumFollowers(data.numFollowers);
    console.log(data);
  }

  async function getPostCount() {
    const response = await fetch(
      `http://localhost:3001/getPostCount/${userData.username}`,
    );
    const data = await response.json();
    setNumPosts(data.post_count);
  }

  useEffect(() => {
    getFollowData();
    getPostCount();
  }, [userData]);

  return (
    <div className="extra">
      <Link
        className="e"
        to={`/${userData.username}/followers`}
        state={{ user_id: userData.id }}
      >
        {`${numFollowers} followers`}
      </Link>
      <Link
        className="e"
        to={`/${userData.username}/following`}
        state={{ user_id: userData.id }}
      >
        {`${numFollows} following`}
      </Link>
      <h4 className="e">{`${numPosts} posts`} </h4>
    </div>
  );
}
