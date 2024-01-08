import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import route from "ziggy-js";
import { PageProps } from "@/types";
import { ReactNode, useEffect } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Toaster } from "@/components/ui/toaster";
import UserAvatar from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { toastActions } from "@/constants/toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
	children: ReactNode;
}

export default function Layout({ children }: Props) {
	const page = usePage<PageProps>();
	const { toast } = useToast();

	useEffect(() => {
		if (page.props.flash) {
			toast({
				title: page.props.flash.title,
				description: page.props.flash.message,
				variant: page.props.flash.type,
				action: toastActions[page.props.flash.action]
			});
		}
	}, [page.props.flash]);

	return (
		<>
			<ScrollArea className="h-screen">
				<Header />
				<main className="relative mx-auto mt-6 flex min-h-[calc(100vh-8rem)] max-w-7xl flex-col px-6">
					{children}
				</main>
				<footer className="h-8"></footer>
				<Toaster />
			</ScrollArea>
		</>
	);
}

function Header() {
	return (
		<div className="shadow-md">
			<header className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-4">
				<Link href={route("home")} className="flex items-center gap-3">
					<img src="/airbnb.svg" alt="Logo" className="h-12 w-12" />
					<span className="text-2xl font-bold">Airbnb</span>
				</Link>

				<nav className="flex-1">
					<ul className="flex items-center justify-end">
						<NavLink
							url={route("dashboard.rented")}
							label="Dashboard"
						/>
						<NavLink
							url={route("apartments.create")}
							label="Become a Host"
						/>
					</ul>
				</nav>

				<Dropdown />
			</header>
		</div>
	);
}

function NavLink({ url, label }: { url: string; label: string }) {
	return (
		<li>
			<Link href={url}>
				<Button variant="ghost">{label}</Button>
			</Link>
		</li>
	);
}

function Dropdown() {
	const page = usePage<PageProps>();
	return page.props.auth.user ?
			<DropdownMenu>
				<DropdownMenuTrigger>
					<UserAvatar user={page.props.auth.user} />
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-40">
					<DropdownMenuLabel>
						{page.props.auth.user.name}
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem asChild>
						<Link href={route("dashboard.rented")}>Dashboard</Link>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						className="text-red-500 hover:!text-red-500"
						asChild
					>
						<Link
							method="post"
							href={route("logout")}
							as="button"
							className="w-full"
						>
							Logout
						</Link>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		:	<DropdownMenu>
				<DropdownMenuTrigger>
					<Avatar className="h-8 w-8">
						<AvatarFallback>G</AvatarFallback>
					</Avatar>
					<DropdownMenuContent className="w-40">
						<DropdownMenuLabel>Guest</DropdownMenuLabel>
						<DropdownMenuSeparator />

						<DropdownMenuItem asChild>
							<Link href={route("login")}>Login</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href={route("register")}>Register</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenuTrigger>
			</DropdownMenu>;
}
