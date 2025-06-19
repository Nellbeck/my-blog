import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";

type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: { seconds: number };
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];
      setPosts(postsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ padding: "4rem" }}>
      <h1>Blog Posts</h1>
      {posts.length === 0 && <p>No posts yet.</p>}
      {posts.map((post) => (
        <Link
          key={post.id}
          to={`/post/${post.id}`}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <article
            style={{
              border: "1px solid #ffffff33",
              borderRadius: "8px",
              padding: "1.5rem",
              marginBottom: "2rem",
              backgroundColor: "#102a43",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            <h2>{post.title}</h2>
            <p>
              {(post.content.length > 200
                ? post.content.slice(0, 200) + "..."
                : post.content
              )
                .split("\n\n")
                .map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
              ))}
            </p>
            <small>
              {new Date(post.createdAt.seconds * 1000).toLocaleString()}
            </small>
          </article>
        </Link>
      ))}
    </div>
  );
}

