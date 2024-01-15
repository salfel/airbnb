import { Apartment, Model } from "@/types";
import { Method } from "@inertiajs/core";
import { useForm } from "react-hook-form";
import { tomorrow } from "@/lib/utils";
import { useErrors } from "@/lib/hooks";
import { router } from "@inertiajs/react";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/input/FormInput";
import CountryInput from "@/components/input/CountryInput";
import AttributesInput from "@/components/input/AttributesInput";
import ImagesInput from "@/Pages/Apartment/Create/ImagesInput";
import { Button } from "@/components/ui/button";
import React from "react";
import CalendarInput from "@/components/input/CalendarInput";

type FormValues = Omit<
	Apartment,
	| keyof Model
	| "host"
	| "user"
	| "stars"
	| "reviews"
	| "reviews_count"
	| "start"
	| "end"
	| "images"
> & { start: Date; end: Date; images: string[] };

export default function ApartmentForm({
	route,
	method,
	apartment
}: {
	route: string;
	method: Method;
	apartment?: Apartment;
}) {
	const form = useForm<FormValues>({
		defaultValues: {
			title: apartment?.title ?? "",
			description: apartment?.description ?? "",
			price: apartment?.price ?? 0,
			square_meters: apartment?.square_meters ?? 0,
			city: apartment?.city ?? "",
			country: apartment?.country ?? "",
			beds: apartment?.beds ?? 0,
			baths: apartment?.baths ?? 0,
			guests: apartment?.guests ?? 0,
			start: apartment?.start ? new Date(apartment?.start) : new Date(),
			end: apartment?.end ? new Date(apartment?.end) : tomorrow(),
			attributes: apartment?.attributes ?? [],
			images: apartment?.images ?? []
		}
	});

	const errors = useErrors();

	async function handleSubmit(values: FormValues) {
		const data = {
			...values,
			start: values.start.toISOString(),
			end: values.end.toISOString()
		};

		console.log(data.images);

		router.post(
			route,
			{ ...data, _method: method },
			{ forceFormData: true }
		);
	}
	console.log(errors);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="space-y-6"
			>
				<FormInput
					name="title"
					control={form.control}
					error={errors.title}
					description="The title should be a concise yet descriptive name for your apartment. This will be the first thing potential renters see when browsing listings."
				/>

				<FormInput
					name="description"
					control={form.control}
					error={errors.description}
					description="The description should provide a detailed overview of your apartment. This is your opportunity to convince potential renters that your apartment is the right choice for them."
					textarea
				/>

				<div className="flex items-center gap-6">
					<FormInput
						name="price"
						control={form.control}
						type="number"
						error={errors.price}
					/>

					<FormInput
						name="square_meters"
						label="Square Meters"
						control={form.control}
						type="number"
						error={errors.square_meters}
					/>
				</div>

				<div className="flex items-center gap-6">
					<CalendarInput
						control={form.control}
						errors={{
							start: errors.start,
							end: errors.end
						}}
					/>
				</div>

				<div className="flex items-center gap-6">
					<FormInput
						name="city"
						control={form.control}
						error={errors.city}
					/>

					<CountryInput
						control={form.control}
						error={errors.country}
					/>
				</div>

				<div className="flex items-center gap-6">
					<FormInput
						type="number"
						name="beds"
						control={form.control}
						error={errors.beds}
					/>

					<FormInput
						type="number"
						name="baths"
						control={form.control}
						error={errors.baths}
					/>

					<FormInput
						name="guests"
						type="number"
						control={form.control}
						error={errors.guests}
					/>
				</div>

				<AttributesInput
					control={form.control}
					error={errors.attributes}
				/>

				<ImagesInput control={form.control} error={errors.images} />

				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
