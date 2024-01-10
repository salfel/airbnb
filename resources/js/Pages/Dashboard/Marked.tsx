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
import ApartmentTableRow from "@/components/ApartmentTableRow";
import { atom, useAtomValue } from "jotai";
import { Button, buttonVariants } from "@/components/ui/button";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

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
	const [_atom] = useState(atom(marks));
	const values = useAtomValue(_atom);
	return (
		<Table>
			<TablePaginator
				initialValues={marks}
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
			{marks.length !== 0 ?
				<TableBody>
					{values.map((mark) => (
						<ApartmentTableRow
							apartment={mark.apartment}
							start={mark.apartment.start}
							end={mark.apartment.end}
							user={mark.apartment.host.user}
							key={mark.id}
						>
							<TableCell>
								<Button
									variant="outline"
									size="icon"
									className="group"
									asChild
								>
									<Link
										href={
											mark?.id ?
												route("marks.destroy", [
													mark.id
												])
											:	route("apartments.marks.store", [
													mark.apartment.id
												])
										}
										method={mark?.id ? "delete" : "post"}
										as="button"
									>
										<Star
											className={cn(
												"h-4 w-4 group-hover:stroke-yellow-500",
												mark?.id &&
													"fill-yellow-500 stroke-yellow-500"
											)}
										/>
									</Link>
								</Button>
							</TableCell>
						</ApartmentTableRow>
					))}
				</TableBody>
			:	<div className="mt-6 flex items-center gap-8 text-lg font-medium">
					<span>No Apartments marked yet</span>
					<Link
						href={route("home")}
						className={buttonVariants({
							variant: "default",
							size: "lg"
						})}
					>
						Find Apartments
					</Link>
				</div>
			}
		</Table>
	);
}
