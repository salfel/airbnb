import React, { ReactNode } from "react";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import FormInput from "@/components/FormInput";
import CountryInput from "@/Pages/Apartment/Create/CountryInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Apartment, Model, RequiredProperties } from "@/types";
import Calendar from "./Create/Calender";
import { tomorrow } from "@/lib/utils";
import AttributesInput from "@/Pages/Apartment/Create/AttributesInput";
import ImagesInput from "@/Pages/Apartment/Create/ImagesInput";

export type FormValues = Omit<
    Apartment,
    | keyof Model
    | "host"
    | "user"
    | "stars"
    | "reviews"
    | "reviews_count"
    | "start"
    | "end"
    | "images"
> & { date: { from: Date; to: Date }; images: File[] };

export default function Create() {
    const {
        props: { errors },
    } = usePage();
    const form = useForm<FormValues>({
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            city: "",
            country: "",
            beds: 0,
            baths: 0,
            date: { from: new Date(), to: tomorrow() },
            attributes: [],
            images: [],
        },
    });

    function handleSubmit(values: FormValues) {
        const { date, ...tmp } = values;

        const data: RequiredProperties<Omit<FormValues, "date">> & {
            start: Date;
            end: Date;
        } = {
            start: date.from,
            end: date.to,
            ...tmp,
        };

        router.post(route("apartments.store"), data);
    }

    return (
        <>
            <Head title="Start renting" />

            <Card>
                <CardHeader>
                    <CardTitle>Start renting your first apartment</CardTitle>
                    <CardDescription>
                        This form allows you to list your first apartment on our
                        platform. Please provide as much detail as possible to
                        attract potential renters.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleSubmit)}
                            className="space-y-6"
                        >
                            <FormInput
                                name="title"
                                control={form.control}
                                error={errors.title}
                            />

                            <FormInput
                                name="description"
                                control={form.control}
                                error={errors.description}
                                textarea
                            />
                            <FormInput
                                name="price"
                                control={form.control}
                                type="number"
                            />

                            <Calendar
                                control={form.control}
                                error={errors.date}
                            />

                            <div className="flex items-center gap-6">
                                <FormInput
                                    name="city"
                                    control={form.control}
                                    error={errors.city}
                                />

                                <CountryInput
                                    control={form.control}
                                    error={errors.country}
                                />
                            </div>

                            <div className="flex items-center gap-6">
                                <FormInput
                                    type="number"
                                    name="beds"
                                    control={form.control}
                                    error={errors.beds}
                                />

                                <FormInput
                                    type="number"
                                    name="baths"
                                    control={form.control}
                                    error={errors.baths}
                                />
                            </div>

                            <AttributesInput
                                control={form.control}
                                error={errors.attributes}
                            />

                            <ImagesInput
                                control={form.control}
                                error={errors.images}
                            />

                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </>
    );
}

Create.layout = (page: ReactNode) => (
    <AuthenticatedLayout>{page}</AuthenticatedLayout>
);
