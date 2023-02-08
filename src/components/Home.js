import React from "react";
import PostArticle from "./PostComponents/PostArticle";

const Home = ({ posts }) => {
  return (
    <main>
      {posts.length ? (
        posts.map((post) => <PostArticle key={post.id} post={post} />)
      ) : (
        <p
          style={{
            padding: "1rem",
            fontSize: "1.5rem",
            color: "whitesmoke",
            textAlign: "center",
          }}
        >
          No posts
        </p>
      )}
    </main>
  );
};

export default Home;
