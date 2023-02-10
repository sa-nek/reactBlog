import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useContext } from "react";
import DataContext from "../../context/DataContext";
import api from "../../api/Posts";

const EditPost = () => {
  const { posts, setPosts, navigation } = useContext(DataContext);
  const id = useParams().id;
  const [editPost, setEditPost] = useState({
    title: "",
    body: "",
  });
  const editedPost = posts.find((post) => post.id.toString() === id);
  useEffect(() => {
    editedPost && setEditPost(editedPost);
  }, [editedPost, setEditPost]);
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
    <main>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEdit(id);
        }}
        className="createForm"
      >
        <h2>Edit Post</h2>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          required
          autoComplete="off"
          placeholder="Title"
          value={editPost.title}
          onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
        />
        <label htmlFor="body">Text</label>
        <textarea
          type="text"
          id="body"
          required
          rows="6"
          placeholder="Text"
          autoComplete="off"
          value={editPost.body}
          onChange={(e) => setEditPost({ ...editPost, body: e.target.value })}
        />
        <button
          type="submit"
          onClick={(e) => {
            const editedtime = format(new Date(), "dd.MM.yyyy  HH:mm");
            setEditPost({ ...editPost, edittime: editedtime });
          }}
        >
          Edit
        </button>
      </form>
    </main>
  );
};

export default EditPost;
