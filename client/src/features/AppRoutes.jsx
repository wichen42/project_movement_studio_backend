import { Route, Routes } from "react-router-dom"
import PostList from "./posts/PostList"
import PostDetails from "./posts/PostDetails";
import NewPostForm from "./posts/NewPostForm";
import PostEditForm from "./posts/PostEditForm";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<PostList />}/>
            <Route path="posts/:id" element={<PostDetails />} />
            <Route path="/new" element={<NewPostForm />}/>
            <Route path="posts/:id/edit" element={<PostEditForm />}/>
        </Routes>
    );
}

export default AppRoutes;