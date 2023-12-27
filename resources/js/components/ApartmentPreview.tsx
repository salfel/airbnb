import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
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
                    className="w-full aspect-video"
                />
            </CardHeader>
            <CardContent>
                <CardTitle>
                    <Link href={route("apartment.show", [apartment.id])}>
                        {apartment.city}, {apartment.country}
                    </Link>
                </CardTitle>
                <CardDescription className="capitalize mt-1">
                    {apartment.location}
                </CardDescription>
                <p className="mt-1">
                    {formatDateRange(apartment.start, apartment.end)}
                </p>
                <p className="my-2 text-2xl font-bold">€ {apartment.price}</p>
                <Button>
                    <Link href={route("apartment.show", [apartment.id])}>
                        Rent now
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
}
