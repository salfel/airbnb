import React, { useEffect, useState } from "react";
import { TableCaption } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function TablePaginator<T>({
	pageLength,
	values,
	setValues
}: {
	pageLength: number;
	values: T[];
	setValues: (values: T[]) => void;
}) {
	const [page, setPage] = useState(0);

	useEffect(() => {
		setValues(values.slice(page * pageLength, (page + 1) * pageLength));
	}, [page, values]);
	return (
		values.length > pageLength && (
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
						Showing {page * pageLength + 1} to{" "}
						{Math.min((page + 1) * pageLength, values.length)} of{" "}
						{values.length} results
					</span>

					<Button
						variant="outline"
						onClick={() => setPage(page + 1)}
						disabled={
							page === Math.ceil(values.length / pageLength) - 1
						}
					>
						Next
					</Button>
				</div>
			</TableCaption>
		)
	);
}
