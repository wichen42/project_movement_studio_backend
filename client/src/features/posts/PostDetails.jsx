import {useEffect, useState} from "react"
import { useParams, Link } from "react-router-dom"
import { API_URL } from "../../constants";

const PostDetails = () => {
    const [post, setPost] = useState(null);
    const [, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchCurrentPost = async () => {
            try {
                const response = await fetch(`${API_URL}/${id}`)
                if (response.ok) {
                    const json = await response.json()
                    setPost(json)
                    setLoading(false);
                } else {
                    throw response
                }
            } catch (e) {
                setError(e)
                console.log(`Error fetching Post ${id}:`)
                console.log("Error: ", e)
            }
        }
        fetchCurrentPost();
    }, [id]);

    if (loading) return <h2>Loading....</h2>

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <Link to="/">Back to Posts</Link>
        </div>
    )
}

export default PostDetails