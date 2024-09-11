import { useLocation } from "react-router-dom";
import PostContainer from "../components/Post/PostContainer";
import Search from "../components/toolBar/Search";

export default function SearchPage() {
  const location = useLocation();
  const posts = location.state || {};

  return (
    <>
      <Search />
      <PostContainer posts={posts} />
    </>
  );
}
