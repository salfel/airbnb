import React, { ReactNode } from "react";
import Layout from "@/layouts/Layout";
import { Head } from "@inertiajs/react";
import DashboardLayout from "@/layouts/DashboardLayout";

export default function Dashboard() {
	return (
		<>
			<Head title="Dashboard" />
			<div>
				<h1>Rented</h1>
			</div>
		</>
	);
}

Dashboard.layout = (page: ReactNode) => (
	<Layout>
		<DashboardLayout>{page}</DashboardLayout>
	</Layout>
);
