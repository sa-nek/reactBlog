import React from "react";
import "./styles/CreatePost.css";
import DataContext from "../../context/DataContext";
import { useContext, useState } from "react";
import api from "../../api/Posts";
import { format } from "date-fns";

const CreatePost = () => {
  const { navigation, posts, setPosts } = useContext(DataContext);

  const [createPost, setCreatePost] = useState({
    title: "",
    body: "",
  });
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
  return (
    <main>
      <form onSubmit={handleAddPost} className="createForm">
        <h2>Create Post</h2>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          required
          autoComplete="off"
          placeholder="Title"
          value={createPost.title}
          onChange={(e) =>
            setCreatePost({ ...createPost, title: e.target.value })
          }
        />
        <label htmlFor="body">Text</label>
        <textarea
          type="text"
          id="body"
          required
          rows="6"
          placeholder="Text"
          autoComplete="off"
          value={createPost.body}
          onChange={(e) =>
            setCreatePost({ ...createPost, body: e.target.value })
          }
        />
        <button>Post</button>
      </form>
    </main>
  );
};

export default CreatePost;
