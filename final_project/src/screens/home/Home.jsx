import { useState, useEffect } from "react";
import "./home.css";
import Post from "../../components/posts/Post.jsx";
import UserAssets from "../../components/user_assets/UserAssets.jsx";
import PostModal from "../../components/posts/PostModal";
import { getPosts } from "../../services/posts.js";
import { getComments } from "../../services/comments.js";
import { getNews } from "../../services/newsAPI.js";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [articles, setArticles] = useState([]);
  const [modalPost, setModalPost] = useState({});
  const [displayModal, setDisplayModal] = useState(false);


  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const allPosts = await getPosts();
    setPosts(allPosts);
  }

  useEffect(() => {
    const fetchComment = async () => {
      const response = await getComments();
      setComments(response);
    };

    fetchComment();
  }, []);

  useEffect(() => {
    const newsAPI = async () => {
      const response = await getNews();
      setArticles(response.articles);
    };

    newsAPI();
  }, []);

  return (
    <div className="home-page-main-container">
      <div className="news-feed-scroll">
        {articles.map((article) => (
          <div
            key={article.source.id}
            className="news-feed-container"
            style={{
              backgroundImage: `url("${article.urlToImage}")`,
            }}
          >
            <a className="news-anchor" href={article.url} target="blank" rel="noreferrer noopener">
              <div className="news-feed-sub-container">
                <h2 className="news-feed-title">
                  {article.title.length > 40
                    ? article.title.slice(0, 40) + "..."
                    : article.title}
                </h2>
              </div>
            </a>
          </div>
        ))}
      </div>
      <div className="home-page-filter-container">
        <p className="filter-text"> Filter By:</p>
        <ul className="filter-button">
          <select className="filter-dropdown">
            <option value="mostUpVotes">Most Up Votes 👍</option>
            <option value="mostDownVotes">Most Down Votes 👎</option>
            <option value="trending">Trending 🔥</option>
          </select>
        </ul>
      </div>
      <div className="user-assets-container">{/* <UserAssets /> */}</div>
      <div className="home-page-post-container">
        {posts.map((post) => (
          <Post
            key={post.id}
            setDisplayModal={setDisplayModal}
            setModalPost={setModalPost}
            post={post}
            modalPost={modalPost}
            comments = {comments}
          />
        ))}
      </div>
      <PostModal
        modalPost={modalPost}
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
        comments={comments}
        setComments={setComments}
        // banana={modalPost}
      />
    </div>
  );
}
