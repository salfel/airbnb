import React, { ReactNode } from "react";
import Layout from "@/layouts/Layout";
import { Head } from "@inertiajs/react";
import DashboardLayout from "@/layouts/DashboardLayout";

export default function DashboardRentals() {
	return (
		<>
			<Head title="Dashboard Rentals" />

			<div>
				<h1>rentals</h1>
			</div>
		</>
	);
}

DashboardRentals.layout = (page: ReactNode) => (
	<DashboardLayout>
		<Layout>{page}</Layout>
	</DashboardLayout>
);
