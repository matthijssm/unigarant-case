import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CoverageAdviceForm } from "../../app/_components/CoverageAdviceForm";
import { getCoverageAdvice } from "../../app/actions";
import { QueryClient, QueryClientProvider } from "react-query";
import "@testing-library/jest-dom";

jest.mock("../../app/actions", () => ({
    getCoverageAdvice: jest.fn(),
}));

describe("CoverageAdviceForm", () => {
    const renderWithQueryClient = (ui: JSX.Element) => {
        const queryClient = new QueryClient();
        return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
    };

    beforeAll(() => {
        global.ResizeObserver = class {
            observe() {}
            unobserve() {}
            disconnect() {}
        };
    });

    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks
    });

    it("renders the form with initial values", () => {
        renderWithQueryClient(<CoverageAdviceForm />);
        expect(screen.getByLabelText("Hoeveel dagen ga je reizen?")).toBeInTheDocument();
        expect(screen.getByText("Hoeveel personen gaan er op reis?")).toBeInTheDocument();
        expect(screen.getByText("In welke landen wil je reizen?")).toBeInTheDocument();
    });

    it("displays an error message when no requirements match the travelers count", async () => {
        (getCoverageAdvice as jest.Mock).mockRejectedValueOnce(new Error());

        renderWithQueryClient(<CoverageAdviceForm />);

        fireEvent.change(screen.getByLabelText("Hoeveel dagen ga je reizen?"), { target: { value: "10" } });
        fireEvent.click(screen.getByRole("radio", { name: "1" }));
        fireEvent.click(screen.getByRole("radio", { name: "Europa" }));

        fireEvent.click(screen.getByRole("button", { name: /Vraag advies/i }));

        await waitFor(() => {
            expect(
                screen.getByText(/Oh nee! Er is iets fout gegaan bij het ophalen van het advies/i),
            ).toBeInTheDocument();
        });
    });

    it("calls getCoverageAdvice with correct values and shows advice", async () => {
        const adviceResponse = { advice: "changeCoverage" };
        (getCoverageAdvice as jest.Mock).mockResolvedValueOnce(adviceResponse);

        renderWithQueryClient(<CoverageAdviceForm />);

        fireEvent.change(screen.getByLabelText("Hoeveel dagen ga je reizen?"), { target: { value: "20" } });
        fireEvent.click(screen.getByRole("radio", { name: "1" }));
        fireEvent.click(screen.getByRole("radio", { name: "Europa" }));

        fireEvent.click(screen.getByRole("button", { name: /Vraag advies/i }));

        await waitFor(() => {
            expect(getCoverageAdvice).toHaveBeenCalledWith({
                travelDuration: 20,
                travelersCount: 1,
                destinationCoverage: "europe",
            });
        });

        await waitFor(() => {
            expect(screen.getByText(/Wij raden je aan je huidige dekking aan te passen/i)).toBeInTheDocument();
        });
    });
});
