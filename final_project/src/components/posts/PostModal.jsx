import { useEffect, useRef, useState } from "react";
import "./PostModal.css";
import { updatePost } from "../../services/posts";
import CommentBox from "./CommentBox";
import { createComment, getComments } from "../../services/comments";

function PostModal({ modalPost, displayModal, setDisplayModal, comments, setComments, banana }) {
  const body = document.querySelector("body");

  const handleClose = () => {
    setDisplayModal(false);
    body.classList.remove('freeze-body');
  };

  // const [upVotes, setUpVotes] = useState(0);

  const [upVotes, setUpVotes] = useState(banana);
  const [downVotes, setDownVotes] = useState(modalPost.down_votes);
  
console.log(modalPost)
console.log(upVotes)
  useEffect(() => {
    setUpVotes(modalPost.up_votes)
    setDownVotes(modalPost.down_votes)

  }, []);

  const handleUpVote = async () => {
    let newUpVotes = upVotes + 1;
    console.log("new up votes:", newUpVotes); 
    setUpVotes(newUpVotes);
    const updatedPost = { ...modalPost, up_votes: newUpVotes };
    console.log("updated post:", updatedPost);
    try {
      const response = await updatePost(modalPost.id,{ ...modalPost, up_votes: upVotes});
      console.log("update post response:", response); 
    } catch (error) {
      console.log("update post error:", error);
    }
  };
  
  
  const handleDownVote = async () => {
    const newDownVotes = downVotes + 1;
    setDownVotes(newDownVotes);
    const updatedPost = { ...modalPost, down_votes: newDownVotes };
    try {
      const response = await updatePost(modalPost.id, updatedPost);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleAddComment = async (newComment) => {
    try {
      const response = await addComment(newComment);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async (newComment) => {
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  if (displayModal) {
    body.classList.add("freeze-body");
  }

  return (
    <div className={displayModal ? "post-modal" : "hide-element"}>
      <div className="close-btn-container">
        <div className="modal-title">{modalPost.title}</div>
        <img className="modal-image" src={modalPost.img_url} />
        <div className="texts">
          <div dangerouslySetInnerHTML={{ __html: modalPost.text }} />
        </div>
        <div className="votes-container">
          <div id="votes-div">
            <div className="votes">{upVotes}</div>
            <button className="upvote-button" onClick={handleUpVote}>
              Upvote
            </button>
          </div>
          <div id="votes-div">
            <div className="votes2">{downVotes}</div>
            <button className="downvote-button" onClick={handleDownVote}>
              Downvote
            </button>
          </div>
        </div>
        <div className="comments-container">
          <div className="comments-title">Comments:</div>
          <div className="comments-scrollable">
            {comments
              .filter((comment) => comment.post === modalPost.id)
              .map((comment) => (
                <p key={comment.id} className="comment">{comment.comment}</p>
              ))}
          </div>
        </div>
        <CommentBox postId={modalPost.id} addComment={handleAddComment}  setComments={setComments}/>
        <svg className="close-post-modal" onClick={handleClose}>
          <line
            x1="6"
            y1="30"
            x2="20"
            y2="10"
            stroke="#ffffff        "
            strokeWidth="3"
          />
          <line
            x1="6"
            y1="10"
            x2="20"
            y2="30"
            stroke="#ffffff"
            strokeWidth="3"
          />
        </svg>
      </div>
    </div>
  );
}

export default PostModal;

