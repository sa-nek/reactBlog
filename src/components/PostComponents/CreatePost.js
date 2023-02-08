import React from "react";
import "./styles/CreatePost.css";

const CreatePost = ({ handleAddPost, createPost, setCreatePost }) => {
  return (
    <main>
      <form onSubmit={handleAddPost} className="createForm">
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
