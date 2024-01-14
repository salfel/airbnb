import React, { ReactNode } from "react";
import Layout from "@/layouts/Layout";
import { Head, router, usePage } from "@inertiajs/react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import FormInput from "@/components/input/FormInput";
import CountryInput from "@/components/input/CountryInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Apartment, Model, PageProps } from "@/types";
import Calendar from "@/components/input/CalendarInput";
import { objectToFormData, tomorrow } from "@/lib/utils";
import AttributesInput from "@/components/input/AttributesInput";
import ImagesInput from "@/Pages/Apartment/Create/ImagesInput";

export type FormValues = Omit<
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
> & { start: Date; end: Date; images: File[] };

export default function Create() {
	const {
		props: {
			errors,
			auth: { host }
		}
	} = usePage<PageProps>();
	const form = useForm<FormValues>({
		defaultValues: {
			title: "",
			description: "",
			price: 0,
			square_meters: 0,
			city: "",
			country: "",
			beds: 0,
			baths: 0,
			guests: 0,
			start: new Date(),
			end: tomorrow(),
			attributes: [],
			images: []
		}
	});

	function handleSubmit(values: FormValues) {
		const data = {
			...values,
			start: values.start.toISOString(),
			end: values.end.toISOString()
		};

		router.post(route("apartments.store"), objectToFormData(data));
	}

	return (
		<>
			<Head title="Start renting" />

			<Card>
				<CardHeader>
					<CardTitle>
						Start renting
						{host === null ? " a new " : " your first "}
						apartment
					</CardTitle>
					<CardDescription>
						This form allows you to list an apartment on our
						platform. Please provide as much detail as possible to
						attract potential renters.
					</CardDescription>
				</CardHeader>
				<CardContent>
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
								<Calendar
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

							<ImagesInput
								control={form.control}
								error={errors.images}
							/>

							<Button type="submit">Submit</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</>
	);
}

Create.layout = (page: ReactNode) => <Layout>{page}</Layout>;
