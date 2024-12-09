import { getCoverageAdvice } from "../../app/actions";
import { CoverageAdviceFormSchemaOutput } from "../../app/_schemas/coverageAdviceFormSchema";

describe("Action: Get coverage advice", () => {
    it("should advise to change coverage when travel duration is equal to maxDays for Europe", async () => {
        const input: CoverageAdviceFormSchemaOutput = {
            travelDuration: 28,
            travelersCount: 1,
            destinationCoverage: "europe",
        };

        const result = await getCoverageAdvice(input);

        expect(result).toEqual({ advice: "CHANGE_COVERAGE" });
    });

    it("should advise to change coverage when travel duration exceeds maxDays for World", async () => {
        const input: CoverageAdviceFormSchemaOutput = {
            travelDuration: 15,
            travelersCount: 1,
            destinationCoverage: "world",
        };

        const result = await getCoverageAdvice(input);

        expect(result).toEqual({ advice: "CHANGE_COVERAGE" });
    });

    it("should advise to get temporary coverage when travel duration is less than maxDays", async () => {
        const input: CoverageAdviceFormSchemaOutput = {
            travelDuration: 5,
            travelersCount: 1,
            destinationCoverage: "europe",
        };

        const result = await getCoverageAdvice(input);

        expect(result).toEqual({ advice: "GET_TEMPORARY_COVERAGE" });
    });

    it("should throw an error when no requirements match the travelers count", async () => {
        const input: CoverageAdviceFormSchemaOutput = {
            travelDuration: 10,
            travelersCount: 5,
            destinationCoverage: "europe",
        };

        await expect(getCoverageAdvice(input)).rejects.toThrow(
            "Can't find temporary coverage requirements for this combination of travelers and destination",
        );
    });

    it("should handle the edge case when travelersCount is the minimum accepted for input", async () => {
        const input: CoverageAdviceFormSchemaOutput = {
            travelDuration: 10,
            travelersCount: 1,
            destinationCoverage: "europe",
        };

        const result = await getCoverageAdvice(input);

        expect(result).toEqual({ advice: "GET_TEMPORARY_COVERAGE" });
    });
});
