import { Config } from "ziggy-js";
import { IconType } from "react-icons";
import { toastActions } from "@/constants/toast";

interface Model {
	id: number;
	created_at: string;
	updated_at: string;
}

export interface User extends Model {
	name: string;
	email: string;
	email_verified_at: string;
	image: string;
}

export interface Host extends Model {
	user: User;
}

export interface Apartment extends Model {
	city: string;
	country: string;
	price: number;
	square_meters: number;
	images: string[];
	title: string;
	description: string;
	beds: number;
	baths: number;
	guests: number;
	start: string;
	end: string;
	host: Host;
	attributes: string[];
	reviews: Review[];
	reviews_count: number;
	mark_count: number;
}

export interface Attribute {
	name: string;
	category: string;
	icon: IconType;
}

export interface Review extends Model {
	stars: number;
	message: string;
	user: User;
	apartment_id: number;
}

export interface Mark extends Model {
	apartment_id: number;
	user_id: number;
}

export interface Pagination<T> {
	current_page: number;
	data: T[];
	first_page_url: string;
	from: number;
	last_page: number;
	last_page_url: string;
	links: {
		url: null | string;
		label: string;
		active: boolean;
	}[];
	next_page_url: null | string;
	path: string;
	per_page: number;
	prev_page_url: null | string;
	to: number;
	total: number;
}

export type PageProps<
	T extends Record<string, unknown> = Record<string, unknown>
> = T & {
	auth: {
		user: User;
	};
	ziggy: Config & { location: string };
	flash: {
		message: string;
		title: string;
		action: keyof typeof toastActions;
		type: "default" | "destructive" | null;
	};
};
