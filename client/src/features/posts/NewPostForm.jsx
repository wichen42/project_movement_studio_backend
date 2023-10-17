import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../constants";

const NewPostForm = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = {title, body}

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(postData)
            });
    
            if (response.ok) {
                const { id } = await response.json();
                navigate(`/posts/${id}`)
            } else {
                throw response;
            }
        } catch (e) {
            setError(e)
            console.log("Error creating Post")
            console.log("Error: ", e)
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
                    <label htmlFor="bodyInout">Body:</label>
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