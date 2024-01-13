import { useSearchParams } from "@/lib/hooks";
import attributes from "@/constants/attributes";
import { Attribute } from "@/types";
import { useForm } from "react-hook-form";
import { router } from "@inertiajs/react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/FormInput";
import CountryInput from "@/components/CountryInput";
import AttributesInput from "@/components/AttributesInput";
import React, { useState } from "react";

export default function FilterSheet() {
	const [open, setOpen] = useState(false);
	const searchParams = useSearchParams();

	const defaultValues = {
		minPrice: searchParams.get("minPrice") ?? 0,
		maxPrice: searchParams.get("maxPrice") ?? 10000,
		country: searchParams.get("country") ?? "",
		attributes:
			searchParams
				.get("attributes")
				?.split(",")
				.map((attribute) =>
					attributes.find((attr) => attribute === attr.name)
				)
				.filter(
					(attribute): attribute is Attribute =>
						attribute !== undefined
				) ?? []
	};

	const form = useForm({
		defaultValues
	});

	function handleSubmit(values: typeof defaultValues) {
		const searchParams: Record<string, unknown> = {};
		for (const [key, value] of Object.entries(values)) {
			if (key === "attributes") {
				searchParams["attributes"] = values.attributes.concat();
				continue;
			}
			if (value !== defaultValues[key as keyof typeof values]) {
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
			<SheetContent className="w-96 shrink-0">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-4"
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

						<CountryInput control={form.control} />

						<AttributesInput control={form.control} />

						<Button type="submit" className="w-full">
							Filter
						</Button>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	);
}
