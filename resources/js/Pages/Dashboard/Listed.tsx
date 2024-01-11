import React, { ReactNode } from "react";
import Layout from "@/layouts/Layout";
import { Head } from "@inertiajs/react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Apartment, Rent } from "@/types";
import { RentsTable, ApartmentsTable } from "@/Pages/Dashboard/Listed/Tables";

export default function DashboardListed({
	rents,
	apartments
}: {
	rents: Rent[];
	apartments: Apartment[];
}) {
	return (
		<>
			<Head title="Dashboard Rentals" />

			<div className="space-y-8">
				<div>
					<h2 className="mb-6 text-xl font-semibold">
						Current Rents
					</h2>

					<RentsTable rents={rents} />
				</div>

				<div>
					<h2 className="mb-6 text-xl font-semibold">
						Your Apartments
					</h2>

					<ApartmentsTable apartments={apartments} />
				</div>
			</div>
		</>
	);
}

DashboardListed.layout = (page: ReactNode) => (
	<DashboardLayout>
		<Layout>{page}</Layout>
	</DashboardLayout>
);
