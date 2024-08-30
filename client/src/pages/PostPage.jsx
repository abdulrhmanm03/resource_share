import Navbar from "../components/Navbar/Navbar";
import FullPost from "../components/FullPost/FullPost";
import { useParams } from "react-router-dom";

export default function PostPage() {
  const { post_id } = useParams();

  return (
    <>
      <Navbar />
      <FullPost post_id={post_id} />
    </>
  );
}
