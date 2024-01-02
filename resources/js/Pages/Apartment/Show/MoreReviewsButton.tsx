import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import React from "react";
import { useSearchParams } from "@/lib/hooks";

interface MoreReviewsButtonProps {
	apartmentId: number;
}

export default function MoreReviewsButton({
	apartmentId
}: MoreReviewsButtonProps) {
	const searchParams = useSearchParams();
	return (
		<Button asChild variant="link">
			<Link
				href={route("apartments.show", {
					apartment: apartmentId,
					_query: {
						page: parseInt(searchParams.get("page") || "1") + 1
					}
				})}
				preserveScroll
				only={["reviews"]}
			>
				View more
			</Link>
		</Button>
	);
}
