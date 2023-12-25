import { Apartment, PageProps, Pagination } from "@/types";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDateRange } from "@/lib/utils";
import Paginator from "@/components/Paginator";

export default function Home({
    apartments,
}: PageProps & { apartments: Pagination<Apartment> }) {
    console.log(apartments);
    return (
        <>
            <Head title="Home" />

            <div className="grid sm:grid-cols-3 grid-cols-2 gap-12">
                {apartments.data.map((apartment, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <img
                                src="/placeholder.svg"
                                alt="placeholder"
                                className="w-full aspect-video"
                            />
                        </CardHeader>
                        <CardContent>
                            <CardTitle>
                                {apartment.city}, {apartment.country}
                            </CardTitle>
                            <CardDescription className="capitalize mt-1">
                                {apartment.location}
                            </CardDescription>
                            <p className="mt-1">
                                {formatDateRange(
                                    apartment.start,
                                    apartment.end,
                                )}
                            </p>
                            <p className="my-2 text-2xl font-bold">
                                € {apartment.price}
                            </p>
                            <Button>
                                <Link
                                    href={route("apartment.show", [
                                        apartment.id,
                                    ])}
                                >
                                    Rent now
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Paginator pagination={apartments} />
        </>
    );
}

Home.layout = (page: JSX.Element) => (
    <AuthenticatedLayout>{page}</AuthenticatedLayout>
);
