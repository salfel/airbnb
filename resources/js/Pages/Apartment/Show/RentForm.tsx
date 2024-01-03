import { DateRange } from "react-day-picker";
import { Apartment } from "@/types";
import { useErrors } from "@/lib/hooks";
import { Control, useForm } from "react-hook-form";
import { router } from "@inertiajs/react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from "@/components/ui/form";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import React from "react";

interface RentFormValues {
	date: DateRange;
	guests: number;
	description: string;
}

interface RentFormProps {
	apartment: Apartment;
}

export default function RentForm({ apartment }: RentFormProps) {
	const errors = useErrors();

	const form = useForm<RentFormValues>({
		defaultValues: {
			date: {
				from: new Date(apartment.start),
				to: new Date(apartment.end)
			},
			guests: 1,
			description: ""
		}
	});

	function handleSubmit(values: { date: DateRange }) {
		const data = {
			start: values.date.from?.toISOString(),
			end: values.date.to?.toISOString(),
			...values
		};

		router.post(route("apartments.rents.store", [apartment.id]), data, {
			preserveScroll: true,
			onSuccess: () => form.reset()
		});
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Rent this Apartment</CardTitle>
				<CardDescription>
					Looking for a vacation getaway? Fill out the details below
					to book this apartment for your holiday. We&apos;re excited
					to be a part of your vacation experience!
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="flex gap-12"
					>
						<CalendarInput
							control={form.control}
							error={errors.start || errors.end}
						/>

						<div className="flex-1 space-y-4">
							<FormInput
								name="guests"
								type="number"
								control={form.control}
								error={errors.guests}
								description="How many people will be staying?"
							/>

							<FormInput
								name="description"
								control={form.control}
								error={errors.description}
								description="Please tell us why you're here and what you will be doing during your stay"
								textarea
							/>

							<Button type="submit">Rent</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}

function CalendarInput({
	control,
	error
}: {
	control: Control<RentFormValues>;
	error?: string;
}) {
	return (
		<FormField
			name="date"
			control={control}
			render={({ field }) => (
				<FormItem>
					<FormControl>
						<Calendar
							mode="range"
							selected={field.value}
							onSelect={field.onChange}
						/>
					</FormControl>
					<FormMessage>{error}</FormMessage>
				</FormItem>
			)}
		/>
	);
}
