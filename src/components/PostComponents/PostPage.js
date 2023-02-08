import React from "react";
import "./styles/PostArticle.css";
import { useParams } from "react-router-dom";
import deleteBtn from "./deleteBtn.svg";
const PostPage = ({ posts, navigation, handleDeletePost }) => {
  const { id } = useParams();
  const returnPost = (post) => (
    <article className="postArticle">
      <h2 className="singleTitle">{post.title}</h2>
      <p className="singleDate">{post.datetime}</p>
      <p className="singleBody">{post.body}</p>
      <button className="deleteBtn" onClick={(e) => handleDeletePost(post.id)}>
        <img src={deleteBtn} alt="delBtn" />
      </button>
    </article>
  );
  const post = posts.find((post) => post.id.toString() === id);
  return (
    <main>
      {post ? (
        returnPost(post)
      ) : (
        <p style={{ padding: "1rem", fontSize: "1.5rem", color: "whitesmoke" }}>
          Not Found
        </p>
      )}
      <button className="homeBtn" onClick={(e) => navigation("/")}>
        Home
      </button>
    </main>
  );
};

export default PostPage;
