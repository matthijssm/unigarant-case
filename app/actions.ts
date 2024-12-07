"use server";

import { CoverageAdviceFormSchemaOutput } from "./_schemas/coverageAdviceFormSchema";
import { CoverageAdvice } from "./types";

const CHANGE_COVERAGE_REQUIREMENTS = {
    europe: [
        { people: 1, maxDays: 28 },
        { people: 2, maxDays: 14 },
        { people: 3, maxDays: 10 },
        { people: 4, maxDays: 7 },
    ],
    world: [
        { people: 1, maxDays: 14 },
        { people: 2, maxDays: 7 },
        { people: 3, maxDays: 5 },
        { people: 4, maxDays: 4 },
    ],
} as const;

export async function getCoverageAdvice(input: CoverageAdviceFormSchemaOutput): Promise<{
    advice: CoverageAdvice;
}> {
    const { travelDuration, travelersCount, destinationCoverage } = input;
    const requirementsMatrix = CHANGE_COVERAGE_REQUIREMENTS[destinationCoverage];
    const requirements = requirementsMatrix.find(({ people }) => people === travelersCount);
    if (!requirements) {
        throw new Error("Can't find temporary coverage requirements for this combination of travelers and destination");
    }

    if (travelDuration >= requirements.maxDays) {
        return {
            advice: "changeCoverage",
        };
    }

    return {
        advice: "getTemporaryCoverage",
    };
}
