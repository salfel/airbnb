import { Apartment, Rent } from "@/types";
import { TableCell } from "@/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Link, router } from "@inertiajs/react";
import React from "react";

export function RentOptions({ rent }: { rent: Rent }) {
	return (
		rent.status !== "expired" && (
			<TableCell>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="p-2">
							<MoreHorizontal className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							{(rent.status === "pending" ||
								rent.status === "denied") && (
								<DropdownMenuItem asChild>
									<Link
										href={route("rents.status", [rent.id])}
										method="put"
										data={{ status: "approved" }}
										as="button"
										className="w-full"
									>
										Approve
									</Link>
								</DropdownMenuItem>
							)}
							{(rent.status === "approved" ||
								rent.status === "pending") && (
								<DropdownMenuItem asChild>
									<Link
										href={route("rents.status", [rent.id])}
										method="put"
										data={{ status: "denied" }}
										as="button"
										className="w-full"
									>
										Deny
									</Link>
								</DropdownMenuItem>
							)}
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</TableCell>
		)
	);
}

export function ApartmentOptions({ apartment }: { apartment: Apartment }) {
	return (
		<TableCell>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" className="p-2">
						<MoreHorizontal className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem asChild>
							<Link
								href={route("apartments.edit", [apartment.id])}
								className="w-full"
							>
								Update
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<button
								className="w-full"
								onClick={() => {
									if (
										confirm(
											"Are you sure you want to delete this apartment?"
										)
									) {
										router.delete(
											route("apartments.destroy", [
												apartment.id
											])
										);
									}
								}}
							>
								Delete
							</button>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	);
}
