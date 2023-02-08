import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router basename="/reactBlog">
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);