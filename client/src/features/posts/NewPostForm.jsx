import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { createPost } from "../../services/postService";

const NewPostForm = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = {title, body}

        try {
                const response = await createPost(postData);
                navigate(`/posts/${response.id}`)
        } catch (e) {
            setError(e)
            console.error("An error occured while creating post: ", e);
        }
    }

    return (
        <div>
            <h2>Create a New Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="titleInput">Title:</label>
                    <input 
                        type="text" 
                        id="titleInput" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    /> 
                </div>
                <div>
                    <label htmlFor="bodyInput">Body:</label>
                    <textarea 
                        id="bodyInput" 
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    /> 
                </div>
                <div>
                    <button type="submit">Create Post</button>
                </div>
            </form>
        </div>
    )
}

export default NewPostForm