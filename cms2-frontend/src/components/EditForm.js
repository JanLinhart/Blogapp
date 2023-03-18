import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import Cookies from 'js-cookie';
import FileBase64 from 'react-file-base64';
import Select from "./Select";

function EditForm() {
  const editorConfig = {
    toolbar: {
        items: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'outdent',
            'indent',
            '|',
            'imageUpload',
            'blockQuote',
            'insertTable',
            'mediaEmbed',
            'undo',
            'redo'
        ]
    },
    language: 'cs',
    image: {
        toolbar: [
            'imageTextAlternative',
            'toggleImageCaption',
            'imageStyle:inline',
            'imageStyle:block',
            'imageStyle:side'
        ]
    },
    table: {
        contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells'
        ]
    }
};
  const navigate = useNavigate();
  let { postId } = useParams();
  const { userId } = useParams();

  const [state, setState] = useState("");
  const [files, setFiles] = useState("");
  var postUrl = "/posts/" + postId;

  function getFiles(files){
    setFiles(files)
  }

  const getApiData = async () => {
    const jwt = Cookies.get('jwt');
    const response = await fetch(postUrl, {headers:{
      Authorization: `Bearer ${jwt}`
    }}).then((response) => response.json());
    setState(response);
    setHeader(response.title)
    setWysiwygData(response.description)
  };

  useEffect(() => {
    getApiData();
  }, []);

  const [header, setHeader] = useState(state.title);
  const [wysiwygData, setWysiwygData] = useState(state.description);

  const HandleSubmit = (event) => {
    const date = new Date();
    const formData = new FormData();
        
    formData.append("file", files.base64)
    formData.append("postContent",JSON.stringify({ title: header, body: wysiwygData, date: date, authorId : userId }))
    
    const requestOptions = {
      method: "PUT",
      body: formData,
    };
    fetch("/posts/" + postId, requestOptions);

    event.preventDefault();
    navigate(`/posts/${userId}`)
  };
  return (
    <div className="flex justify-center text-center">
      <div>
        <h1>Edit Form</h1>
        <form onSubmit={HandleSubmit} className="form">
          <label>Enter blog post header:</label>
          <input
            className="w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={state.title}
            type="text"
            value={header}
            name="text"
            onChange={(e) => setHeader(e.target.value)}
          />
          <CKEditor
            editor={Editor}
            config={editorConfig}
            data={wysiwygData}
            onReady={(editor) => {
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
              setWysiwygData(data);
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />
          <FileBase64
            multiple={ false }
            onDone={ getFiles.bind(this) } />
            <div className="mt-3" style={{color: 'black'}}>
                <Select />
            </div>
          <button
            type="submit"
            className="mt-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
          >
            Edit blog post
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditForm;
