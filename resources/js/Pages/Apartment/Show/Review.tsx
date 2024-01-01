import { PageProps, Review as ReviewType } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AverageStars from "@/components/AverageStars";
import UserAvatar from "@/components/UserAvatar";
import { formatDistanceToNow } from "date-fns";
import { usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ReviewForm from "./ReviewForm";

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
                                addSuffix: true,
                            })}
                        </time>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {edit ? (
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
                ) : (
                    <>
                        <AverageStars stars={review.stars} size={6} />
                        <div className="mt-4 text-sm leading-relaxed text-gray-500">
                            <p>{review.message}</p>
                        </div>
                    </>
                )}
            </CardContent>
            {page.props.auth.user &&
                page.props.auth.user.id === review.user.id &&
                !edit && (
                    <Button
                        variant="ghost"
                        className="absolute top-3 right-3"
                        size="sm"
                        onClick={() => setEdit(true)}
                    >
                        Edit
                    </Button>
                )}
        </Card>
    );
}
