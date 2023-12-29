import GuestLayout from "@/layouts/GuestLayout";
import { FormEvent, ReactNode } from "react";
import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import FormInput, { getChangeData } from "@/components/FormInput";

export default function Login() {
    const { data, setData, errors, clearErrors, post } = useForm({
        name: "",
        email: "",
        password: "",
    });

    const changeData = getChangeData(setData, clearErrors);

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
