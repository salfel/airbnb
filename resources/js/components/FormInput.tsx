import { Input } from "@/components/ui/input";
import React from "react";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { Control, Path } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

type FormInputProps<T extends object, U extends boolean> = {
	name: Path<T>;
	label?: string;
	control: Control<T>;
	error?: string;
	textarea?: U;
	type?: string;
	className?: string;
	description?: string;
	hideLabel?: boolean;
} & React.InputHTMLAttributes<
	U extends true ? HTMLTextAreaElement : HTMLInputElement
>;

export default function FormInput<T extends object, U extends boolean>({
	name,
	label,
	control,
	error,
	textarea,
	type,
	className,
	description,
	hideLabel = false
}: FormInputProps<T, U>) {
	return (
		<FormField
			name={name}
			control={control}
			render={({ field }) => (
				<>
					<FormItem className="w-full">
						{!hideLabel && (
							<FormLabel
								htmlFor={name}
								className="font-medium capitalize"
							>
								{label || name}
							</FormLabel>
						)}
						<FormControl>
							{textarea ?
								<Textarea
									id={hideLabel ? name : undefined}
									{...field}
									className={`min-h-24 ${className}`}
								/>
							:	<Input
									id={hideLabel ? name : undefined}
									type={type}
									{...field}
									className={className}
								/>
							}
						</FormControl>
						{!error ?
							<FormDescription>{description}</FormDescription>
						:	<FormMessage>{error}</FormMessage>}
					</FormItem>
				</>
			)}
		/>
	);
}
