import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { fetchPost, updatePost } from "../../services/postService";

const PostEditForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [, setError] = useState(null);
    const [, setLoading] = useState(true);

    useEffect(() => {
        const fetchCurrentPost = async () => {
            try {
                const data = await fetchPost(id);
                setPost(data);
            } catch (e) {
                setError(e);
                console.error("An error occured fetching post: ", e);
            } finally {
                setLoading(false);
            }
        }

        fetchCurrentPost()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedPost = {
            title: post.title,
            body: post.body,
        };

        try {
            await updatePost(id, updatedPost);
            navigate(`/posts/${id}`);
        } catch (e) {
            setError(e);
            console.error("An error occured updating post: ", e);
        }
    };

    if (!post) return <h2>Loading...</h2>;

    return (
        <div>
            <h2>Edit Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="post-title">Title</label>
                    <input 
                        type="text" 
                        id="post-title" 
                        value={post.title}
                        onChange={(e) => setPost({...post, title: e.target.value})}
                    />
                </div>
                <div>
                    <label htmlFor="post-body">Body</label>
                    <textarea 
                        id="post-body" 
                        value={post.body}
                        onChange={(e) => setPost({...post, body: e.target.value})}
                    />
                </div>
                <div>
                    <button type="submit">Save</button>
                </div>
            </form>

        </div>
    )
}

export default PostEditForm