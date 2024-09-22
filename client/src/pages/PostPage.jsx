import FullPost from "../components/Post/FullPost";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function PostPage() {
  const location = useLocation();
  const post = location.state;
  const { post_id } = useParams();

  return (
    <>
      <FullPost post_id={post_id} post={post} />
    </>
  );
}
