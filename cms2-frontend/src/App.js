import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import EditForm from "./components/EditForm";
import { Route, Routes, useParams } from 'react-router-dom';
import React, {useEffect, useState}  from 'react';
import Cookies from 'js-cookie';
import PostDetail from "./components/PostDetail";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Layout from "./components/Layout";
import BlogContext from "./context/BlogContext"
import PostFeed from "./components/PostFeed";


function App() {
  const [posts, setPosts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const getApiData = async () => {
    const jwt = Cookies.get('jwt');
    const response = await fetch("/posts", {headers:{
      Authorization: `Bearer ${jwt}`
    }}).then((response) => response.json());
    return await response
  };

  useEffect(() => {
    const isSignedIn = Cookies.get('isSignedIn');
    if(isSignedIn){
      setIsAuthenticated(true);
    }

    async function fetchData() {
        const blogData = await getApiData();
        setPosts(blogData)
    }
    fetchData();

  }, [isAuthenticated]);
return (
  <>
  {isAuthenticated ? (
  <BlogContext.Provider value={posts}>
  <Routes>
      <Route element={<Layout />}>
      <Route path={'/register'} element={<RegisterForm />} />
      <Route path={'/feed/:userId'} element={<PostFeed />} />
      <Route path={'/posts/:userId'} element={<PostList />} />
      <Route path={'/:userId/Admin'} element={<PostForm />} />
      <Route path={'/:userId/Edit/:postId'} element={<EditForm />} />
      <Route path={'/:userId/Detail/:postId'} element={<PostDetail />} />
    </Route>
    </Routes>
  </BlogContext.Provider> ) : (
    <Routes>
      <Route path={'/login'} element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
    </Routes>
  )}
  </>
);
}

export default App;
