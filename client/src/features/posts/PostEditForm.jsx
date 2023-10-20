import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { fetchPost, updatePost } from "../../services/postService";
import PostForm from "./PostForm";

const PostEditForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchCurrentPost = async () => {
            try {
                const data = await fetchPost(id);
                setPost(data);
            } catch (e) {
                console.error("An error occured fetching post: ", e);
            } 
        }

        fetchCurrentPost()
    }, [id])

    const handleUpdateSubmit = async (formData) => {
        try {
            await updatePost(id, formData);
            navigate(`/posts/${id}`);
        } catch (e) {
            console.error("An error occured updating post: ", e);
        }
    };

    if (!post) return <h2>Loading...</h2>;

    return (
        <PostForm 
            post={post}
            headerText="Edit a post"
            onSubmit={handleUpdateSubmit}
            buttonText="Update Post"
        />
    )
}

export default PostEditForm