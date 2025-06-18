import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  Timestamp,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

type Post = {
  id: string;
  title: string;
  content: string;
};

export default function Admin() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];
      setPosts(postsData);
    });
    return () => unsubscribe();
  }, []);

  const handlePublish = async () => {
    if (!title || !content) return alert("Fyll i både titel och innehåll");

    try {
      if (editId) {
        const postRef = doc(db, "posts", editId);
        await updateDoc(postRef, {
          title,
          content,
        });
        setEditId(null);
      } else {
        await addDoc(collection(db, "posts"), {
          title,
          content,
          createdAt: Timestamp.now(),
        });
      }

      setTitle("");
      setContent("");
      alert(editId ? "Inlägget uppdaterades!" : "Inlägget publicerades!");
    } catch (error) {
      console.error("Fel vid publicering:", error);
    }
  };

  const handleEdit = (post: Post) => {
    setTitle(post.title);
    setContent(post.content);
    setEditId(post.id);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Är du säker på att du vill ta bort inlägget?")) return;
    try {
      await deleteDoc(doc(db, "posts", id));
    } catch (error) {
      console.error("Fel vid radering:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div style={{ padding: "4rem" }}>
      <h2>Adminpanel</h2>
      <button onClick={handleLogout}>Logga ut</button>

      <h3>{editId ? "Redigera inlägg" : "Skriv nytt inlägg"}</h3>
      <input
        placeholder="Titel"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <br />
      <textarea
        placeholder="Innehåll"
        rows={10}
        cols={50}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handlePublish}>
        {editId ? "Uppdatera inlägg" : "Publicera inlägg"}
      </button>

      <hr />

      <h3>Redigera eller ta bort befintliga inlägg</h3>
      {posts.length === 0 && <p>Inga inlägg än.</p>}
      {posts.map((post) => (
        <div key={post.id} style={{ marginBottom: "1rem" }}>
          <strong>{post.title}</strong>
          <br />
          <button onClick={() => handleEdit(post)}>Redigera</button>{" "}
          <button onClick={() => handleDelete(post.id)}>Ta bort</button>
        </div>
      ))}
    </div>
  );
}
