import { Apartment, User } from "@/types";
import { Link } from "@inertiajs/react";
import { buttonVariants } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import { format } from "date-fns";
import UserAvatar from "@/components/UserAvatar";

export default function ApartmentTableRow({
	apartment,
	start,
	end,
	user,
	children
}: {
	apartment: Apartment;
	start: string;
	end: string;
	user: User | null;
	children?: React.ReactNode;
}) {
	return (
		<TableRow>
			<TableCell>
				<Link
					href={route("apartments.show", [apartment.id])}
					className={buttonVariants({
						variant: "link"
					})}
				>
					{apartment.title}
				</Link>
			</TableCell>
			<TableCell>
				{apartment.city}, {apartment.country}
			</TableCell>
			<TableCell>{format(start, "PP")}</TableCell>
			<TableCell>{format(end, "PP")}</TableCell>
			{user && (
				<TableCell className="flex items-center gap-2">
					<UserAvatar user={user} className="scale-75" />
					{user.name}{" "}
				</TableCell>
			)}

			{children}
		</TableRow>
	);
}
