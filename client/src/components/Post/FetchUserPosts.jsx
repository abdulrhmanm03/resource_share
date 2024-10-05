import { useEffect, useState } from "react";
import PostContainer from "./PostContainer";

export default function FetchUserPosts({ username }) {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    async function getposts() {
      const response = await fetch(
        `http://localhost:3001/getUserPosts/${username}`,
      );
      setPosts(await response.json());
    }

    getposts();
  }, [username]);

  return <PostContainer posts={posts} />;
}
