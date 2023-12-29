import GuestLayout from "@/layouts/GuestLayout";
import { ReactNode } from "react";
import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Head, Link, usePage, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/FormInput";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

type Data = {
    name: string;
    email: string;
    password: string;
};

export default function Login() {
    const {
        props: { errors },
    } = usePage();

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    function handleSubmit(values: Data) {
        router.post(route("register"), values);
    }

    return (
        <>
            <Head title="Register" />

            <Button className="absolute top-5 right-5" variant="ghost" asChild>
                <Link href={route("login")}>Login</Link>
            </Button>

            <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>
                    Become a airbnb member to discover new places
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-4 w-80"
                    >
                        <FormInput
                            name="name"
                            control={form.control}
                            error={errors.name}
                        />
                        <FormInput
                            name="email"
                            control={form.control}
                            error={errors.email}
                        />
                        <FormInput
                            type="password"
                            name="password"
                            control={form.control}
                            error={errors.password}
                        />

                        <Button type="submit" className="w-full">
                            Register
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </>
    );
}

Login.layout = (page: ReactNode) => <GuestLayout>{page}</GuestLayout>;
