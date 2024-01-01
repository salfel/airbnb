import { Link, usePage } from "@inertiajs/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import route from "ziggy-js";
import { PageProps } from "@/types";
import { ReactNode } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toaster } from "@/components/ui/toaster";
import UserAvatar from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";

interface Props {
    children: ReactNode;
}

export default function Layout({ children }: Props) {
    return (
        <>
            <header className="max-w-7xl mx-auto flex items-center justify-between py-2 gap-8 px-6">
                <Link href={route("home")} className="flex items-center gap-3">
                    <img src="/airbnb.svg" alt="Logo" className="w-12 h-12" />
                    <span className="text-2xl font-bold">Airbnb</span>
                </Link>

                <nav className="flex-1">
                    <ul className="flex items-center justify-end">
                        <li>
                            <Link href={route("dashboard")}>
                                <Button variant="ghost">Dashboard</Button>
                            </Link>
                        </li>
                        <li>
                            <Link href={route("apartments.create")}>
                                <Button variant="ghost">Become a Host</Button>
                            </Link>
                        </li>
                    </ul>
                </nav>

                <Dropdown />
            </header>
            <main className="max-w-7xl mx-auto mt-6 px-6">{children}</main>
            <footer className="h-8"></footer>
            <Toaster />
        </>
    );
}

function Dropdown() {
    const page = usePage<PageProps>();
    return page.props.auth.user ? (
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
                        <Link href={route("register")}>Register</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenuTrigger>
        </DropdownMenu>
    );
}