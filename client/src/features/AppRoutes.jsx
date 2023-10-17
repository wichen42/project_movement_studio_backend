import { Route, Routes } from "react-router-dom"
import PostLists from "./posts/PostLists"
import PostDetails from "./posts/PostDetails";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<PostLists />}/>
            <Route path="posts/:id" element={<PostDetails />} />
            <Route path="/new" element={<h1>New Post Form</h1>}/>
        </Routes>
    );
}

export default AppRoutes;