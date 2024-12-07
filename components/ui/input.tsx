import clsx from "clsx";
import { HTMLProps } from "react";

type InputProps = React.PropsWithChildren<
    HTMLProps<HTMLInputElement> & {
        name: string;
    }
>;

export function Input({ name, className, ...props }: InputProps) {
    return (
        <input
            type="text"
            className={clsx("rounded border border-background-border px-3 py-2", className)}
            id={`form-field-${name}`}
            {...props}
        />
    );
}
