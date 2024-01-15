import { Apartment, User } from "@/types";
import { Link } from "@inertiajs/react";
import { buttonVariants } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import { format } from "date-fns";
import UserAvatar from "@/components/UserAvatar";
import { cn } from "@/lib/utils";

export default function ApartmentTableRow({
	apartment,
	start,
	end,
	user,
	options
}: {
	apartment: Apartment;
	start?: string;
	end?: string;
	user?: User | null;
	options?: React.ReactNode;
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
				<Link
					href={route("home", {
						_query: {
							city: apartment.city
						}
					})}
					className={cn(buttonVariants({ variant: "link" }), "p-0")}
				>
					{apartment.city}
				</Link>
				,{" "}
				<Link
					href={route("home", {
						_query: {
							country: apartment.country
						}
					})}
					className={cn(buttonVariants({ variant: "link" }), "p-0")}
				>
					{apartment.country}
				</Link>
			</TableCell>
			<TableCell>{format(start || apartment.start, "PP")}</TableCell>
			<TableCell>{format(end || apartment.end, "PP")}</TableCell>
			{(user || apartment.host?.user) && (
				<TableCell className="flex items-center gap-2">
					<UserAvatar
						user={user || apartment.host.user}
						className="scale-75"
					/>
					{(user || apartment.host.user).name}{" "}
				</TableCell>
			)}

			{options}
		</TableRow>
	);
}
