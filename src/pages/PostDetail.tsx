import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPost({ id: docSnap.id, ...docSnap.data() });
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div style={{ padding: "4rem" }}>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <small>{new Date(post.createdAt.seconds * 1000).toLocaleString()}</small>
    </div>
  );
};

export default PostDetail;
