import { Apartment, PageProps, Pagination } from "@/types";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React, { ReactNode } from "react";
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
import ApartmentPreview from "@/components/ApartmentPreview";

export default function Home({
    apartments,
}: PageProps & { apartments: Pagination<Apartment> }) {
    return (
        <>
            <Head title="Home" />

            <div className="grid sm:grid-cols-3 grid-cols-2 gap-12">
                {apartments.data.map((apartment, index) => (
                    <ApartmentPreview apartment={apartment} />
                ))}
            </div>

            <Paginator pagination={apartments} />
        </>
    );
}

Home.layout = (page: ReactNode) => (
    <AuthenticatedLayout>{page}</AuthenticatedLayout>
);
