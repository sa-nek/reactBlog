import React from "react";
import "./styles/PostArticle.css";
import { useParams } from "react-router-dom";
import deleteBtn from "./deleteBtn.svg";
import editBtn from "./editBtn.svg";
import { useContext } from "react";
import DataContext from "../../context/DataContext";
import api from "../../api/Posts";
const PostPage = () => {
  const { posts, navigation, setPosts } = useContext(DataContext);
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
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
  const returnPost = (post) => (
    <article className="postArticle">
      <h2 className="singleTitle">{post.title}</h2>
      <p className="singleDate">{post.datetime}</p>
      <p className="singleBody">{post.body}</p>
      {post.edittime && (
        <p className="singleDate">{`edited: ${post.edittime}`}</p>
      )}
      <button className="deleteBtn" onClick={(e) => handleDeletePost(post.id)}>
        <img src={deleteBtn} alt="delBtn" />
      </button>
      <button
        className="editBtn"
        onClick={(e) => {
          navigation(`post/${id}/edit`);
        }}
      >
        <img src={editBtn} alt="editBtn" />
      </button>
    </article>
  );
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
