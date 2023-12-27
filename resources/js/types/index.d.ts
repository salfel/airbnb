import { Config } from "ziggy-js";

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

export interface Apartment {
    id: number;
    city: string;
    country: string;
    location: string;
    price: number;
    images: string[];
    title: string;
    description: string;
    beds: number;
    baths: number;
    guests: number;
    start: string;
    end: string;
    created_at: string;
    updated_at: string;
}

export interface Pagination<T extends Object> {
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
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
