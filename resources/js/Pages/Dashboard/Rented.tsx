import React, { ReactNode, useState } from "react";
import Layout from "@/layouts/Layout";
import { Head, Link, router } from "@inertiajs/react";
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
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import Calendar from "@/components/Calendar";
import { useErrors } from "@/lib/hooks";
import ApartmentTableRow from "@/components/ApartmentTableRow";

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
	const [values, setValues] = useState(rents.slice(0, 12));

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
						<ApartmentTableRow
							apartment={rent.apartment}
							start={rent.start}
							end={rent.end}
							options={<Options rent={rent} />}
							key={rent.id}
						/>
					))}
				</TableBody>
			)}
		</Table>
	);
}

function Options({ rent }: { rent: Rent }) {
	const [open, setOpen] = useState(false);
	return (
		<TableCell>
			<Dialog open={open} onOpenChange={setOpen}>
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
							<DialogTrigger asChild>
								<DropdownMenuItem>Edit</DropdownMenuItem>
							</DialogTrigger>
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
				<EditDialog rent={rent} setOpen={setOpen} />
			</Dialog>
		</TableCell>
	);
}

function EditDialog({
	rent,
	setOpen
}: {
	rent: Rent;
	setOpen: (open: boolean) => void;
}) {
	const form = useForm({
		defaultValues: {
			start: new Date(rent.start),
			end: new Date(rent.end)
		}
	});

	const errors = useErrors();

	function handleSubmit(values: { start: Date; end: Date }) {
		router.put(route("rents.update", [rent.id]), values, {
			onSuccess: () => setOpen(false)
		});
	}

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Edit Rent</DialogTitle>
				<DialogDescription>
					Change the start or end of your rent how you like
				</DialogDescription>
			</DialogHeader>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className="grid gap-6"
				>
					<Calendar control={form.control} errors={errors} />
					<Button type="submit">Update Rent</Button>
				</form>
			</Form>
		</DialogContent>
	);
}
