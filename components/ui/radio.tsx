import { RadioGroup, RadioGroupItem, RadioGroupItemProps, RadioGroupProps } from "@radix-ui/react-radio-group";
import clsx from "clsx";
import { PropsWithChildren } from "react";

type RadioProps = PropsWithChildren<{} & RadioGroupProps>;

export function Radio({ children, ...props }: RadioProps) {
    return (
        <RadioGroup className="flex gap-2 flex-wrap" {...props}>
            {children}
        </RadioGroup>
    );
}

type RadioItemProps = PropsWithChildren<{ label: string } & RadioGroupItemProps>;

export function RadioItem({ label, className, ...props }: RadioItemProps) {
    return (
        <RadioGroupItem
            className={clsx(
                className,
                "rounded py-2 px-4 border border-background-border",
                "data-[state=checked]:bg-background-muted data-[state=checked]:outline data-[state=checked]:outline-1 data-[state=checked]:outline-brand-blue data-[state=checked]:border-brand-blue",
            )}
            {...props}
        >
            {label}
        </RadioGroupItem>
    );
}
