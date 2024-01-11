import React, { ReactNode, useState } from "react";
import Layout from "@/layouts/Layout";
import { Head, Link } from "@inertiajs/react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Mark } from "@/types";
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
import { MoreHorizontal } from "lucide-react";
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

export default function DashboardMarked({ marks }: { marks: Mark[] }) {
	return (
		<>
			<Head title="Dashboard Marked" />

			<div className="space-y-6">
				<h1 className="text-2xl font-semibold">
					Your marked Apartments
				</h1>

				<MarkedTable marks={marks} />
			</div>
		</>
	);
}

DashboardMarked.layout = (page: ReactNode) => (
	<DashboardLayout>
		<Layout>{page}</Layout>
	</DashboardLayout>
);

function MarkedTable({ marks }: { marks: Mark[] }) {
	const [values, setValues] = useState(marks);
	return (
		<>
			<Table>
				<TablePaginator
					values={marks}
					pageLength={8}
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
				{marks.length !== 0 && (
					<TableBody>
						{values.map((mark) => (
							<TableRow key={mark.id}>
								<TableCell>
									<Link
										href={route("apartments.show", [
											mark.apartment.id
										])}
										className={buttonVariants({
											variant: "link"
										})}
									>
										{mark.apartment.title}
									</Link>
								</TableCell>
								<TableCell>
									{mark.apartment.city},{" "}
									{mark.apartment.country}
								</TableCell>
								<TableCell>
									{format(mark.apartment.start, "PP")}
								</TableCell>
								<TableCell>
									{format(mark.apartment.end, "PP")}
								</TableCell>
								<TableCell className="flex items-center gap-2">
									<UserAvatar
										user={mark.apartment.host.user}
										className="scale-75"
									/>
									{mark.apartment.host.user.name}{" "}
								</TableCell>
								<Options mark={mark} />
							</TableRow>
						))}
					</TableBody>
				)}
			</Table>
			{marks.length === 0 && (
				<div className="mt-6 flex items-center gap-8 text-lg font-medium">
					<span>No Apartments marked yet</span>
					<Link
						href={route("home")}
						className={buttonVariants({
							variant: "default"
						})}
					>
						Find Apartments
					</Link>
				</div>
			)}
		</>
	);
}

function Options({ mark }: { mark: Mark }) {
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
								href={
									mark?.id ?
										route("marks.destroy", [mark.id])
									:	route("apartments.marks.store", [
											mark.apartment.id
										])
								}
								method={mark?.id ? "delete" : "post"}
								className="w-full"
								as="button"
							>
								Unmark
							</Link>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	);
}
