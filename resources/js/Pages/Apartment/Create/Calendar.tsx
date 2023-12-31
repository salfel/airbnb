import React from "react";
import { Control } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { FormValues } from "@/Pages/Apartment/Create";
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

interface Props {
	control: Control<FormValues>;
	error?: string;
}

export default function CalendarInput({ control, error }: Props) {
	const [open, setOpen] = useState(false);

	return (
		<FormField
			name="date"
			control={control}
			render={({ field }) => (
				<FormItem>
					<FormLabel
						htmlFor="calendar"
						className="block"
						onClick={() => setOpen(true)}
					>
						Begin - End
					</FormLabel>
					<FormControl>
						<Popover open={open} onOpenChange={setOpen}>
							<PopoverTrigger asChild>
								<Button
									id="calendar"
									variant="outline"
									className={cn(
										"w-[240px] pl-3 text-left font-normal",
										!(field.value.to || field.value.from) &&
											"text-muted-foreground"
									)}
								>
									<span>
										{field.value.from &&
											format(field.value.from, "PP")}{" "}
										-{" "}
										{field.value.to &&
											format(field.value.to, "PP")}
									</span>
									<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
								</Button>
							</PopoverTrigger>
							<PopoverContent
								className="w-auto p-0"
								align="start"
							>
								<Calendar
									initialFocus
									mode="range"
									selected={field.value}
									onSelect={field.onChange}
									defaultMonth={field.value.from}
									numberOfMonths={2}
								/>
							</PopoverContent>
						</Popover>
					</FormControl>
					<FormMessage>{error}</FormMessage>
				</FormItem>
			)}
		/>
	);
}
