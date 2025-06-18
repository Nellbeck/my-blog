import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import RequireAuth from "./pages/RequireAuth";
import Home from "./pages/Home";
import SidebarMenu from "./components/SidebarMenu";
import Contact from "./pages/Contact";
import PostDetail from "./pages/PostDetail";

function App() {
  return (
    <Router>
      <SidebarMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <Admin />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

