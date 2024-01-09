import React, { ReactNode } from "react";
import Layout from "@/layouts/Layout";
import { Head } from "@inertiajs/react";
import DashboardLayout from "@/layouts/DashboardLayout";

export default function DashboardRented() {
	return (
		<>
			<Head title="Dashboard Rented" />

			<div>
				<h1>Rented</h1>
			</div>
		</>
	);
}

DashboardRented.layout = (page: ReactNode) => (
	<DashboardLayout>
		<Layout>{page}</Layout>
	</DashboardLayout>
);
