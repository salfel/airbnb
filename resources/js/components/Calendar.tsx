import React from "react";
import { Control, FieldPath } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

type FormValues = {
	start: Date;
	end: Date;
};

interface Props<T extends FormValues> {
	control: Control<T>;
	errors: { start?: string; end?: string };
}

export default function CalendarInput<T extends FormValues>({
	control,
	errors
}: Props<T>) {
	return (
		<>
			<CalendarControl
				errors={errors}
				control={control}
				name={"start" as FieldPath<T>}
			/>
			<CalendarControl
				errors={errors}
				control={control}
				name={"end" as FieldPath<T>}
			/>
		</>
	);
}

function CalendarControl<T extends FormValues>({
	errors,
	control,
	name
}: {
	errors: { start?: string; end?: string };
	control: Control<T>;
	name: FieldPath<T>;
}) {
	const [open, setOpen] = useState(false);
	return (
		<FormField
			name={name}
			control={control}
			render={({ field }) => (
				<FormItem className="w-full">
					<FormLabel
						htmlFor={name}
						className="block capitalize"
						onClick={() => setOpen(true)}
					>
						{name}
					</FormLabel>
					<FormControl>
						<Popover open={open} onOpenChange={setOpen}>
							<PopoverTrigger asChild>
								<Button
									id={name}
									variant="outline"
									className={cn(
										"w-full pl-3 text-left font-normal",
										!field.value && "text-muted-foreground"
									)}
								>
									<span>{format(field.value, "PPP")}</span>
									<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
								</Button>
							</PopoverTrigger>
							<PopoverContent
								className="w-auto p-0"
								align="start"
							>
								<Calendar
									initialFocus
									mode="single"
									selected={field.value}
									onSelect={field.onChange}
								/>
							</PopoverContent>
						</Popover>
					</FormControl>
					<FormMessage>{errors[name]}</FormMessage>
				</FormItem>
			)}
		/>
	);
}
