import React from "react";
import { ReactNode } from "react";
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
import CountryInput, {
    FormValues,
} from "@/Pages/Apartment/Create/CountryInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

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
            start: "",
            end: "",
            attributes: [],
            images: [],
        },
    });

    function handleSubmit(values: FormValues) {
        router.post(route("apartments.store"), values);
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
                            />

                            <FormInput
                                name="country"
                                control={form.control}
                                error={errors.country}
                                render={CountryInput}
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
