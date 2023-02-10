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
import api from "./api/Posts";
import EditPost from "./components/PostComponents/EditPost";
function App() {
  const navigation = useNavigate();
  const [posts, setPosts] = useState([]);
  const [createPost, setCreatePost] = useState({
    title: "",
    body: "",
  });
  const [editPost, setEditPost] = useState({
    title: "",
    body: "",
  });
  const [search, setSearch] = useState("");
  const [searchItems, setSearchItems] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        setPosts(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, []);
  useEffect(() => {
    const newArr = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
    );
    setSearchItems(newArr.reverse());
  }, [posts, search]);
  const handleAddPost = (e) => {
    e.preventDefault();
    const newDate = format(new Date(), "dd.MM.yyyy  HH:mm");
    const newId = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const newItem = {
      ...createPost,
      datetime: newDate,
      id: newId,
      edittime: null,
    };
    try {
      const pushPost = async (post) => {
        const response = await api.post("/posts", post);
        const newArr = [...posts, response.data];
        setPosts(newArr);
      };
      pushPost(newItem);
      setCreatePost({ title: "", body: "" });
      navigation("/");
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeletePost = (postId) => {
    const delApi = async (id) => {
      try {
        await api.delete(`/posts/${id}`);
        const newArr = posts.filter((post) => post.id !== postId);
        setPosts(newArr);
      } catch (err) {
        console.log(err);
      }
    };
    delApi(postId);
    navigation("/");
  };
  const handleEdit = async (id) => {
    const newArr = posts.map((post) =>
      post.id === editPost.id ? editPost : post
    );
    try {
      await api.put(`/posts/${id}`, editPost);
      setPosts(newArr);
    } catch (err) {
      console.log(err);
    }
    setEditPost({
      title: "",
      body: "",
    });
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
            <Route
              path=":id/edit"
              element={
                <EditPost
                  posts={posts}
                  editPost={editPost}
                  setEditPost={setEditPost}
                  handleEdit={handleEdit}
                  navigation={navigation}
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
