import "./PostImage.css"
import {useEffect, useState} from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { deletePost, fetchPost } from "../../services/postService"

const PostDetails = () => {
    const [post, setPost] = useState(null);
    const [, setError] = useState(null);
    const [, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentPost = async () => {
            try {
                const data = await fetchPost(id);
                setPost(data);
            } catch (e) {
                setError(e)
                console.error("An error occurred while loading posts: ", e);
            } finally {
                setLoading(false)
            }
        }
        fetchCurrentPost();
    }, [id]);

    if (!post) return <h2>Loading...</h2>;

    const handleDelete = async (id) => {
        try {
            await deletePost(id);
            navigate("/");
        } catch (e) {
            setError(e)
            console.error("An error occured while deleting post: ", e)
        }
    };

    return (
        <div>
            <h2>{post.title}</h2>
            <img src={post.image_url} alt={post.title} className="post-image"/>
            <p>{post.body}</p>
            <Link to="/">Back to Posts</Link>
            {" | "}
            <button onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
    )
}

export default PostDetails