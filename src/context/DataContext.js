import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../customHooks/useAxios";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const navigation = useNavigate();
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchItems, setSearchItems] = useState([]);

  const { data, fetchErr, isLoading } = useAxios("http://localhost:3001/posts");

  useEffect(() => {
    setPosts(data);
  }, [data]);

  useEffect(() => {
    const newArr = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
    );
    setSearchItems(newArr.reverse());
  }, [posts, search]);
  return (
    <DataContext.Provider
      value={{
        search,
        setSearch,
        setPosts,
        fetchErr,
        isLoading,
        posts,
        searchItems,
        navigation,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export default DataContext;
