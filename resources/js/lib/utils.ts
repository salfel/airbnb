import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Attribute } from "@/types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDateRange(begin: string, end: string): string {
	const startDate = new Date(begin);
	const endDate = new Date(end);

	const dayOptions = { day: "numeric" } as const;
	const monthYearOptions = { month: "short" } as const;

	const dayFormatter = new Intl.DateTimeFormat("en-US", dayOptions);
	const monthYearFormatter = new Intl.DateTimeFormat(
		"en-US",
		monthYearOptions
	);

	if (startDate.getMonth() === endDate.getMonth()) {
		return `${dayFormatter.format(startDate)}.-${dayFormatter.format(
			endDate
		)}. ${monthYearFormatter.format(endDate)}`;
	} else {
		return `${dayFormatter.format(startDate)}. ${monthYearFormatter.format(
			startDate
		)} - ${dayFormatter.format(endDate)}. ${monthYearFormatter.format(
			endDate
		)}`;
	}
}

export function getAvatarFallbackName(name: string) {
	if (name.split(" ").length > 1) {
		const names = name.split(" ");
		return names[0][0].toUpperCase() + names[1][0].toUpperCase();
	}
	return name[0].toUpperCase();
}

export function tomorrow(): Date {
	const date = new Date();
	date.setDate(date.getDate() + 1);
	return date;
}

export function array_diff<T>(a: T[], b: T[]) {
	const array = a.filter((x) => !b.includes(x));
	b.forEach((x) => {
		if (!a.includes(x) && !array.includes(x)) {
			array.push(x);
		}
	});
	return array;
}

type AttributeGroup = {
	name: string;
	children: Attribute[];
};

export function groupAttributesByCategory(
	attributes: Attribute[]
): AttributeGroup[] {
	const grouped: { [key: string]: Attribute[] } = {};

	attributes.forEach((attribute) => {
		if (!grouped[attribute.category]) {
			grouped[attribute.category] = [];
		}
		grouped[attribute.category].push(attribute);
	});

	return Object.entries(grouped).map(([name, children]) => ({
		name,
		children
	}));
}

export function objectToFormData(data: {
	[key: string]: string | number | (string | Blob)[];
}) {
	const formData = new FormData();
	for (const [key, value] of Object.entries(data)) {
		if (Array.isArray(value)) {
			value.forEach((image) => {
				formData.append(`${key}[]`, image);
			});

			continue;
		}

		formData.set(key, value.toString());
	}
	return formData;
}
