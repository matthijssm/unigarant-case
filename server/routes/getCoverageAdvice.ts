import { coverageAdviceFormSchema } from "@/app/_schemas/coverageAdviceFormSchema";
import { Request, Response } from "express";
import { z } from "zod";

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

export function getCoverageAdvice(req: Request, res: Response) {
    try {
        const { travelDuration, travelersCount, destinationCoverage } = coverageAdviceFormSchema.parse(req.body);

        const requirementsMatrix = CHANGE_COVERAGE_REQUIREMENTS[destinationCoverage];
        const requirements = requirementsMatrix.find(({ people }) => people === travelersCount);

        if (!requirements) {
            res.status(400).json({
                status: "error",
                message: "Can't find temporary coverage requirements for this combination of travelers and destination",
            });
            return;
        }

        if (travelDuration >= requirements.maxDays) {
            res.status(200).json({
                status: "success",
                data: {
                    advice: "changeCoverage",
                },
            });
            return;
        }

        res.status(200).json({
            status: "success",
            data: {
                advice: "getTemporaryCoverage",
            },
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({
                status: "error",
                message: error.message,
            });
            return;
        }

        res.status(500).json({
            status: "error",
            message: "Something went wrong",
        });
    }
}
