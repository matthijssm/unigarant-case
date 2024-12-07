import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

export function Button({
    children,
    className,
    ...props
}: React.PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
    return (
        <button
            className={clsx(
                "rounded bg-brand-blue px-4 py-2 text-white font-heading hover:bg-brand-blue/90 transition-colors flex gap-1 items-center justify-center",
                className,
            )}
            {...props}
        >
            {children}
        </button>
    );
}
