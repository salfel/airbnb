import React, { ReactNode, useState } from "react";
import Layout from "@/layouts/Layout";
import { Head, Link } from "@inertiajs/react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Rent } from "@/types";
import TablePaginator from "@/components/TablePaginator";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/table";
import { Button, buttonVariants } from "@/components/ui/button";
import { format } from "date-fns";
import UserAvatar from "@/components/UserAvatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export default function DashboardRented({ rents }: { rents: Rent[] }) {
	return (
		<>
			<Head title="Dashboard Rented" />

			<div>
				<h1 className="text-2xl font-semibold">Rented</h1>

				<RentsTable rents={rents} />
			</div>
		</>
	);
}

DashboardRented.layout = (page: ReactNode) => (
	<DashboardLayout>
		<Layout>{page}</Layout>
	</DashboardLayout>
);

function RentsTable({ rents }: { rents: Rent[] }) {
	const [values, setValues] = useState(rents);

	return (
		<Table>
			<TablePaginator
				values={rents}
				pageLength={12}
				setValues={setValues}
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
			{rents.length !== 0 && (
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
							<TableCell>
								{format(rent.apartment.start, "PP")}
							</TableCell>
							<TableCell>
								{format(rent.apartment.end, "PP")}
							</TableCell>
							<TableCell className="flex items-center gap-2">
								<UserAvatar
									user={rent.apartment.host.user}
									className="scale-75"
								/>
								{rent.apartment.host.user.name}{" "}
							</TableCell>
							<Options rent={rent} />
						</TableRow>
					))}
				</TableBody>
			)}
		</Table>
	);
}

function Options({ rent }: { rent: Rent }) {
	return (
		<TableCell>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" className="p-2">
						<MoreHorizontal className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>Options</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem asChild>
							<Link
								href={route("rents.destroy", [rent.id])}
								method="delete"
								className="w-full"
								as="button"
							>
								Cancel
							</Link>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	);
}
