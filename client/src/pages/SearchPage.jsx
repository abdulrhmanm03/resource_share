import { useLocation } from "react-router-dom";
import PostContainer from "../components/Post/PostContainer";

export default function SearchPage() {
  const location = useLocation();
  const posts = location.state || {};

  return (
    <>
      <PostContainer posts={posts} />
    </>
  );
}
