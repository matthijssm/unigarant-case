"use client";

import { Button } from "@/components/ui/button";
import { Field, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Radio, RadioItem } from "@/components/ui/radio";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
    CoverageAdviceFormSchemaInput,
    coverageAdviceFormSchema,
    CoverageAdviceFormSchemaOutput,
} from "../_schemas/coverageAdviceFormSchema";
import { useMutation } from "react-query";
import { getCoverageAdvice } from "../actions";
import { Spinner } from "@/components/ui/spinner";
import { useEffect, useState } from "react";
import { CoverageAdvice } from "../types";
import { CoverageAdviceCard } from "./CoverageAdviceCard";

export function CoverageAdviceForm() {
    const [advice, setAdvice] = useState<CoverageAdvice>();
    const form = useForm<CoverageAdviceFormSchemaInput, any, CoverageAdviceFormSchemaOutput>({
        resolver: zodResolver(coverageAdviceFormSchema),
        defaultValues: {
            travelDuration: "",
            travelersCount: "",
            destinationCoverage: "europe",
        },
    });

    const {
        mutate: getAdvice,
        isLoading,
        isError,
    } = useMutation({
        mutationFn: getCoverageAdvice,
        onSuccess: (data) => setAdvice(data.advice),
        onError: () => setAdvice(undefined),
    });

    const onSubmit: SubmitHandler<CoverageAdviceFormSchemaOutput> = async (values) => {
        getAdvice(values);
    };

    useEffect(() => {
        const { unsubscribe } = form.watch(() => {
            setAdvice(undefined);
        });

        return unsubscribe;
    }, [form]);

    return (
        <Form<CoverageAdviceFormSchemaInput, any, CoverageAdviceFormSchemaOutput>
            onSubmit={onSubmit}
            formInstance={form}
        >
            <div className="grid gap-4">
                {isError && (
                    <div className="rounded py-2 px-4 bg-red-500 text-sm text-white">
                        Oh nee! Er is iets fout gegaan bij het ophalen van het advies, probeer het later opnieuw.
                    </div>
                )}

                <Field name="travelDuration" label="Hoeveel dagen ga je reizen?">
                    <Controller
                        name="travelDuration"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Input
                                type="number"
                                placeholder="Reisduur in dagen"
                                className={clsx({
                                    "border-red-500": !!fieldState.error,
                                })}
                                {...field}
                            />
                        )}
                    />
                </Field>
                <Field name="travelersCount" label="Hoeveel personen gaan er op reis?">
                    <Controller
                        name="travelersCount"
                        control={form.control}
                        render={({ field }) => (
                            <Radio onValueChange={field.onChange} {...field}>
                                <RadioItem label="1" value="1" />
                                <RadioItem label="2" value="2" />
                                <RadioItem label="3" value="3" />
                                <RadioItem label="4" value="4" />
                            </Radio>
                        )}
                    />
                </Field>

                <Field name="destinationCoverage" label="Waar gaat de reis heen?">
                    <Controller
                        name="destinationCoverage"
                        control={form.control}
                        render={({ field }) => (
                            <Radio onValueChange={field.onChange} {...field}>
                                <RadioItem label="Europa" value="europe" />
                                <RadioItem label="Wereld" value="world" />
                            </Radio>
                        )}
                    />
                </Field>

                <Button type="submit" disabled={isLoading}>
                    {isLoading && <Spinner />}
                    Vraag advies
                </Button>

                {advice && <CoverageAdviceCard advice={advice} />}
            </div>
        </Form>
    );
}
