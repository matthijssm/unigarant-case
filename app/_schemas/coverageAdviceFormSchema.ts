import { z } from "zod";

export const coverageAdviceFormSchema = z.object({
    travelDuration: z
        .string()
        .pipe(
            z.coerce
                .number({ invalid_type_error: "Reisduur moet een getal zijn", required_error: "Reisduur is verplicht" })
                .min(1, { message: "Reisduur moet tussen 1 en 365 dagen zijn" })
                .max(365, { message: "Reisduur moet tussen 1 en 365 dagen zijn" }),
        ),
    travelersCount: z.string().pipe(
        z.coerce
            .number({
                invalid_type_error: "Aantal reizigers moet een getal zijn",
                required_error: "Reizigersaantal is verplicht",
            })
            .min(1, { message: "Reizigersaantal moet tussen 1 en 4 reizigers zijn" })
            .max(4, { message: "Reizigersaantal moet tussen 1 en 4 reizigers zijn" }),
    ),
    destinationCoverage: z.enum(["europe", "world"]),
});

export type CoverageAdviceFormSchemaInput = z.input<typeof coverageAdviceFormSchema>;
export type CoverageAdviceFormSchemaOutput = z.output<typeof coverageAdviceFormSchema>;
