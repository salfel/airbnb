import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import * as React from "react";

interface InputProps<T extends string>
    extends React.InputHTMLAttributes<HTMLInputElement> {
    field: T;
    value: string;
    setValue: (field: T, value: string) => void;
    error?: string;
}

// @ts-ignore
const FormInput = React.forwardRef<HTMLInputElement, InputProps<T>>(
    ({ className, type, field, value, setValue, error, ...props }, ref) => {
        return (
            <div className="w-full space-y-1">
                <Label htmlFor={field} className="capitalize font-semibold">
                    {field}
                </Label>
                <Input
                    type={type}
                    ref={ref}
                    id={field}
                    name={field}
                    value={value}
                    onChange={(e) => setValue(field, e.target.value)}
                    {...props}
                />
                <InputError error={error} />
            </div>
        );
    },
);
FormInput.displayName = "FormInput";

export function getChangeData<T extends {}>(
    setValue: (field: keyof T, value: T[keyof T]) => void,
    clearErrors: (field: keyof T) => void,
) {
    return function changeData<K extends keyof T>(field: K, value: T[K]): void {
        setValue(field, value);
        clearErrors(field);
    };
}

export function InputError({ error }: { error?: string }) {
    return <p className="text-[0.8rem] font-medium text-red-500">{error}</p>;
}

export default FormInput;
