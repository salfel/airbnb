import { PrimitiveAtom, useAtom } from "jotai/index";
import React, { useEffect, useState } from "react";
import { TableCaption } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function TablePaginator<T>({
	pageLength,
	valuesAtom,
	initialValues
}: {
	pageLength: number;
	initialValues: T[];
	valuesAtom: PrimitiveAtom<T[]>;
}) {
	const [page, setPage] = useState(0);
	const [values, setValues] = useAtom(valuesAtom);

	useEffect(() => {
		setValues(initialValues.slice(page * 8, (page + 1) * 8));
	}, [page]);
	return (
		values.length <= 8 && (
			<TableCaption>
				<div className="flex items-center justify-between">
					<Button
						variant="outline"
						onClick={() => setPage(page - 1)}
						disabled={page === 0}
					>
						Previous
					</Button>

					<span className="text-sm text-gray-600">
						Showing {page * pageLength} to{" "}
						{Math.min(
							(page + 1) * pageLength - 1,
							initialValues.length
						)}{" "}
						of {initialValues.length} results
					</span>

					<Button
						variant="outline"
						onClick={() => setPage(page + 1)}
						disabled={
							page ===
							Math.ceil(initialValues.length / pageLength) - 1
						}
					>
						Next
					</Button>
				</div>
			</TableCaption>
		)
	);
}
