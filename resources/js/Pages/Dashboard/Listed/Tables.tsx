import { Apartment, Rent } from "@/types";
import React, { useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/table";
import TablePaginator from "@/components/TablePaginator";
import { Link } from "@inertiajs/react";
import { buttonVariants } from "@/components/ui/button";
import { format } from "date-fns";
import UserAvatar from "@/components/UserAvatar";
import { ApartmentOptions } from "@/Pages/Dashboard/Listed/Options";

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
						<TableRow key={rent.id}>
							<TableCell>
								<Link
									href={route("apartments.show", [
										rent.apartment.id
									])}
									className={buttonVariants({
										variant: "link"
									})}
								>
									{rent.apartment.title}
								</Link>
							</TableCell>
							<TableCell>
								{rent.apartment.city}, {rent.apartment.country}
							</TableCell>
							<TableCell>{format(rent.start, "PP")}</TableCell>
							<TableCell>{format(rent.end, "PP")}</TableCell>
							<TableCell className="flex items-center gap-2">
								<UserAvatar
									user={rent.user}
									className="scale-75"
								/>
								{rent.user.name}{" "}
							</TableCell>
						</TableRow>
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
						<TableRow key={apartment.id}>
							<TableCell>
								<Link
									href={route("apartments.show", [
										apartment.id
									])}
									className={buttonVariants({
										variant: "link"
									})}
								>
									{apartment.title}
								</Link>
							</TableCell>
							<TableCell>
								{format(apartment.start, "PP")}
							</TableCell>
							<TableCell>{format(apartment.end, "PP")}</TableCell>
							<ApartmentOptions apartment={apartment} />
						</TableRow>
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
