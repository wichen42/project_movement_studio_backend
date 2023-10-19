import { API_URL } from "../constants";

async function fetchAllPosts() {
    const response = await fetch(`${API_URL}`);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

async function createPost(postData) {
    const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: postData.title,
            body: postData.body
        })
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

async function fetchPost(id) {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

async function updatePost(id, post) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: post.title,
            body: post.body,
        })
    })

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

async function deletePost(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    // 204 = no content
    if (response.status === 204) {
        return null;
    }

    throw new Error(response.statusText);
}


export { fetchAllPosts, deletePost, fetchPost, updatePost, createPost }