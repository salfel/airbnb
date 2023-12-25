import type { PageProps, Pagination as PaginationType } from "@/types";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { usePage } from "@inertiajs/react";
import { decode } from "html-entities";

export default function Paginator({
    pagination,
}: {
    pagination: PaginationType<any>;
}) {
    const {
        props: {
            ziggy: { url },
        },
    } = usePage<PageProps>();
    return (
        <Pagination className="my-8">
            <PaginationContent>
                {pagination.links.map((link, index) =>
                    link.label.includes("&laquo") ? (
                        <PaginationPrevious
                            href={link.url as string}
                            key={index}
                        />
                    ) : link.label.includes("&raquo") ? (
                        <PaginationNext href={link.url as string} key={index} />
                    ) : (
                        <PaginationLink
                            key={index}
                            href={link.url as string}
                            isActive={link.active}
                        >
                            {decode(link.label)}
                        </PaginationLink>
                    ),
                )}
            </PaginationContent>
        </Pagination>
    );
}
