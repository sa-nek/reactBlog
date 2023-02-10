import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

const EditPost = ({ posts, editPost, setEditPost, handleEdit }) => {
  const id = useParams().id;
  const editedPost = posts.find((post) => post.id.toString() === id);
  useEffect(() => {
    editedPost && setEditPost(editedPost);
  }, [editedPost, setEditPost]);
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
