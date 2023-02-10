import React from "react";
import PostArticle from "./PostComponents/PostArticle";
import DataContext from "../context/DataContext";
import { useContext } from "react";

const Home = () => {
  const { searchItems, fetchErr, isLoading } = useContext(DataContext);
  return (
    <main>
      {isLoading && (
        <p
          style={{
            padding: "1rem",
            fontSize: "1.5rem",
            color: "whitesmoke",
            textAlign: "center",
          }}
        >
          Loading posts...
        </p>
      )}
      {!isLoading && fetchErr && (
        <p
          style={{
            padding: "1rem",
            fontSize: "1.5rem",
            color: "whitesmoke",
            textAlign: "center",
          }}
        >
          {fetchErr}
        </p>
      )}
      {!isLoading &&
        !fetchErr &&
        (searchItems.length ? (
          searchItems.map((post) => <PostArticle key={post.id} post={post} />)
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
        ))}
    </main>
  );
};

export default Home;
