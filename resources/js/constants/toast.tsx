import { ToastAction } from "@/components/ui/toast";
import { Link } from "@inertiajs/react";
import route from "ziggy-js";

export const toastActions = {
    login: (
        <ToastAction altText="login">
            <Link href={route("login")}>Login</Link>
        </ToastAction>
    ),
};
