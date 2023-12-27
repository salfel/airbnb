import { Link, usePage } from "@inertiajs/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import route from "ziggy-js";
import { PageProps } from "@/types";
import { ReactNode } from "react";
import { DropdownMenuIcon } from "@radix-ui/react-icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AuthenticatedLayout({
    children,
}: {
    children: ReactNode;
}) {
    const page = usePage<PageProps>();
    const location = page.props.ziggy.location;

    function getAvatarFallbackName(name: string) {
        if (name.split(" ").length > 1) {
            const names = name.split(" ");
            return names[0][0].toUpperCase() + names[1][0].toUpperCase();
        }
        return name[0].toUpperCase();
    }

    return (
        <>
            <header className="max-w-7xl mx-auto flex items-center justify-between py-2 gap-8">
                <Link href={route("home")} className="flex items-center gap-3">
                    <img src="/airbnb.svg" alt="Logo" className="w-12 h-12" />
                    <span className="text-2xl font-bold">Airbnb</span>
                </Link>

                <nav className="flex-1 flex items-center justify-end">
                    <ul>
                        <li>
                            <Link
                                href={route("dashboard")}
                                className={
                                    location === route("dashboard")
                                        ? "font-bold"
                                        : ""
                                }
                            >
                                Dashboard
                            </Link>
                        </li>
                    </ul>
                </nav>
                {page.props.auth.user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar className="w-8 h-8">
                                <AvatarFallback>
                                    {getAvatarFallbackName(
                                        page.props.auth.user.name,
                                    )}
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-40">
                            <DropdownMenuLabel>
                                {page.props.auth.user.name}
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href={route("dashboard")}>Dashboard</Link>
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
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar className="w-8 h-8">
                                <AvatarFallback>G</AvatarFallback>
                            </Avatar>
                            <DropdownMenuContent className="w-40">
                                <DropdownMenuLabel>Guest</DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                <DropdownMenuItem asChild>
                                    <Link href={route("login")}>Login</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href={route("register")}>
                                        Register
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenuTrigger>
                    </DropdownMenu>
                )}
            </header>
            <main className="max-w-7xl mx-auto mt-6">{children}</main>
        </>
    );
}
