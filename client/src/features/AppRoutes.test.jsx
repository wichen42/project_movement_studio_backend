import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // To mock 'Link' components from 'react-router-dom'
import '@testing-library/jest-dom'
import AppRoutes from "./AppRoutes";

jest.mock("../features/posts/PostList", () => {
    const MockPostList = () => (
        <div>Your Matcher for Posts List component here</div>
    )
    return MockPostList;
});

jest.mock("../features/posts/PostDetails", () => {
    const MockPostDetails = () => (
        <div>Your matcher for PostDetails component here</div>
    );
    return MockPostDetails;
});

jest.mock("../features/posts/NewPostForm", () => {
    const NewPostForm = () => (
        <div>Your matcher for NewPostForm component here</div>
    );
    return NewPostForm;
});

jest.mock("../features/posts/PostEditForm", () => {
    const PostEditForm = () => (
        <div>Your matcher for EditPostForm component here</div>
    );
    return PostEditForm;
});

jest.mock("../constants", () => ({
    API_URL: "htt[://your-test-api-url",
}))

describe("AppRoutes component", () => {
    const renderWithRouter = (ui, { initialEntries = ["/"] } = {}) => {
        return render(ui, {
            wrapper: ({ children }) => (
                <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
                ),
            });
        };

        test("root path renders PostList", () => {
            renderWithRouter(<AppRoutes />, { initialEntries: ["/"] });
            const expectedText = "Your Matcher for Posts List component here";
            expect(screen.getByText(expectedText)).toBeInTheDocument();
        });
    
        test("post details path renders PostDetails", () => {
            renderWithRouter(<AppRoutes />, { initialEntries: ["/posts/1"] });
            const expectedText = "Your matcher for PostDetails component here";
            expect(screen.getByText(expectedText)).toBeInTheDocument();
        });

        test("/new path renders NewPostForm", () => {
            renderWithRouter(<AppRoutes />, {initialEntries:["/new"]});
            const expectedText = "Your matcher for NewPostForm component here";
            expect(screen.getByText(expectedText)).toBeInTheDocument();
        })

        test("/posts/:id/edit path renders PostEditForm", () => {
            renderWithRouter(<AppRoutes />, {initialEntries:["/posts/1/edit"]});
            const expectedText = "Your matcher for EditPostForm component here";
            expect(screen.getByText(expectedText)).toBeInTheDocument();
        })
});
