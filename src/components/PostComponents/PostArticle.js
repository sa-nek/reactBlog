import React from "react";
import { Link } from "react-router-dom";
import "./styles/PostArticle.css";
const PostArticle = ({ post }) => {
  return (
    <article className="postArticle">
      <Link to={`post/${post.id}`} className="postLink">
        <h2>
          {post.title.length > 25
            ? `${post.title.slice(0, 20)}...`
            : post.title}
        </h2>
        <p>{post.datetime}</p>
      </Link>
      <p>
        {post.body.length > 25 ? `${post.body.slice(0, 100)}...` : post.body}
      </p>
    </article>
  );
};

export default PostArticle;
