import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { API_URL } from "../../constants";

const PostEditForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCurrentPost = async () => {
            try {
                const response = await fetch(`${API_URL}/${id}`)
                
                if (response.ok) {
                    const json = await response.json();
                    setPost(json);
                } else {
                    throw response;
                }
            } catch (e) {
                setError(e);
                console.log(`Error fetching post ${id}.`);
                console.log("Error: ", e);
            } finally {
                setLoading(false);
            }
        }

        fetchCurrentPost()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: post.title,
                    body: post.body,
                }),
            });

            if (response.ok) {
                const json = await response.json();
                console.log("Edit Success: ", json);
                navigate(`/posts/${id}`);
            } else {
                throw response;
            }

        } catch (e) {
            setError(e);
            console.log(`Error editing post ${id}`);
            console.log("Error: ", e);
        }
    };

    if (loading) return <h2>Loading....</h2>

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