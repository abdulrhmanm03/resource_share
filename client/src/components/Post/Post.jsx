import { useEffect, useState } from "react";
import "./Post.css";

function Post() {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    async function getposts() {
      const response = await fetch(`http://localhost:3001/getPosts`);
      setPosts(await response.json());
    }

    getposts();
  }, []);

  return (
    <div className="post">
      <ul className="post">
        {Object.keys(posts).map((i) => (
          <li className="post" key={posts[i].id}>
            <h1 className="posttitle">{posts[i].title}</h1>
            <hr className="post" />
            <p className="posttopics">{posts[i].topics}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Post;
