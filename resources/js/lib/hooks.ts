import { useEffect, useState } from "react";

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
