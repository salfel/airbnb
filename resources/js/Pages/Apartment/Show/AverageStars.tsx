import { Star, StarHalf } from "lucide-react";

interface Props {
	stars: number;
	size?: number;
}

export default function AverageStars({ stars, size = 8 }: Props) {
	return (
		<div className="flex items-center gap-1">
			{Array.from({ length: 5 }).map((_, index) =>
				stars >= index + 1 ?
					<Star
						key={index}
						fill="black"
						className={`w-${size} h-${size}`}
					/>
				: stars >= index + 0.5 ?
					<div className="relative" key={index}>
						<StarHalf
							fill="black"
							className={`absolute w-${size} h-${size}`}
						/>
						<Star className="h-8 w-8" strokeWidth={1.5} />
					</div>
				:	<Star
						key={index}
						className={`w-${size} h-${size}`}
						strokeWidth={1.5}
					/>
			)}
		</div>
	);
}
