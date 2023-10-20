import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom"; // To mock 'Link' components from 'react-router-dom'
import PostDetails from './PostDetails';
import * as postService from "../../services/postService";

jest.mock("../../services/postService", () => ({
    fetchPost: jest.fn(),
    deletePost: jest.fn(),
}));

jest.mock("./PostImage.css", () => ({}));

describe("PostDetails component", () => {
    const mockPost = {
        id: 1,
        title: "Test Post Title",
        body: "Test Post Body",
    };

    const renderComponent = () => {
        render(
            <MemoryRouter initialEntries={[`/posts/${mockPost.id}`]}>
                <Routes>
                    <Route path='/posts/:id' element={<PostDetails />}/>
                    <Route path='/' element={<div>Posts List</div>}/>
                </Routes>
            </MemoryRouter>
        )
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("displays the fetched post", async () => {
        postService.fetchPost.mockResolvedValue(mockPost);

        renderComponent();

        await waitFor(() => {
            expect(screen.getByText(mockPost.title)).toBeInTheDocument();
            expect(screen.getByText(mockPost.body)).toBeInTheDocument();
        })
    });

    it("handles error when fetching post data", async () => {
        const error = new Error("Failed to fetch");
        postService.fetchPost.mockRejectedValue(error);
        const consoleSpy = jest.spyOn(console, "error");
        consoleSpy.mockImplementation(jest.fn());
    
        renderComponent();
    
        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith(
            "An error occurred while loading posts: ",
            error
            );
        });
        consoleSpy.mockRestore()
    });

    it("deletes the post and redirects", async () => {
        postService.fetchPost.mockResolvedValue(mockPost);
        postService.deletePost.mockResolvedValue();

        renderComponent();

        await waitFor(() => {
            fireEvent.click(screen.getByText("Delete"));
        });

        await waitFor(() => {
            expect(screen.getByText("Posts List")).toBeInTheDocument();
        });
    });

    it("handles error when deleting post", async () => {
        const error = new Error("Failed to delete post.");
        postService.fetchPost.mockResolvedValue(mockPost);
        postService.deletePost.mockRejectedValue(error);
        const consoleSpy = jest.spyOn(console, "error");
        consoleSpy.mockImplementation(jest.fn());

        renderComponent();

        await waitFor(() => {
            fireEvent.click(screen.getByText("Delete"));
        });

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith(
                "An error occured while deleting post: ",
                error
            );
        });
        consoleSpy.mockRestore()
    });
});