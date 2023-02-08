import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import About from "./components/About";
import CreatePost from "./components/PostComponents/CreatePost";
import PostPage from "./components/PostComponents/PostPage";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import "./styles/Layout.css";
function App() {
  const navigation = useNavigate();
  const [posts, setPosts] = useState([
    {
      id: 1,
      datetime: "08.02.2023 15:41",
      title: "First post",
      body: "this is testpost 1",
    },
    {
      id: 2,
      datetime: "08.02.2023 15:41",
      title: "test2",
      body: "this is testpost 2",
    },
  ]);
  const [createPost, setCreatePost] = useState({
    title: "",
    body: "",
  });
  const [search, setSearch] = useState("");
  const [searchItems, setSearchItems] = useState([]);
  useEffect(
    (e) => {
      const newArr = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.body.toLowerCase().includes(search.toLowerCase())
      );
      setSearchItems(newArr.reverse());
    },
    [posts, search]
  );
  const handleAddPost = (e) => {
    e.preventDefault();
    const newDate = format(new Date(), "dd.MM.yyyy  HH:mm");
    const newId = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const newItem = { ...createPost, datetime: newDate, id: newId };
    const newArr = [...posts, newItem];
    setPosts(newArr);
    setCreatePost({ title: "", body: "" });
    navigation("/");
  };
  const handleDeletePost = (postId) => {
    const newArr = posts.filter((post) => post.id !== postId);
    setPosts(newArr);
    navigation("/");
  };
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Layout search={search} setSearch={setSearch} />}
        >
          <Route index element={<Home posts={searchItems} />} />
          <Route path="post">
            <Route
              index
              element={
                <CreatePost
                  createPost={createPost}
                  setCreatePost={setCreatePost}
                  handleAddPost={handleAddPost}
                />
              }
            />
            <Route
              path=":id"
              element={
                <PostPage
                  navigation={navigation}
                  posts={posts}
                  handleDeletePost={handleDeletePost}
                />
              }
            />
          </Route>
          <Route path="about" element={<About />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
