import { Link, usePage } from "@inertiajs/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import route from "ziggy-js";
import { PageProps } from "@/types";

export default function AuthenticatedLayout({
    children,
}: {
    children: JSX.Element;
}) {
    const page = usePage<PageProps>();
    const location = page.props.ziggy.location;

    function getAvatarFallback(name: string) {
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

                <Avatar className="w-8 h-8">
                    <AvatarFallback>
                        {getAvatarFallback(page.props.auth.user.name)}
                    </AvatarFallback>
                </Avatar>
            </header>
            <main className="max-w-7xl mx-auto mt-6">{children}</main>
        </>
    );
}
