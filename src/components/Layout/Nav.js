import React from "react";
import { Link } from "react-router-dom";
import "./styles/Nav.css";

const Nav = ({ search, setSearch }) => {
  return (
    <nav className="navBar">
      <ul>
        <Link to="/" className="link">
          <li>Home</li>
        </Link>

        <Link to="/post" className="link">
          <li>Create Post</li>
        </Link>

        <Link to="about" className="link">
          <li>About</li>
        </Link>
      </ul>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          autoComplete="off"
          placeholder="Search Posts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
    </nav>
  );
};

export default Nav;
