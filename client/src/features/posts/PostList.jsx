import { useEffect, useState } from "react";
import { API_URL } from "../../constants";
import { Link } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(false);

  // Fetch posts from API
  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch(API_URL);
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

  const deletePost = async (id) => {
    try {
      // DELETE request to: http://localhost:3000/api/v1/posts/:id
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPosts(posts.filter((post) => post.id !== id));
      } else {
        throw response;
      }
    } catch (e) {
      setError(e)
      console.log(`Error deleting post: ${id}`)
      console.log("Error: ", e)
    }
  };

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="post-container">
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
          <div>
            <Link to={`/posts/${post.id}/edit`}>Edit</Link>
            {" | "}
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostList