import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Admin from "./Admin";
import RequireAuth from "./RequireAuth";
import Home from "./Home";
import SidebarMenu from "./components/SidebarMenu";
import Contact from "./Contact";

function App() {
  return (
    <Router>
      <SidebarMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
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

