import React, { ReactNode, useState } from "react";
import Layout from "@/layouts/Layout";
import { Head } from "@inertiajs/react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Rent } from "@/types";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/table";
import ApartmentTableRow from "@/components/ApartmentTableRow";
import { atom, useAtomValue, PrimitiveAtom } from "jotai";
import TablePaginator from "@/components/TablePaginator";

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
								new Date(rental.end).getTime() <=
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

function RentalTable({ rentals }: { rentals: Rent[] }) {
	const [_atom] = useState(atom(rentals));
	const values = useAtomValue(_atom);

	return (
		<Table>
			<TablePaginator
				initialValues={rentals}
				pageLength={8}
				valuesAtom={_atom}
			/>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Location</TableHead>
					<TableHead>Start</TableHead>
					<TableHead>End</TableHead>
					<TableHead>User</TableHead>
				</TableRow>
			</TableHeader>
			{rentals.length !== 0 ?
				<TableBody>
					{values.map((rent) => (
						<ApartmentTableRow
							apartment={rent.apartment}
							start={rent.start}
							end={rent.end}
							user={rent.user}
							key={rent.id}
						/>
					))}
				</TableBody>
			:	<p className="mt-6 text-lg font-medium">No Rentals yet</p>}
		</Table>
	);
}
