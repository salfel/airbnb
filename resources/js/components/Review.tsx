import { Review as ReviewType } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AverageStars from "@/components/AverageStars";
import UserAvatar from "@/components/UserAvatar";
import { formatDistanceToNow } from "date-fns";

interface Props {
    review: ReviewType;
}

export default function Review({ review }: Props) {
    return (
        <Card className="p-6">
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
                <AverageStars stars={review.stars} size={6} />
                <div className="mt-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                    <p>{review.message}</p>
                </div>
            </CardContent>
        </Card>
    );
}
