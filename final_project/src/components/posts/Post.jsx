import React from "react";
import "./post.css";
import { useState, useEffect } from "react";
import { getComments, getComment } from "../../services/comments.js";
import { getPost, getPosts } from "../../services/posts";

export default function Post({ key, post, setModalPost, setDisplayModal, modalPost, comments }) {
  function handleClick() {
    console.log("Modal was clicked");
    setModalPost(post);
    setDisplayModal(true);
    document.body.classList.add("no-scroll");
  }
const [upvote, setUpvote] = useState('')

function handleUpvote(){
console.log('Upvote button clicked')
}

function handleDownvote(){
console.log('downvote button clicked')
}

  


  return (
    <div key = {key} onClick={handleClick} className="post-card">
      <h2 id="title">{post.title} </h2>
      <img src={`${post.img_url}`} alt={`${post.id}`} />
      <div id="votes-div">
        <span className="votes" id="upVotes" onClick={handleUpvote}>
          {" "}
          ⬆:{post.up_votes}{" "}
        </span>
        <br />
        <span className="votes" id="downVotes" onClick={handleDownvote}>
          {" "}
          ⬇: {post.down_votes}{" "}
        </span>
        <p id="comments-tab"> {comments.filter(comment => comment.post === post.id).length}  people are talking about this 💬 </p>
      </div>
    </div>
  );
}
