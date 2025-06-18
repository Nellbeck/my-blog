import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Admin from "./Admin";
import RequireAuth from "./RequireAuth";
import Home from "./Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
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

