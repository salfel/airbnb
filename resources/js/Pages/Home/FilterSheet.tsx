import { useSearchParams } from "@/lib/hooks";
import { Control, FieldPath, useForm } from "react-hook-form";
import { router } from "@inertiajs/react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel
} from "@/components/ui/form";
import FormInput from "@/components/input/FormInput";
import CountryInput from "@/components/input/CountryInput";
import AttributesInput from "@/components/input/AttributesInput";
import React, { useState } from "react";
import RatingInput from "@/components/input/RatingInput";

export default function FilterSheet() {
	const [open, setOpen] = useState(false);
	const searchParams = useSearchParams();

	const defaultValues = {
		minPrice: searchParams.get("minPrice") ?? 0,
		maxPrice: searchParams.get("maxPrice") ?? 10000,
		city: searchParams.get("city") ?? "",
		country: searchParams.get("country") ?? "",
		attributes: (decodeURIComponent(
			searchParams.get("attributes") ?? ""
		).split(",") ?? []) as string[],
		rating: parseInt(searchParams.get("rating") ?? "1")
	};

	const form = useForm({
		defaultValues
	});

	function handleSubmit(values: typeof defaultValues) {
		const searchParams: Record<string, unknown> = {};
		for (const [key, value] of Object.entries(values)) {
			if (key === "attributes") {
				if (values.attributes.length) {
					searchParams["attributes"] = values.attributes
						.filter(Boolean)
						.join(",");
				}
			} else if (value !== defaultValues[key as keyof typeof values]) {
				searchParams[key] = value;
			}
		}

		router.visit(route("home", { _query: searchParams }), {
			preserveScroll: true,
			preserveState: true,
			onSuccess: () => setOpen(false)
		});
	}

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button variant="outline" size="icon" className="size-10">
					<Filter className="size-5" />
				</Button>
			</SheetTrigger>
			<SheetContent className="pointer-events-auto w-96 shrink-0">
				<SheetHeader>
					<SheetTitle>Filter Apartments</SheetTitle>
					<SheetDescription>
						Choose your filters to apply to get the perfect
						apartment for you
					</SheetDescription>
				</SheetHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="mt-6 space-y-4"
					>
						<FormInput
							name="minPrice"
							label="Min Price"
							control={form.control}
							type="number"
						/>

						<FormInput
							name="maxPrice"
							label="Max Price"
							control={form.control}
							type="number"
						/>

						<FormInput name="city" control={form.control} />

						<CountryInput control={form.control} />

						<AttributesInput control={form.control} />

						<StarRating control={form.control} />

						<Button type="submit" className="w-full">
							Filter
						</Button>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	);
}

function StarRating<T extends { rating: number }>({
	control
}: {
	control: Control<T>;
}) {
	return (
		<FormField
			name={"rating" as FieldPath<T>}
			control={control}
			render={({ field }) => {
				console.log(field.value);
				return (
					<FormItem>
						<FormItem className="w-full">
							<FormLabel
								htmlFor="rating"
								className="font-medium capitalize"
							>
								Min Rating
							</FormLabel>
							<FormControl>
								<RatingInput
									value={field.value}
									onChange={field.onChange}
									size={6}
								/>
							</FormControl>
						</FormItem>
					</FormItem>
				);
			}}
		/>
	);
}
