import React, { ReactNode } from "react";
import { Link, usePage } from "@inertiajs/react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Building2, UserCheck, Star, LucideIcon } from "lucide-react";

const navLinks: { label: string; route: string; icon: LucideIcon }[] = [
	{
		label: "Rented",
		route: "dashboard.rented",
		icon: Building2
	},
	{
		label: "Rentals",
		route: "dashboard.rentals",
		icon: UserCheck
	},
	{
		label: "Marked",
		route: "dashboard.marked",
		icon: Star
	}
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<div className="grid grid-cols-[15rem_1fr]">
			<SideBar />

			{children}
		</div>
	);
}

function SideBar() {
	const page = usePage<{ showRentals: boolean }>();
	return (
		<aside className="border-r border-gray-200">
			<div className="mb-3 flex h-20 items-center justify-center border-b border-gray-200">
				<h1 className="text-2xl font-semibold">Dashboard</h1>
			</div>
			<nav className="flex flex-col gap-1 px-3">
				{navLinks.map(
					(link) =>
						(link.route !== "dashboard.rentals" ||
							page.props.showRentals) && (
							<Link
								href={route(link.route)}
								className={cn(
									buttonVariants({
										variant:
											route().current(link.route) ?
												"default"
											:	"ghost"
									}),
									"justify-start gap-3"
								)}
								key={link.route}
							>
								<link.icon className="h-5 w-5" />

								{link.label}
							</Link>
						)
				)}
			</nav>
		</aside>
	);
}
