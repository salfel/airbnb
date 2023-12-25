import { Config } from "ziggy-js";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface Apartment {
    id: number;
    city: string;
    country: string;
    location: string;
    price: number;
    thumbnail: string;
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
