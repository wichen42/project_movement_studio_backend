import '@testing-library/jest-dom'
import { fireEvent, render, screen} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from 'react-router-dom';
import NewPostForm from './NewPostForm';
import { createPost } from '../../services/postService';


jest.mock("../../services/postService", () => ({
    createPost: jest.fn(() => {
        return {
            id: 1,
            title: "Test Post",
            body: "This is a test post.",
        };
    }),
}));

describe("NewPostForm component", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    const renderForm = () => {
        render(
            <BrowserRouter>
                <NewPostForm />
            </BrowserRouter>
        );
    };

    test("renders NewPostForm and allows typing", () => {
        renderForm();

        const titleInput = screen.getByLabelText(/Title:/i);
        const bodyInput = screen.getByLabelText(/Body:/i);
        const submitButton = screen.getByRole("button", {name: /create post/i});

        const expectedTitle = "Test Post";
        const expectedBody = "This is a test post.";

        fireEvent.change(titleInput, {target: {value: expectedTitle}});
        fireEvent.change(bodyInput, {target: {value: expectedBody}});

        expect(titleInput.value).toBe(expectedTitle);
        expect(bodyInput.value).toBe(expectedBody);
        expect(submitButton).toBeInTheDocument();
    });

    test("submits form and redirects to the post page", async () => {
        renderForm();

        const expectedTitle = "Test Post";
        const expectedBody = "This is a test post.";

        const titleInput = screen.getByLabelText(/Title:/i);
        const bodyInput = screen.getByLabelText(/Body:/i);
        const submitButton = screen.getByRole("button", {name: /create post/i});
        
        fireEvent.change(titleInput, {target: {value: expectedTitle}});
        fireEvent.change(bodyInput, {target: {value: expectedBody}});

        await act(async () => {
            fireEvent.click(submitButton);
        });

        expect(createPost).toHaveBeenCalledTimes(1);
    });

    test("handles error when creating post", async () => {
        const error = new Error("Failed to create post.");
        createPost.mockRejectedValue(error);

        const consoleSpy = jest.spyOn(console, "error");
        consoleSpy.mockImplementation(jest.fn());

        renderForm();

        const expectedTitle = "Test Post";
        const expectedBody = "This is a test post.";

        const titleInput = screen.getByLabelText(/Title:/i);
        const bodyInput = screen.getByLabelText(/Body:/i);
        const submitButton = screen.getByRole("button", {name: /create post/i});
        
        fireEvent.change(titleInput, {target: {value: expectedTitle}});
        fireEvent.change(bodyInput, {target: {value: expectedBody}});

        await act(async () => {
            fireEvent.click(submitButton);
        });

        expect(consoleSpy).toHaveBeenCalledWith(
            "An error occured while creating post: ",
            error
        );
    });
});

