import '@testing-library/jest-dom'
import PostForm from './PostForm'
import { fireEvent, render } from '@testing-library/react'
import { act } from 'react-dom/test-utils';

describe("PostForm component", () => {

    it("should render default inputs when no post prop is passed", () => {
        const mockSubmit = jest.fn();
        const { getByLabelText } = render(
                <PostForm 
                headerText='New Post'
                buttonText='Submit'
                onSubmit={mockSubmit}
                />
            );
        expect(getByLabelText(/title/i)).toBeInTheDocument();
        expect(getByLabelText(/body/i)).toBeInTheDocument();
    });

    it("renders passed in post data", () => {
        const mockPost = {
            title: "Test Title",
            body: "Test Body",
        };

        const mockSubmit = jest.fn();
        const buttonText = "Update Post";
        const { getByLabelText } = render(
            <PostForm 
                buttonText={buttonText}
                headerText='Edit Post'
                onSubmit={mockSubmit}
                post={mockPost}
            />
        );

        expect(getByLabelText(/title/i)).toBeInTheDocument();
        expect(getByLabelText(/body/i)).toBeInTheDocument();
        expect(getByLabelText(/title/i).value).toBe(mockPost.title);
        expect(getByLabelText(/body/i).value).toBe(mockPost.body);
    });

    it("updates the input value on change", () => {
        const mockSubmit = jest.fn();
        const buttonText = "Submit";
        const headerText = "New Post";
        const { getByLabelText } = render(
            <PostForm 
                headerText={headerText}
                buttonText={buttonText}
                onSubmit={mockSubmit}
            />
        );

        const titleInput = getByLabelText(/title/i);
        const newTitle = "Test Post";

        fireEvent.change(titleInput, {target: {value: newTitle}});
        expect(titleInput.value).toBe(newTitle);
    });

    it("calls onSubmit with the form data when submitted", async () => {
        const mockSubmit = jest.fn();
        const buttonText = "Submit";
        const headerText = "New Post";
    
        const { getByLabelText, getByRole } = render(
            <PostForm
                buttonText={buttonText}
                headerText={headerText}
                onSubmit={mockSubmit}
            />
        );
    
        const titleInput = getByLabelText(/title/i);
        const bodyInput = getByLabelText(/body/i);
        const newTitle = "Test Post";
        const newBody = "This is a test post.";
    
        fireEvent.change(titleInput, { target: { value: newTitle } });
        fireEvent.change(bodyInput, { target: { value: newBody } });
        await act(async () => {
            fireEvent.click(getByRole("button", { name: /submit/i }));
        });
        expect(mockSubmit).toHaveBeenCalledTimes(1);
        expect(mockSubmit).toHaveBeenCalledWith({
            title: newTitle,
            body: newBody,
        });
    });
});