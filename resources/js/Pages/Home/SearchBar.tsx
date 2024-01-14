import { useSearchParams } from "@/lib/hooks";
import React, { FormEvent, useState } from "react";
import { router } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchBar() {
	const searchParams = useSearchParams();

	const [search, setSearch] = useState(searchParams.get("search") ?? "");

	function handleSubmit(e: FormEvent) {
		e.preventDefault();

		if (search !== "") {
			router.visit(
				route("home", {
					_query: { search }
				})
			);
		}
	}

	return (
		<form className="relative flex flex-1 gap-3" onSubmit={handleSubmit}>
			<div className="group flex-1">
				<Input
					type="search"
					className="peer h-10 w-full px-3 text-lg"
					placeholder="Search..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>

			<button className="absolute right-5 top-0 flex h-full items-center">
				<Search className="h-5 w-5" />
			</button>
		</form>
	);
}
