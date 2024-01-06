import React, { ReactNode } from "react";
import { Link } from "@inertiajs/react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const navLinks = [
	{ label: "Rentals", href: "dashboard.rentals" },
	{ label: "Rented", href: "dashboard.rented" }
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
	const url = window.location.href;
	const page = url.split("/")[url.split("/").length - 1];

	return (
		<>
			<h1 className="text-2xl font-semibold">Dashboard</h1>

			<Tabs defaultValue={page} className="my-3">
				<TabsList>
					<TabsTrigger value="rentals" asChild>
						<Link href={route("dashboard.rentals")}>
							Your Rentals
						</Link>
					</TabsTrigger>
					<TabsTrigger value="rented" asChild>
						<Link href={route("dashboard.rented")}>
							Rented Apartments
						</Link>
					</TabsTrigger>
				</TabsList>
			</Tabs>

			{children}
		</>
	);
}
