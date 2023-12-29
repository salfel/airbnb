import { ReactNode } from "react";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";

export default function Create() {
    return <div></div>;
}

Create.layout = (page: ReactNode) => (
    <AuthenticatedLayout>{page}</AuthenticatedLayout>
);
