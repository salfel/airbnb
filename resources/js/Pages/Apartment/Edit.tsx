import React from "react";
import { Apartment, PageProps } from "@/types";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { usePage } from "@inertiajs/react";
import ApartmentForm from "@/components/ApartmentForm";
import Layout from "@/layouts/Layout";

export default function Edit({ apartment }: { apartment: Apartment }) {
	const page = usePage<PageProps>();

	return (
		<Card>
			<CardHeader>
				<CardTitle>
					Start renting
					{page.props.auth.host === null ? " a new " : " your first "}
					apartment
				</CardTitle>
				<CardDescription>
					This form allows you to list an apartment on our platform.
					Please provide as much detail as possible to attract
					potential renters.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ApartmentForm
					method="put"
					route={route("apartments.update", [apartment.id])}
					apartment={apartment}
				/>
			</CardContent>
		</Card>
	);
}

Edit.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;
