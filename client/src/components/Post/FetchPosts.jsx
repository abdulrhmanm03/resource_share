import { useEffect, useState } from "react";
import PostContainer from "./PostContainer";

export default function FetchPosts() {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    async function getposts() {
      const response = await fetch(`http://localhost:3001/getPosts`);
      setPosts(await response.json());
    }

    getposts();
  }, []);

  return <PostContainer posts={posts} />;
}
