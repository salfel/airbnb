import React, { ReactNode } from "react";
import { Card } from "@/components/ui/card";

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<main className="flex h-screen w-full items-center justify-center">
			<Card>{children}</Card>
		</main>
	);
}
