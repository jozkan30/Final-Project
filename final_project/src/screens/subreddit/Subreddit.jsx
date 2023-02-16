import React from "react";
import "./subreddit.css";
import Post from "../../components/posts/Post";
import PostModal from "../../components/posts/PostModal";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPosts, getPost } from "../../services/posts";
import { getComments } from "../../services/comments";
import { getSubs, getSub } from "../../services/subs";
import { useParams } from "react-router-dom";


export default function Subreddit() {
  const [posts, setPosts] = useState([]);
  const [modalPost, setModalPost] = useState({});
  const [displayModal, setDisplayModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [subTitle, setSubTitle] = useState([]);
  const [subDescription, setSubDescription] = useState([]);
  const [creator, setCreator] = useState([]);
  let {id} = useParams();

  async function fetchSub(){
    
    const res = await getSub(id)
    const ids = res
    setSubTitle(ids.title)
    setCreator(ids.creator)
    setSubDescription(ids.description)
    // console.log(ids)
  }
  fetchSub()

  useEffect(() => {
    fetchPosts();
  }, [id]);

  async function fetchPosts() {
    const allPosts = await getPosts();
    const subID = allPosts[id].sub
    // console.log(`sub id: ${subID}`)
    // console.log(`post subid: ${allPosts[id].sub}`)
    // console.log(`posts: ${allPosts}`)

    setPosts(allPosts.filter(post => {
      // console.log(post)
      console.log(id)
      return post.sub == id
    }));


    console.log(posts)
  //   fetchPost()
  // async function fetchPosts() {
  //   const allPosts = await getPosts();
  //   setPosts(allPosts.filter(post => id === post.sub.id));
  // }
}

  useEffect(() => {
    const fetchComment = async () => {
      const response = await getComments();
      setComments(response);
    };

    fetchComment();
  }, []); 


  return (
      <div className="home-page-main-container">
      
      {/* request the "Subs" title, link,  followers, comments, upVotes and downVotes from the subs Library using the subs id
      comments tab will display a number of comment total instances.
      upvotes/downvotes will be a function of "upVotes - downVotes" situated in between their respective buttons.
      followers will show a total number of users following the current sub.  by gettting the length of the table array for folllower id's in the subs table we get a total number of followers*/}
      <div id ='subredditHeader'>
        <img id ='user-avatar' src="https://icon-library.com/images/generic-user-icon/generic-user-icon-10.jpg" alt='user avatar'></img>
        <div id = 'title-subLink-join'>
          <h1 id ='sub-title'>{subTitle}</h1>
          <Link to ='/readmex2' id = 'sub-link'>r/{subTitle}</Link>
        </div>
        {/* onClick, add subredditId to user list of subreddit id's. if it exists within the user library then button should read "Joined" if clicked in this state button should remove subreddit id from the user library and read "Join".*/}
        <button id = "join-button">Join</button>
        {/* requiest the subreddit description from the subs table */}
        <p id ='subreddit-description'>{subDescription}</p>
        {/* contains functions for filtering for: chronological order, highest upvotes, and highest upvotes in a 24h time frame. picking any of the list items will change the state of the page.*/}
        <div id = 'filter-div'>
          <label for ='post-filters'className = 'drop-down-menu' id ='subreddit-banner-dropdown-menu-label'>Post Filters:  </label>
          <select name = 'post-filters' id = 'post-filter-options'>
            <option value = 'trending'>Trending</option>
            <option value = 'mostUpVotes'>Most Upvotes</option>
            <option value = 'mostDownVotes'>Most Downvotes</option>
          </select>
        </div>
      </div>
    {/* if join-subreddit == Join clicked. check if user object contains subreddit-ID then change button to Joined if not display join */}
    {posts.map((post) => (
          <Post
            key={post.id}
            setDisplayModal={setDisplayModal}
            setModalPost={setModalPost}
            post={post}
            comments={comments}
          />
        ))}

<PostModal
        modalPost={modalPost}
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
        comments={comments}
        setComments={setComments}
        />
    </div>
    
  );
}
