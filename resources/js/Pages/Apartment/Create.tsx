import React, { ReactNode } from "react";
import Layout from "@/layouts/Layout";
import { Head, usePage } from "@inertiajs/react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import ApartmentForm from "@/components/ApartmentForm";
import { PageProps } from "@/types";

export default function Create() {
	const page = usePage<PageProps>();
	return (
		<>
			<Head title="Start renting" />

			<Card>
				<CardHeader>
					<CardTitle>
						Start renting
						{page.props.auth.host === null ?
							" a new "
						:	" your first "}
						apartment
					</CardTitle>
					<CardDescription>
						This form allows you to list an apartment on our
						platform. Please provide as much detail as possible to
						attract potential renters.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ApartmentForm
						method="post"
						route={route("apartments.store")}
					/>
				</CardContent>
			</Card>
		</>
	);
}

Create.layout = (page: ReactNode) => <Layout>{page}</Layout>;
