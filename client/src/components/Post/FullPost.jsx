// NOTE: user should see all the info about the post
// - titel
// - topics
// - links
// - comments
// - owner
// - likes count
// - time posted and updated

import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DeletePostButton from "./DeletePostButton";

export default function FullPost({ post_id }) {
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [topics, setTopics] = useState("");
  const [content, setContent] = useState({});

  useEffect(() => {
    async function getpost(post_id) {
      const response = await fetch(`http://localhost:3001/getPost/${post_id}`);
      const res = await response.json();
      setTitle(res.title);
      setOwner(res.username);
      setLastUpdated(res.timestamp);
      setTopics(res.topics);
      setContent(JSON.parse(res.content));
      console.log(res);
    }
    getpost(post_id);
  }, [post_id]);
  return (
    <div>
      <h1>{title}</h1>
      <p>{owner}</p>
      <p>{lastUpdated}</p>
      <p>{topics}</p>
      <ul>
        {Object.keys(content).map((i) => (
          <li key={i}>
            <h4>{content[i].name}</h4> <a>{content[i].link}</a>
          </li>
        ))}
      </ul>
      <DeletePostButton post_id={post_id} />
    </div>
  );
}

FullPost.propTypes = {
  post_id: PropTypes.string.isRequired, // Specify the expected type and whether it is required
};
