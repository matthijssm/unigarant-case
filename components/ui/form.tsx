import React from "react";
import { FieldValues, FormProvider, SubmitHandler, useController, UseFormReturn } from "react-hook-form";

type FormProps<
    TFieldValues extends FieldValues = FieldValues,
    TContext = any,
    TTransformedValues extends FieldValues | undefined = undefined,
> = React.PropsWithChildren<{
    onSubmit: TTransformedValues extends undefined
        ? SubmitHandler<TFieldValues>
        : TTransformedValues extends FieldValues
          ? SubmitHandler<TTransformedValues>
          : never;
    formInstance: UseFormReturn<TFieldValues, TContext, TTransformedValues>;
}>;

export function Form<
    TFieldValues extends FieldValues = FieldValues,
    TContext = any,
    TTransformedValues extends FieldValues | undefined = undefined,
>({ children, onSubmit, formInstance }: FormProps<TFieldValues, TContext, TTransformedValues>) {
    return (
        <FormProvider {...formInstance}>
            <form onSubmit={formInstance.handleSubmit(onSubmit)}>{children}</form>
        </FormProvider>
    );
}

type FieldProps = React.PropsWithChildren<{
    name: string;
    label?: string;
}>;

export function Field({ children, label, name }: FieldProps) {
    const { fieldState } = useController({ name });

    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label htmlFor={`form-field-${name}`} className="font-semibold text-sm">
                    {label}
                </label>
            )}
            {children}
            {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
        </div>
    );
}
