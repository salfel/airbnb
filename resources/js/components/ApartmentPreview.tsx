import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { formatDateRange } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import React from "react";
import { Apartment } from "@/types";

interface Props {
	apartment: Apartment;
}

export default function ApartmentPreview({ apartment }: Props) {
	return (
		<Card>
			<CardHeader>
				<img
					src={apartment.images[0] || "/placeholder.svg"}
					alt="placeholder"
					className="aspect-video w-full"
				/>
			</CardHeader>
			<CardContent>
				<CardTitle>
					<Link href={route("apartments.show", [apartment.id])}>
						{apartment.title}
					</Link>
				</CardTitle>
				<CardDescription className="mt-1 capitalize">
					{apartment.city}, {apartment.country}
				</CardDescription>
				<p className="mt-1">
					{formatDateRange(apartment.start, apartment.end)}
				</p>
				<p className="my-2 text-2xl font-bold">€ {apartment.price}</p>
				<Link href={route("apartments.show", [apartment.id])}>
					<Button>Details</Button>
				</Link>
			</CardContent>
		</Card>
	);
}
