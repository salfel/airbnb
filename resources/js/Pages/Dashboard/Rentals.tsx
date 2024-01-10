import React, { ReactNode, useState } from "react";
import Layout from "@/layouts/Layout";
import { Head } from "@inertiajs/react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Rent } from "@/types";
import {
	Table,
	TableBody,
	TableCaption,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import ApartmentTableRow from "@/components/ApartmentTableRow";

export default function DashboardRentals({ rentals }: { rentals: Rent[] }) {
	return (
		<>
			<Head title="Dashboard Rentals" />

			<div className="space-y-8">
				<div>
					<h2 className="mb-6 text-xl font-semibold">
						Current Rentals
					</h2>

					<RentalTable
						rentals={rentals.filter(
							(rental) =>
								new Date(rental.end).getTime() >
								new Date().getTime()
						)}
					/>
				</div>

				<div>
					<h2 className="mb-6 text-xl font-semibold">
						Previous Rentals
					</h2>

					<RentalTable
						rentals={rentals.filter(
							(rental) =>
								new Date(rental.end).getTime() >
								new Date().getTime()
						)}
					/>
				</div>
			</div>
		</>
	);
}

DashboardRentals.layout = (page: ReactNode) => (
	<DashboardLayout>
		<Layout>{page}</Layout>
	</DashboardLayout>
);

const pageLength = 8;

function RentalTable({ rentals }: { rentals: Rent[] }) {
	const [page, setPage] = useState(0);
	return (
		<Table>
			<TableCaption>
				<div className="flex items-center justify-between">
					<Button
						variant="outline"
						onClick={() => setPage(page - 1)}
						disabled={page === 0}
					>
						Previous
					</Button>

					<span className="text-sm text-gray-600">
						Showing {page * pageLength} to{" "}
						{(page + 1) * pageLength - 1} of {rentals.length}{" "}
						results
					</span>

					<Button
						variant="outline"
						onClick={() => setPage(page + 1)}
						disabled={
							page === Math.ceil(rentals.length / pageLength) - 1
						}
					>
						Next
					</Button>
				</div>
			</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Location</TableHead>
					<TableHead>Start</TableHead>
					<TableHead>End</TableHead>
					<TableHead>User</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{rentals.slice(page * 8, (page + 1) * 8).map((rent) => (
					<ApartmentTableRow
						apartment={rent.apartment}
						start={rent.start}
						end={rent.end}
						user={rent.user}
						key={rent.id}
					/>
				))}
			</TableBody>
		</Table>
	);
}
