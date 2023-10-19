import { fetchAllPosts, fetchPost, createPost, updatePost, deletePost } from "./postService";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

jest.mock("../constants", () => ({
    API_URL: "http://your-test-api-url",
  }));

describe("Post API Service", () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    //Index
    it("fetches all posts", async () => {
        const mockData = [{
            id: 1,
            title: "Test Post",
            body: "Test Body",
        }];

        fetch.mockResponseOnce(JSON.stringify(mockData));

        const result = await fetchAllPosts();

        expect(result).toEqual(mockData);
    });
    //Show
    it("fetches a single post", async () => {
        const mockPost = {
            id: 1,
            title: "Test Post",
            body: "Test Body",
        };

        fetch.mockResponseOnce(JSON.stringify(mockPost));

        const result = await fetchPost(mockPost.id);

        expect(result).toEqual(mockPost);
    });
    //Create
    it("creates a new post", async () => {
        const mockPost = {
            title: "Test Post",
            body: "Test Body",
        };

        fetch.mockResponseOnce(JSON.stringify(mockPost));

        const result = await createPost(mockPost);

        expect(result).toEqual(mockPost);
    });

    //Edit / Update
    it("edits the post", async () => {
        const mockPostId = 1;
        const mockPost = {
            id: mockPostId,
            title: "Test Post",
            body: "Test Body",
        };

        fetch.mockResponseOnce(JSON.stringify(mockPost));

        const result = await(updatePost(mockPostId, mockPost));

        expect(result).toEqual(mockPost);
    })

    //Delete
    it("deletes the post", async () => {
        const mockPostId = 1;
        fetch.mockResponse(null, { status: 204 });

        const result = await(deletePost(mockPostId));

        expect(result).toEqual(null);
    });

    it("throws an error when the fetchAllPost response is not ok", async () => {
        fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    
        await expect(fetchAllPosts()).rejects.toThrow();
    });

    it("throws an error when the fetchPost response is not ok", async () => {
        fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });

        await expect(fetchPost(1)).rejects.toThrow();
    });

    it("throws an error when the createPost response is not ok", async () => {
        fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });

        await expect(createPost({})).rejects.toThrow();
    });

    it("throws an error when the updatePost response is not ok", async () => {
        const mockPostId = 1;
        const mockPost = {id: mockPostId, title: "Test Post", body: "Test Body"};
        fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });

        await expect(updatePost(mockPostId, mockPost)).rejects.toThrow();
    });

    it("throws an error when the deletePost response is not ok", async () => {
        fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });

        await expect(deletePost(1)).rejects.toThrow();
    });

});
