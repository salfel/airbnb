import { Apartment, PageProps, Pagination } from "@/types";
import Layout from "@/layouts/Layout";
import { Head, Link, router } from "@inertiajs/react";
import React, { FormEvent, ReactNode, useState } from "react";
import Paginator from "@/components/Paginator";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useSearchParams } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { formatDateRange } from "@/lib/utils";

export default function Home({
	apartments
}: PageProps & { apartments: Pagination<Apartment> }) {
	return (
		<>
			<Head title="Home" />

			<div className="flex flex-1 flex-col items-start justify-between">
				<div>
					<SearchBar />

					<div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
						{apartments.data.map((apartment) => (
							<ApartmentPreview
								apartment={apartment}
								key={apartment.id}
							/>
						))}
					</div>
				</div>

				<Paginator pagination={apartments} />
			</div>
		</>
	);
}

Home.layout = (page: ReactNode) => <Layout>{page}</Layout>;

function SearchBar() {
	const searchParams = useSearchParams();

	const [search, setSearch] = useState(searchParams.get("search") ?? "");

	function handleSubmit(e: FormEvent) {
		e.preventDefault();

		router.visit(
			route("home", {
				_query: { search }
			})
		);
	}

	return (
		<form className="mb-8 flex gap-3" onSubmit={handleSubmit}>
			<div className="group relative flex-1">
				<Input
					type="search"
					className="peer w-full py-5 pl-12 pr-6 text-lg"
					placeholder="Search..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>

				<div className="absolute left-5 top-0 flex h-full items-center">
					<Search className="h-5 w-5" />
				</div>
				<div
					className={`${
						search === "" ? "!hidden" : ""
					} absolute right-5 top-0 hidden h-full items-center group-hover:flex peer-focus:flex`}
				>
					<button onClick={() => setSearch("")} type="button">
						<X className="h-3 w-3" />
					</button>
				</div>
			</div>

			<Button className="text-lg" size="lg" type="submit">
				Search
			</Button>
		</form>
	);
}

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
				<p className="my-2 text-2xl font-bold">€ {apartment.price}</p>
				<Link href={route("apartments.show", [apartment.id])}>
					<Button>Details</Button>
				</Link>
			</CardContent>
		</Card>
	);
}
