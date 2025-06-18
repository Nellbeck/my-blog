import React, { useState } from "react";
import "./SidebarMenu.css";
import { Link } from "react-router-dom";

const SidebarMenu: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="hamburger" onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </div>

      <div className={`sidebar ${open ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setOpen(false)}></button>
        <ul>
        <li><Link to="/">Blogg</Link></li>
        <li><Link to="/contact">Kontakt</Link></li>
        </ul>
      </div>

      {open && <div className="overlay" onClick={() => setOpen(false)} />}
    </>
  );
};

export default SidebarMenu;
