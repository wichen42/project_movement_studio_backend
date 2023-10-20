import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom"; // To mock 'Link' components from 'react-router-dom'
import PostEditForm from './PostEditForm';
import { fetchPost, updatePost } from '../../services/postService'; 
import { act } from "react-dom/test-utils";

jest.mock("../../services/postService", () => ({
    fetchPost: jest.fn(),
    updatePost: jest.fn(),
}));

describe("PostEditForm component", () => {
    const mockPost = {
        title: "Test Post Title",
        body: "Test Post Body",
    };

    const renderForm = () => {
        render(
            <MemoryRouter initialEntries={["/posts/1/edit"]}>
                <Routes>
                    <Route path='/posts/:id/edit' element={<PostEditForm />}/>
                    <Route path='/posts/:id' element={<div>Post Detail</div>}/>
                </Routes>
            </MemoryRouter>
        );
    };

    beforeEach(() => {
        fetchPost.mockResolvedValue(mockPost);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render the PostEditForm component", async () => {
        renderForm();

        await waitFor(() => {
            expect(fetchPost).toHaveBeenCalledTimes(1);
        });

        expect(screen.getByDisplayValue(mockPost.title)).toBeInTheDocument();
    });

    it("updates post and redirects", async () => {
        renderForm();

        await waitFor(() => {
            expect(fetchPost).toHaveBeenCalledTimes(1);
        });

        const newPost = {
            title: "New Post Title",
            body: "New Post Body",
        };

        const postTitle = screen.getByLabelText(/title/i);
        const postBody = screen.getByLabelText(/body/i);
        const submitButton = screen.getByText(/Update Post/i);

        fireEvent.change(postTitle, {
            target: {value: newPost.title}
        });

        fireEvent.change(postBody, {
            target: {value: newPost.body}
        });

        await act(async () => {
            fireEvent.click(submitButton);
        });

        await waitFor(() => {
            expect(updatePost).toHaveBeenCalledTimes(1);
            expect(updatePost).toHaveBeenCalledWith("1", newPost);
        });

        expect(screen.getByText("Post Detail")).toBeInTheDocument();
    });

    it("handles error when fetching post", async () => {
        const error = new Error("Failed to fetch post.");
        fetchPost.mockRejectedValue(error);

        const consoleSpy = jest.spyOn(console, "error");
        consoleSpy.mockImplementation(jest.fn());
        
        renderForm();

        await waitFor(() => {
            expect(fetchPost).toHaveBeenCalledTimes(1);
        });

        
        expect(consoleSpy).toHaveBeenCalledWith(
            "An error occured fetching post: ",
            error
        );
    
    });

    it("handles error when updating post", async () => {
        const error = new Error("Failed to update post.");
        updatePost.mockRejectedValue(error);

        const consoleSpy = jest.spyOn(console, "error");
        consoleSpy.mockImplementation(jest.fn());

        renderForm();

        await waitFor(() => {
            fireEvent.click(screen.getByText(/Update Post/i));
        });

        await waitFor(() => {
            expect(updatePost).toHaveBeenCalledTimes(1);
        });

        expect(consoleSpy).toHaveBeenCalledWith(
            "An error occured updating post: ",
            error
        );
    });
});