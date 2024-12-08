import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CoverageAdviceForm } from "../../app/_components/CoverageAdviceForm";
import { QueryClient, QueryClientProvider } from "react-query";
import "@testing-library/jest-dom";

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

        global.console.error = jest.fn();
    });

    beforeEach(() => {
        jest.clearAllMocks();

        // Mock fetch
        global.fetch = jest.fn();
    });

    it("renders the form with initial values", () => {
        renderWithQueryClient(<CoverageAdviceForm />);
        expect(screen.getByLabelText("Hoeveel dagen ga je reizen?")).toBeInTheDocument();
        expect(screen.getByText("Hoeveel personen gaan er op reis?")).toBeInTheDocument();
        expect(screen.getByText("Waar gaat de reis heen?")).toBeInTheDocument();
    });

    it("displays an error message when no requirements match the travelers count", async () => {
        // Mock a rejected fetch response similar to a server error
        (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Fetch error"));

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
        const adviceResponse = {
            status: "success",
            data: { advice: "changeCoverage" },
        };

        // Mock a successful fetch response
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => adviceResponse,
        });

        renderWithQueryClient(<CoverageAdviceForm />);

        fireEvent.change(screen.getByLabelText("Hoeveel dagen ga je reizen?"), { target: { value: "20" } });
        fireEvent.click(screen.getByRole("radio", { name: "1" }));
        fireEvent.click(screen.getByRole("radio", { name: "Europa" }));

        fireEvent.click(screen.getByRole("button", { name: /Vraag advies/i }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                "http://localhost:3001/api/coverage-advice",
                expect.objectContaining({
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        travelDuration: "20", // Match current input values
                        travelersCount: "1",
                        destinationCoverage: "europe",
                    }),
                }),
            );
        });

        await waitFor(() => {
            expect(screen.getByText(/Wij raden je aan je huidige dekking aan te passen/i)).toBeInTheDocument();
        });
    });
});
