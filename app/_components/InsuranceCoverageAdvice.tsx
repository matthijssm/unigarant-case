import { Button } from "@/components/ui/button";
import { CoverageAdvice } from "../types";

type InsuranceCoverageAdviceProps = {
    advice: CoverageAdvice;
};

const coverageAdvices: Record<CoverageAdvice, { title: string; description: string; buttonLabel: string }> = {
    changeCoverage: {
        title: "Wij raden je aan je huidige dekking aan te passen",
        description:
            "Het aantal dagen dat je reist in combinatie met het aantal reizigers maakt het voordeliger je huidige dekking aan te passen.",
        buttonLabel: "Wijzig je huidige dekking",
    },
    getTemporaryCoverage: {
        title: "Wij raden je aan een tijdelijke dekking te nemen voor deze reis",
        description:
            "Het aantal dagen dat je reist in combinatie met het aantal reizigers maakt het voordeliger een tijdelijke dekking te nemen voor deze reis.",
        buttonLabel: "Neem een tijdelijke dekking",
    },
};

export function InsuranceCoverageAdvice(props: InsuranceCoverageAdviceProps) {
    const content = coverageAdvices[props.advice];

    return (
        <div className="p-8 bg-background-muted rounded-lg grid gap-2">
            <h2 className="font-heading text-xl text-brand-blue">{content.title}</h2>
            <p className="text-sm">{content.description}</p>
            {/* TODO: Add link to the correct action */}
            <Button type="button">{content.buttonLabel}</Button>
        </div>
    );
}
