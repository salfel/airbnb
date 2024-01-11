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
import { atom, useAtomValue } from "jotai";
import TablePaginator from "@/components/TablePaginator";

export default function DashboardListed({ listed }: { listed: Rent[] }) {
	return (
		<>
			<Head title="Dashboard Rentals" />
			<div className="space-y-8">
				<div>
					<h2 className="mb-6 text-xl font-semibold">
						Current Rentals
					</h2>

					<ListedTable
						listed={listed.filter(
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

					<ListedTable
						listed={listed.filter(
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

DashboardListed.layout = (page: ReactNode) => (
	<DashboardLayout>
		<Layout>{page}</Layout>
	</DashboardLayout>
);

function ListedTable({ listed }: { listed: Rent[] }) {
	const [_atom] = useState(atom(listed));
	const values = useAtomValue(_atom);

	return (
		<Table>
			<TablePaginator
				initialValues={listed}
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
			{listed.length !== 0 ?
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
