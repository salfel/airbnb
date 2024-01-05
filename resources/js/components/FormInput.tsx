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
import { Control, ControllerRenderProps, Path } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

type FormInputProps<T extends object, U extends boolean> = {
	name: Path<T>;
	control: Control<T>;
	error?: string;
	textarea?: U;
	type?: string;
	className?: string;
	description?: string;
	hideLabel?: boolean;
	rows?: number;
} & React.InputHTMLAttributes<
	U extends true ? HTMLTextAreaElement : HTMLInputElement
>;

export default function FormInput<T extends object, U extends boolean>({
	name,
	control,
	error,
	textarea,
	type,
	className,
	description,
	hideLabel = false,
	rows
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
								{name}
							</FormLabel>
						)}
						<FormControl>
							{textarea ?
								<Textarea
									id={hideLabel ? name : undefined}
									{...field}
									rows={rows}
									className={className}
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

export type ForwardRefProps<
	T,
	U extends object
> = React.InputHTMLAttributes<T> & ControllerRenderProps<U, Path<U>>;
