import { Apartment, Rent } from "@/types";
import React, { useState } from "react";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/table";
import TablePaginator from "@/components/TablePaginator";
import { Link } from "@inertiajs/react";
import { buttonVariants } from "@/components/ui/button";
import { ApartmentOptions } from "@/Pages/Dashboard/Listed/Options";
import ApartmentTableRow from "@/components/ApartmentTableRow";

export function RentsTable({ rents }: { rents: Rent[] }) {
	const [values, setValues] = useState(rents.slice(0, 8));

	return (
		<Table>
			<TablePaginator
				values={rents}
				pageLength={8}
				setValues={setValues}
			/>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Location</TableHead>
					<TableHead>Start</TableHead>
					<TableHead>End</TableHead>
					<TableHead>Host</TableHead>
				</TableRow>
			</TableHeader>
			{rents.length !== 0 ?
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
			:	<p className="mt-6 text-lg font-medium">
					None of your Apartments have been rented yet
				</p>
			}
		</Table>
	);
}

export function ApartmentsTable({ apartments }: { apartments: Apartment[] }) {
	const [values, setValues] = useState(apartments.slice(0, 8));

	return (
		<Table>
			<TablePaginator
				values={apartments}
				pageLength={8}
				setValues={setValues}
			/>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Start</TableHead>
					<TableHead>End</TableHead>
				</TableRow>
			</TableHeader>
			{apartments.length !== 0 ?
				<TableBody>
					{values.map((apartment) => (
						<ApartmentTableRow
							apartment={apartment}
							key={apartment.id}
							options={<ApartmentOptions apartment={apartment} />}
						/>
					))}
				</TableBody>
			:	<div className="mt-6 flex items-center gap-6">
					<p className="text-lg font-medium">
						No Apartments listed yet
					</p>
					<Link
						href={route("apartments.create")}
						className={buttonVariants({
							variant: "outline"
						})}
					>
						Start listing
					</Link>
				</div>
			}
		</Table>
	);
}
