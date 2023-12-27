import GuestLayout from "@/layouts/GuestLayout";
import { FormEvent, ReactNode } from "react";
import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/FormInput";
import { Checkbox } from "@/components/ui/checkbox";

export default function Login() {
    const page = usePage<PageProps>();

    const { data, setData, errors, clearErrors, post } = useForm({
        name: "",
        email: "",
        password: "",
    });

    function changeData(
        field: keyof typeof data,
        value: (typeof data)[keyof typeof data],
    ) {
        setData(field, value);
        clearErrors(field);
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        post(route("register"));
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
                <form onSubmit={handleSubmit} className="space-y-4 w-80">
                    <FormInput
                        field="name"
                        value={data.name}
                        setValue={changeData}
                        error={errors.name}
                    />
                    <FormInput
                        field="email"
                        value={data.email}
                        setValue={changeData}
                        error={errors.email}
                    />
                    <FormInput
                        type="password"
                        field="password"
                        value={data.password}
                        setValue={changeData}
                        error={errors.password}
                    />

                    <Button type="submit" className="w-full">
                        Register
                    </Button>
                </form>
            </CardContent>
        </>
    );
}

Login.layout = (page: ReactNode) => <GuestLayout>{page}</GuestLayout>;
