import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // To mock 'Link' components from 'react-router-dom'
import PostList from './PostList';
import * as postService from "../../services/postService";

jest.mock("../../constants", () => ({
    API_URL: "http://your-test-api-url"
}));

jest.mock("../../services/postService", () => ({
    fetchAllPosts: jest.fn(),
    deletePost: jest.fn(),
}));

global.console.error = jest.fn();

describe("PostList component", () => {
    const mockPosts = [
        {id: 1, title: "Post 1", body: "Hello World"},
        {id: 2, title: "Post 2", body: "Hello World"},
        {id: 3, title: "Post 3", body: "Hello World"},
    ];

    beforeEach(() => {
        postService.fetchAllPosts.mockResolvedValue(mockPosts);
        postService.deletePost.mockResolvedValue();
    })

    test("renders the list of posts", async () => {
        render(<PostList />, {wrapper: MemoryRouter});

        await waitFor(() => screen.getByText("Post 1"));

        expect(screen.getByText("Post 1")).toBeInTheDocument();
        expect(screen.getByText("Post 2")).toBeInTheDocument();
        expect(screen.getByText("Post 3")).toBeInTheDocument();
    });

    test("deletes a post when delete button is clicked", async () => {
        render(<PostList />, {wrapper: MemoryRouter});
        const postText = "Post 1"

        await waitFor(() => screen.getByText(postText));

        fireEvent.click(screen.getAllByText("Delete")[0]);
        await waitFor(() => expect(postService.deletePost).toHaveBeenCalled());

        expect(screen.queryByText(postText)).not.toBeInTheDocument();
    });

    test("sets error and loading to false when fetching posts fails", async () => {
        const error = new Error("An error occurred!");
        postService.fetchAllPosts.mockRejectedValue(error);

        render(<PostList />, {wrapper: MemoryRouter});

        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith(
                "An error occurred while loading posts: ",
                error
            );
        });
    });

    test("logs error when deleting a post fails", async () => {
        const error = new Error("Delete failed!");
        postService.fetchAllPosts.mockResolvedValue(mockPosts);
        postService.deletePost.mockRejectedValue(error);

        render(<PostList />, {wrapper: MemoryRouter});

        await waitFor(() => screen.getByText("Post 1"));

        fireEvent.click(screen.getAllByText("Delete")[0]);
        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith(
                "Error deleting post",
                error
            );
        });
    });
});

describe("PostList component image_url rendering", () => {
    const mockPostWithUrl = [
        {
            id: 1,
            title: "Post with Image",
            body: "Hello World",
            image_url: "https://via.placeholder.com/150"
        }
    ]

    const mockPostWithoutUrl = [
        {
            id: 2,
            title: "Post without Image",
            body: "Hello Placeholder",
            image_url: null
        }
    ]

    test("renders the image with image_url exists", async () => {
        postService.fetchAllPosts.mockResolvedValue(mockPostWithUrl);
    
        render(<PostList />, { wrapper: MemoryRouter });
    
        await waitFor(() => screen.getByText(mockPostWithUrl[0].title));
    
        const imgElement = screen.getByAltText(mockPostWithUrl[0].title);
        expect(imgElement).toBeInTheDocument();
        expect(imgElement.src).toBe(mockPostWithUrl[0].image_url);
    });

    test("renders the placeholder div when image_url does not exist", async () => {
        postService.fetchAllPosts.mockResolvedValue(mockPostWithoutUrl);
    
        render(<PostList />, { wrapper: MemoryRouter });
    
        await waitFor(() => screen.getByText(mockPostWithoutUrl[0].title));
    
        const placeholderDiv = screen.getByTestId("post-image-stub");
        expect(placeholderDiv).toBeInTheDocument();
    });
})