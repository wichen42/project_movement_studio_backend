import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // To mock 'Link' components from 'react-router-dom'
import '@testing-library/jest-dom'
import Navbar from "./Navbar";


describe("NavBar component", () => {
    const renderNavBar = () => {
        render(<Navbar />, {wrapper: MemoryRouter})
    };
    test("renders both links", () => {
        // render the navbar
        renderNavBar();
        // expect the links to be there or something
        expect(screen.getByText("Posts List")).toBeInTheDocument();
        expect(screen.getByText("Create New Post")).toBeInTheDocument();
    });
});