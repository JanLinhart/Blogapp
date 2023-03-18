import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import parse from 'html-react-parser';


function PostDetail() {
  const [html, setHtml] = useState("")
const { state } = useLocation();

useEffect(() => {
  setHtml(state.item.description)
}, [html])

  return (
    <div className='flex justify-center text-center flex-col'>
      <h1>{state.item.title}</h1>
      <div>{state.item.date}</div>
      {parse(html)}
    </div>
  )
}

export default PostDetail