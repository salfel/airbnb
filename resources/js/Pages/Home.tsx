import { Apartment, PageProps, Pagination } from "@/types";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { ReactNode } from "react";
import Paginator from "@/components/Paginator";
import ApartmentPreview from "@/components/ApartmentPreview";

export default function Home({
    apartments,
}: PageProps & { apartments: Pagination<Apartment> }) {
    return (
        <>
            <Head title="Home" />

            <div className="grid sm:grid-cols-3 grid-cols-2 gap-12">
                {apartments.data.map((apartment) => (
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
