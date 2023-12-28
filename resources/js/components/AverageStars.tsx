import { Star, StarHalf } from "lucide-react";

interface Props {
    stars: number;
}

export default function AverageStars({ stars }: Props) {
    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) =>
                stars >= index + 1 ? (
                    <Star key={index} fill="black" className="w-8 h-8" />
                ) : stars >= index + 0.5 ? (
                    <div className="relative" key={index}>
                        <StarHalf fill="black" className="absolute w-8 h-8" />
                        <Star className="w-8 h-8" strokeWidth={1.5} />
                    </div>
                ) : (
                    <Star key={index} className="w-8 h-8" strokeWidth={1.5} />
                ),
            )}
        </div>
    );
}
