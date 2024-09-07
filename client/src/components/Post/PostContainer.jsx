import { useNavigate } from "react-router-dom";
import "./PostContainer.css";
import LikeButton from "./LikeButton";

// TODO: add prop validation
function PostContainer({ posts }) {
  const navigate = useNavigate();

  function openPost(post_id) {
    navigate(`/post/${post_id}`);
  }

  function goToUser(e, username) {
    e.stopPropagation();
    navigate(`/user/${username}`);
  }

  return (
    <div className="post">
      <ul className="post">
        {Object.keys(posts).map((i) => (
          <li
            className="post"
            key={posts[i].id}
            onClick={() => openPost(posts[i].id)}
          >
            <div>
              <h1 className="posttitle">{posts[i].title}</h1>
              <p
                className="postusername"
                onClick={(e) => goToUser(e, posts[i].username)}
              >
                {posts[i].username}
              </p>
            </div>
            <hr className="post" />
            <p className="posttopics">{posts[i].topics}</p>
            <LikeButton post={posts[i]} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostContainer;
