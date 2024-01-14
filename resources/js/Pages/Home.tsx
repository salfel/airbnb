import { Apartment, PageProps, Pagination } from "@/types";
import Layout from "@/layouts/Layout";
import { Head, Link } from "@inertiajs/react";
import React, { ReactNode } from "react";
import Paginator from "@/components/Paginator";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { formatDateRange } from "@/lib/utils";
import SearchBar from "./Home/SearchBar";
import FilterSheet from "./Home/FilterSheet";

export default function Home({
	apartments
}: PageProps & { apartments: Pagination<Apartment> }) {
	return (
		<>
			<Head title="Home" />

			<div className="flex flex-1 flex-col items-start justify-between">
				<div className="w-full">
					<div className="mb-8 flex items-center justify-end gap-6">
						<SearchBar />

						<FilterSheet />
					</div>

					<div className="flex gap-6">
						<div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
							{apartments.data.map((apartment) => (
								<ApartmentPreview
									apartment={apartment}
									key={apartment.id}
								/>
							))}
						</div>
					</div>
				</div>

				<Paginator pagination={apartments} />
			</div>
		</>
	);
}

Home.layout = (page: ReactNode) => <Layout>{page}</Layout>;

function ApartmentPreview({ apartment }: { apartment: Apartment }) {
	return (
		<Card>
			<CardHeader>
				<img
					src={apartment.images[0] || "/placeholder.svg"}
					alt="placeholder"
					className="aspect-video w-full"
				/>
			</CardHeader>
			<CardContent>
				<CardTitle>
					<Link href={route("apartments.show", [apartment.id])}>
						{apartment.title}
					</Link>
				</CardTitle>
				<CardDescription className="mt-1 capitalize">
					{apartment.city}, {apartment.country}
				</CardDescription>
				<p className="mt-1">
					{formatDateRange(apartment.start, apartment.end)}
				</p>
				<p className="my-2 text-2xl font-bold">
					€ {apartment.price}{" "}
					<span className="text-lg font-normal"> Night</span>
				</p>
				<Link href={route("apartments.show", [apartment.id])}>
					<Button>Details</Button>
				</Link>
			</CardContent>
		</Card>
	);
}
