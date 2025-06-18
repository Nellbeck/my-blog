// src/Home.tsx
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

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
    <div style={{ padding: "2rem" }}>
      <h1>Blogginlägg</h1>
      {posts.length === 0 && <p>Inga inlägg än.</p>}
      {posts.map((post) => (
        <article key={post.id} style={{ marginBottom: "2rem" }}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <small>
            {new Date(post.createdAt.seconds * 1000).toLocaleString()}
          </small>
        </article>
      ))}
    </div>
  );
}
