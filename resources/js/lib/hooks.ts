import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";

export function useSearchParams() {
    const [searchParams, setSearchParams] = useState(
        new URLSearchParams(window.location.search),
    );

    function popState() {
        setSearchParams(new URLSearchParams(window.location.search));
    }

    useEffect(() => {
        window.addEventListener("popstate", popState);
        return () => window.removeEventListener("popstate", popState);
    }, []);

    return searchParams;
}

export function useErrors<T extends PageProps>(errorBag?: string | null) {
    const page = usePage<T>();

    if (errorBag) {
        return page.props.errors[errorBag] ?? {};
    }
    return page.props.errors;
}
