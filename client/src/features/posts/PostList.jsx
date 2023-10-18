import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deletePost, fetchAllPosts } from "../../services/postService";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(false);

  // Fetch posts from API
  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await fetchAllPosts();
        setPosts(data);
      } catch (e) {
        setError("An error occurred while loading posts...");
        console.log("Error: ", e);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, [])

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
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
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostList