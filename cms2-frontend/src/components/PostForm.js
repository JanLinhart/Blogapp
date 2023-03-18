import React,{useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FileBase64 from 'react-file-base64';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import Select from './Select';
import Cookies from 'js-cookie';

const PostForm = () => {
    const [header, setHeader] = useState("");
    const [state, setState] = useState("");
    const [wysiwygData, setWysiwygData] = useState({});
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const handleSelectChange = (values) => {
        setCategories(values);
      };


    let { userId } = useParams();

    function getFiles(files){
        setState(files)
      }
 
    const HandleSubmit = async (event) => {
        const date = new Date();
        const formData = new FormData();
        
        formData.append("file", state.base64)
        formData.append("postContent",JSON.stringify({title : header, description : wysiwygData, date : date, authorId : userId, categories: categories}))
        
        const jwt = Cookies.get('jwt');

        const requestOptions = {
            method: 'POST',
            body: formData,
            headers:
              {
                Authorization: `Bearer ${jwt}`
              }
        };

            console.log('Making a fetch request...');
            const res = await fetch('/posts', requestOptions)
            .then(navigate(`/posts/${userId}`));

              event.preventDefault();
              

    }

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
    return (
        <div className='flex justify-center text-center'>
            <div style={{background: '#343541',textAlign: 'center', padding:'10px', borderRadius:'5px'}}>
            <h1 style={{color: 'white'}}>Form</h1>
            <form onSubmit={HandleSubmit}
			className="form">
            
            {/* <label>Enter blog post body:</label><input className='w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="text" value={body} name="text" onChange={(e) => setBody(e.target.value)}/> */}
            <label style={{color: 'white'}}>Enter blog post header:</label><input className='w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="text" value={header} name="text" onChange={(e) => setHeader(e.target.value)}/>
            <div className='mt-3'>
            <CKEditor
                    editor={ Editor }
                    config={editorConfig}
                    data={wysiwygData}
                    onReady={ editor => {
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                        setWysiwygData(data)
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
            </div>
            <div className="mt-3" style={{color: 'white'}}>
                <FileBase64
                multiple={ false }
                onDone={ getFiles.bind(this) }
                />
            </div>
            <div className="mt-3" style={{color: 'black'}}>
                <Select onSelectChange={handleSelectChange} />
            </div>
		        <button className='mt-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center' type="submit">Add blog post</button>
		    </form>
            </div>
        </div>
    );
}

export default PostForm;
