import { useEffect, useState } from "react";
import { API_URL } from "../../constants";

const PostLists = () => {
  const [posts, setPosts] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(false);

  // Fetch posts from API
  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch(`${API_URL}/posts`);
        if (response.ok) {
          const json = await response.json();
          setPosts(json);
        } else {
          throw response;
        }
      } catch (e) {
        setError("An error occurred while loading posts...");
        console.log("Error: ", e);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, [])

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="post-container">
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  )
}

export default PostLists