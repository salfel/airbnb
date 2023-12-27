import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
        monthYearOptions,
    );

    if (startDate.getMonth() === endDate.getMonth()) {
        return `${dayFormatter.format(startDate)}.-${dayFormatter.format(
            endDate,
        )}. ${monthYearFormatter.format(endDate)}`;
    } else {
        return `${dayFormatter.format(startDate)}. ${monthYearFormatter.format(
            startDate,
        )} - ${dayFormatter.format(endDate)}. ${monthYearFormatter.format(
            endDate,
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
