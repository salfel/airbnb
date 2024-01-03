import React from "react";
import { PageProps, Review as ReviewType } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AverageStars from "@/Pages/Apartment/Show/AverageStars";
import UserAvatar from "@/components/UserAvatar";
import { formatDistanceToNow } from "date-fns";
import { Link, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ReviewForm from "./ReviewForm";
import { Trash2 } from "lucide-react";

interface Props {
	review: ReviewType;
}

export default function Review({ review }: Props) {
	const [edit, setEdit] = useState(false);

	const page = usePage<PageProps>();
	return (
		<Card className="relative">
			<CardHeader>
				<div className="flex items-center space-x-4">
					<UserAvatar user={review.user} />

					<div className="grid gap-1 text-sm">
						<h3 className="font-medium">{review.user.name}</h3>
						<time className="text-gray-500 dark:text-gray-400">
							{formatDistanceToNow(review.created_at, {
								addSuffix: true
							})}
						</time>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				{edit ?
					<>
						<ReviewForm
							review={review}
							url={route("reviews.update", [review.id])}
							method="put"
							buttonText="Update Review"
							onSuccess={() => setEdit(false)}
						/>
						<Button
							className="absolute right-3 top-3"
							onClick={() => setEdit(false)}
							variant="ghost"
						>
							Cancel
						</Button>
					</>
				:	<>
						<AverageStars stars={review.stars} size={6} />
						<div className="mt-4 text-sm leading-relaxed text-gray-500">
							<p>{review.message}</p>
						</div>
					</>
				}
			</CardContent>
			{page.props.auth.user?.id === review.user.id && !edit && (
				<div className="absolute right-3 top-3 space-x-2">
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setEdit(true)}
					>
						Edit
					</Button>

					<Button
						variant="ghost"
						className="bg-red-500 text-white hover:bg-red-600 hover:text-gray-100"
						size="sm"
						asChild
					>
						<Link
							href={route("reviews.destroy", [review.id])}
							method="delete"
							as="button"
							preserveScroll
						>
							<Trash2 className="h-3 w-3" />
						</Link>
					</Button>
				</div>
			)}
		</Card>
	);
}
