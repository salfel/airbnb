import GuestLayout from "@/layouts/GuestLayout";
import { FormEvent, ReactNode } from "react";
import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Head, Link, useForm } from "@inertiajs/react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import FormInput, { getChangeData } from "@/components/FormInput";
import { Checkbox } from "@/components/ui/checkbox";

export default function Login() {
    const { data, setData, errors, clearErrors, post } = useForm({
        email: "",
        password: "",
        remember: true,
    });

    const changeData = getChangeData(setData, clearErrors);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        post(route("login"));
    }

    return (
        <>
            <Head title="Login" />

            <Button className="absolute top-5 right-5" variant="ghost" asChild>
                <Link href={route("register")}>Register</Link>
            </Button>

            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                    Login to get full access to airbnb
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4 w-80">
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

                    <div className="flex items-center gap-2">
                        <Checkbox
                            checked={data.remember}
                            onCheckedChange={(checked) =>
                                changeData("remember", checked)
                            }
                            id="remember"
                        />
                        <Label htmlFor="remember">Remember Me</Label>
                    </div>

                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </form>
            </CardContent>
        </>
    );
}

Login.layout = (page: ReactNode) => <GuestLayout>{page}</GuestLayout>;
