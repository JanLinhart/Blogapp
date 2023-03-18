import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import loadingCircle from "../lib/img/09b24e31234507.564a1d23c07b4.gif";
import BlogContext from "../context/BlogContext";

function PostFeed() {
    const [isLoading, setIsLoading] = useState(true);
    const { userId } = useParams();
    const  posts  = useContext(BlogContext);
    const [state, setState] = useState(posts);
    const [query, setQuery] = useState('');

    const handleInputChange = (event) => {
      setQuery(event.target.value);
    };
    
    const handleSearch = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/search?query=${query}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .catch(error => console.error(error));
        setState(response);
        setIsLoading(false)
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleDelete = async (id, event) => {
      alert("Post number:" + id + "is being deleted");
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      await fetch("/posts/" + id, requestOptions);
  
      setState(state.filter((post) => post._id !== id));
      event.preventDefault();
    };
  
    const getContextData = async () => {
      setIsLoading(true);
      const filteredResponse = await posts;
      setState(filteredResponse);
      setIsLoading(false);
    };
  
  
    useEffect(() => {
      getContextData();
    }, [posts, userId]);
  
  return (
    <>
    <div className="flex flex-col content-around text-center items-center">
      <input
        className="w-48 mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="text"
        name="text"
        value={query} 
        onChange={handleInputChange}
      />
      <button className="bg-blue-500 mt-3 w-40 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center" onClick={handleSearch}>Search</button>
    </div>
    {isLoading || !posts.length ? (
      <div className="flex justify-center">
          <img src={loadingCircle} />
      </div>
      
    ) : (
      state.map((item) => (
        <div className="flex justify-center">
          <div className="bg-gray-200 w-80 text-center mt-5 p-5">
            <>
              <img src={item.image} />
              <div className="text-2xl font-bold text-white-500 underline text-center">
                {item.title}
              </div>
              <Link
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
                to={{ pathname: "/" + userId + "/Detail/" + item._id }}
                state={{ item }}
              >
                Detail
              </Link>
              <Link
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded text-center"
                to={"/" + userId + "/Edit/" + item._id}
              >
                Edit
              </Link>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-center"
                onClick={(e) => handleDelete(item._id, e)}
              >
                Delete
              </button>
            </>
          </div>
        </div>
        ))
    )}
  </>
  )
}

export default PostFeed