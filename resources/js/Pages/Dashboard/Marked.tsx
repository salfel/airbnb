import React, { ReactNode } from "react";
import Layout from "@/layouts/Layout";
import { Head } from "@inertiajs/react";
import DashboardLayout from "@/layouts/DashboardLayout";

export default function DashboardMarked() {
	return (
		<>
			<Head title="Dashboard" />
			<div>
				<h1>Marked</h1>
			</div>
		</>
	);
}

DashboardMarked.layout = (page: ReactNode) => (
	<DashboardLayout>
		<Layout>{page}</Layout>
	</DashboardLayout>
);
