import FullPost from "../components/Post/FullPost";
import { useParams } from "react-router-dom";

export default function PostPage() {
  const { post_id } = useParams();

  return (
    <>
      <FullPost post_id={post_id} />
    </>
  );
}
