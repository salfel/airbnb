import AverageStars from "@/Pages/Apartment/Show/AverageStars";
import React from "react";

interface RatingProps {
    stars: number;
    reviews_count: number;
}

export default function Rating({ stars, reviews_count }: RatingProps) {
    return (
        <div className="flex items-center gap-4 mb-12">
            <AverageStars stars={stars} />

            <span className="font-semibold text-xl">{stars}</span>
            <span className="text-gray-500">
                (
                {reviews_count
                    ? `Based on ${reviews_count} reviews`
                    : "No reviews yet"}
                )
            </span>
        </div>
    );
}
