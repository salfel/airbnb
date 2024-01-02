import type { PageProps, Pagination as PaginationType } from "@/types";
import {
	Pagination,
	PaginationContent,
	PaginationLink,
	PaginationNext,
	PaginationPrevious
} from "@/components/ui/pagination";
import { decode } from "html-entities";

export default function Paginator<T>({
	pagination
}: {
	pagination: PaginationType<T>;
}) {
	return (
		<Pagination className="my-8">
			<PaginationContent>
				{pagination.links.map((link, index) =>
					link.label.includes("&laquo") ?
						<PaginationPrevious
							href={link.url as string}
							key={index}
						/>
					: link.label.includes("&raquo") ?
						<PaginationNext href={link.url as string} key={index} />
					:	<PaginationLink
							key={index}
							href={link.url as string}
							isActive={link.active}
						>
							{decode(link.label)}
						</PaginationLink>
				)}
			</PaginationContent>
		</Pagination>
	);
}
