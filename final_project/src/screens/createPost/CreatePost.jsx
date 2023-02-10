import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./createpost.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Submitting Title: ${title} and Text: ${text}`);
    setTitle("");
    setText("");
  };

  return (
    <div className="create-post">
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputbox">
          <label htmlFor="title">Title:</label>
          <input
            required="required"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title for your post"
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">Text:</label>
          <ReactQuill
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter the text for your post"
          />
        </div>
        <div>
        <button className="createButton"> CREATE POST
</button>
   
</div>
 
        
        
      </form>
    </div>
  );
};

export default CreatePost;
