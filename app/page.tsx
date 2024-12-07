import { TravelInsuranceForm } from "./_components/TravelInsuranceForm";

export default function Home() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <h2 className="font-heading text-xl text-brand-blue">Keuzehulp voor je verzekering</h2>
                <p>
                    Pas eenvoudig je doorlopende reisverzekering aan of sluit een tijdelijke dekking af voor een
                    zorgeloze reis. Jij kiest wat bij jouw plannen past!
                </p>
            </div>

            <TravelInsuranceForm />
        </div>
    );
}
