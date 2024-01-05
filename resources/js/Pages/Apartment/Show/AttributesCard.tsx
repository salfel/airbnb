import React, { useState } from "react";
import _attributes from "@/constants/attributes";
import { Attribute } from "@/types";
import { Button } from "@/components/ui/button";

interface AttributesCardProps {
	attributes: string[];
}

export default function AttributesCard({ attributes }: AttributesCardProps) {
	const [collapsed, setCollapsed] = useState(false);
	return (
		<div className="!my-12 space-y-6">
			<h2 className="text-xl font-semibold">
				This Apartment offers you:{" "}
			</h2>
			<div>
				<div className="inline-grid grid-cols-2 gap-x-12 gap-y-6">
					{attributes
						.map(
							(attribute) =>
								_attributes.find(
									(value) => value.name === attribute
								) as Attribute
						)
						.filter((attribute) => attribute)
						.sort((a, b): number => {
							const getIndex = (c: Attribute) =>
								_attributes.findIndex(
									(attribute) => attribute.name === c.name
								);

							return getIndex(a) - getIndex(b);
						})
						.map((attribute) => {
							return (
								<div
									key={attribute.name}
									className="flex items-center gap-6"
								>
									<attribute.icon className="h-6 w-6" />
									<p className="text-lg">{attribute.name}</p>
								</div>
							);
						})
						.filter((_, index) => collapsed || index < 6)}
				</div>
			</div>

			{attributes.length >= 6 && (
				<Button
					variant="outline"
					onClick={() =>
						collapsed ? setCollapsed(false) : setCollapsed(true)
					}
				>
					View {collapsed ? "less" : "all"}
				</Button>
			)}
		</div>
	);
}
