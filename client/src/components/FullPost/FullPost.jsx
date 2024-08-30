// NOTE: user should see all the info about the post
// - titel
// - topics
// - links
// - comments
// - owner
// - likes count
// - time posted and updated

import { useEffect } from "react";
import PropTypes from "prop-types";

export default function FullPost({ post_id }) {
  useEffect(() => {
    async function getpost(post_id) {
      const response = await fetch(`http://localhost:3001/getPost/${post_id}`);
      const res = await response.json();
      console.log(res);
    }
    getpost(post_id);
  });
  return (
    <div>
      <h1>title</h1>
      <p>owner</p>
      <p>last updated</p>
      <p>topics</p>
      <div>links</div>
    </div>
  );
}

FullPost.propTypes = {
  post_id: PropTypes.string.isRequired, // Specify the expected type and whether it is required
};
