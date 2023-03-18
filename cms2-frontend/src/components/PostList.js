import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import loadingCircle from "../lib/img/09b24e31234507.564a1d23c07b4.gif";
import BlogContext from "../context/BlogContext";
import {InlineShareButtons} from 'sharethis-reactjs';

function PostList() {
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useParams();
  const  posts  = useContext(BlogContext);
  const [state, setState] = useState(posts);

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
    const filteredResponse = await posts.filter((post) => post.author == userId);
    setState(filteredResponse);
    setIsLoading(false);
  };


  useEffect(() => {
    getContextData();
  }, [posts, userId]);

  return (
    <>
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
                <InlineShareButtons
          config={{
            alignment: 'center',  // alignment of buttons (left, center, right)
            color: 'social',      // set the color of buttons (social, white)
            enabled: true,        // show/hide buttons (true, false)
            font_size: 16,        // font size for the buttons
            labels: 'cta',        // button labels (cta, counts, null)
            language: 'en',       // which language to use (see LANGUAGES)
            networks: [           // which networks to include (see SHARING NETWORKS)
              'twitter'
            ],
            padding: 12,          // padding within buttons (INTEGER)
            radius: 4,            // the corner radius on each button (INTEGER)
            size: 40,             // the size of each button (INTEGER)
 
            description: item.description,       
            title: item.description,            
          }}
        />
              </>
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default PostList;
