import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../../app/page";

// Mock the CoverageAdviceForm component because it's already tested separately
jest.mock("../../app/_components/CoverageAdviceForm", () => ({
    CoverageAdviceForm: () => <div>Mocked Coverage Advice Form</div>,
}));

describe("Page: Homepage", () => {
    it("renders the heading and description text", () => {
        render(<Home />);

        expect(screen.getByText("Keuzehulp voor je verzekering")).toBeInTheDocument();
        expect(
            screen.getByText(
                "Pas eenvoudig je doorlopende reisverzekering aan of sluit een tijdelijke dekking af voor een zorgeloze reis. Jij kiest wat bij jouw plannen past!",
            ),
        ).toBeInTheDocument();
    });

    it("renders the CoverageAdviceForm component", () => {
        render(<Home />);

        expect(screen.getByText("Mocked Coverage Advice Form")).toBeInTheDocument();
    });
});
