import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import About from "./components/About";
import CreatePost from "./components/PostComponents/CreatePost";
import PostPage from "./components/PostComponents/PostPage";
import "./styles/Layout.css";
import EditPost from "./components/PostComponents/EditPost";
import { DataProvider } from "./context/DataContext";
function App() {
  return (
    <div className="App">
      <DataProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="post">
              <Route index element={<CreatePost />} />
              <Route path=":id" element={<PostPage />} />
              <Route path=":id/edit" element={<EditPost />} />
            </Route>
            <Route path="about" element={<About />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
