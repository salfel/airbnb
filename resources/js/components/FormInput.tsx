import { Input } from "@/components/ui/input";
import React from "react";
import {
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Control, Path } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

type FormInputProps<T extends object, U extends boolean> = {
    name: Path<T>;
    control: Control<T>;
    error?: string;
    textarea?: U;
    type?: string;
    className?: string;
    render?:
        | React.ComponentType<any>
        | ((props: any) => React.ReactElement<any, any>);
} & React.InputHTMLAttributes<
    U extends true ? HTMLTextAreaElement : HTMLInputElement
>;

export default function FormInput<T extends object, U extends boolean>({
    name,
    control,
    error,
    textarea,
    render,
    type,
    className,
}: FormInputProps<T, U>) {
    const Element = render;

    return (
        <FormField
            name={name}
            control={control}
            render={({ field }) => (
                <>
                    <div>
                        <FormLabel
                            htmlFor={name}
                            className="font-medium capitalize"
                        >
                            {name}
                        </FormLabel>
                        <FormControl>
                            {Element ? (
                                <Element
                                    id={name}
                                    {...field}
                                    className={className}
                                />
                            ) : textarea ? (
                                <Textarea
                                    id={name}
                                    rows={4}
                                    {...field}
                                    className={className}
                                />
                            ) : (
                                <Input
                                    id={name}
                                    type={type}
                                    {...field}
                                    className={className}
                                />
                            )}
                        </FormControl>
                        <FormMessage>{error}</FormMessage>
                    </div>
                </>
            )}
        />
    );
}
