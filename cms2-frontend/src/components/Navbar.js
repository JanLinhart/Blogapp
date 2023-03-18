import React from 'react'
import { Link, useParams } from 'react-router-dom';

function Navbar() {
  const { userId } = useParams();
  return (
<>
{/* <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
        <div class="flex items-center">
            <Link to="login" >Login</Link>
            <Link to="register ml-5" >Register</Link>
            <a href="#" class="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">Login</a>
            <a href="#" class="ml-5 text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">Register</a>
            <Link className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline" to={"/login"}>Login</Link>
            <Link className="ml-5 text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline" to={"/register"}>Register</Link>
        </div>
    </div>
</nav> */}
<nav class="bg-gray-50 dark:bg-gray-700">
    <div class="max-w-screen-xl px-4 py-3 mx-auto md:px-6">
        <div class="flex items-center">
            <ul class="flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium">
                {userId ? <li><Link to="register">Logout</Link></li> : <></>}
                {userId ? <></> : <li><Link to="login">Login</Link></li> }
                {userId ? <></> : <li><Link to="register" className='ml-5'>Register</Link></li>}
                {userId ? <li><Link to={`/feed/${userId}`} className='ml-5'>Feed</Link></li> : <></> }
                {userId ? <li><Link to={"/" + userId + "/" + "Admin"} className='ml-5'>Admin</Link></li> : <></>}
                {userId ? <li><Link to={`/posts/${userId}`} className='ml-5'>My posts</Link></li> : <></>}
                {/* <li>
                    <a href="#" class="text-gray-900 dark:text-white hover:underline">Team</a>
                </li>
                <li>
                    <a href="#" class="text-gray-900 dark:text-white hover:underline">Features</a>
                </li> */}
            </ul>
        </div>
    </div>
</nav>
</>

  )
}

export default Navbar